import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "src/content/registry.ts");
const registry = fs.readFileSync(registryPath, "utf8");
const errors = [];
const fail = (file, message) => errors.push(`${path.relative(root, file)}: ${message}`);
const values = (source, pattern) => [...source.matchAll(pattern)].map((match) => match[1]);
const unique = (file, name, items) => {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item)) fail(file, `${name}: повторяющееся значение «${item}»`);
    seen.add(item);
  }
};

const materialSlugs = values(registry, /\bslug:\s*"([^"]+)"/g).filter((slug) => slug !== "opyt-proshlyh-let");
const mediaIds = values(registry, /\bid:\s*"([^"]+)",\s*type:\s*"[^"]+",\s*kind:/g);
const personIds = values(registry, /\bid:\s*"([^"]+)",\s*name:/g);
const issueSlugs = values(registry, /\bslug:\s*"([^"]+)",\s*\n?\s*title:/g).filter((slug) => slug === "opyt-proshlyh-let");
const authorRefs = values(registry, /personId:\s*"([^"]+)"/g);
const issueMaterialRefs = values(registry, /type:\s*"material",\s*material:\s*"([^"]+)"/g);
const mediaRefs = [
  ...values(registry, /\bcover:\s*"([^"]+)"/g),
  ...values(registry, /\bmediaId:\s*"([^"]+)"/g),
  ...values(registry, /\bphoto:\s*"([^"]+)"/g),
];

unique(registryPath, "material.slug", materialSlugs);
unique(registryPath, "media.id", mediaIds);
unique(registryPath, "person.id", personIds);
unique(registryPath, "issue.slug", issueSlugs);
unique(registryPath, "Материал включён более чем в один выпуск", issueMaterialRefs);

for (const ref of authorRefs) if (!personIds.includes(ref)) fail(registryPath, `автор «${ref}» не существует`);
for (const ref of mediaRefs) if (!mediaIds.includes(ref)) fail(registryPath, `медиа «${ref}» не существует`);
for (const ref of issueMaterialRefs) if (!materialSlugs.includes(ref)) fail(registryPath, `выпуск ссылается на неизвестный или неопубликованный материал «${ref}»`);

for (const date of values(registry, /(?:publishedAt|updatedAt|createdAt|date):\s*"([^"]+)"/g)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) fail(registryPath, `некорректная дата «${date}»`);
}
for (const src of values(registry, /\bsrc:\s*"\/media\/([^"]+)"/g)) {
  const file = path.join(root, "public/media", src);
  if (!fs.existsSync(file)) fail(registryPath, `медиафайл не найден: public/media/${src}`);
}

const weakAlt = /^(изображение|картинка|скриншот|модный лук|фото|image)$/iu;
for (const match of registry.matchAll(/\balt:\s*"([^"]*)"/g)) {
  if (match[1].trim().length < 20 || weakAlt.test(match[1].trim())) fail(registryPath, `у изображения бесполезный alt: «${match[1]}»`);
}

const usageIds = values(registry, /\busageId:\s*"([^"]+)"/g);
unique(registryPath, "media usage_id", usageIds);

const placeholder = /(ссылка на (его|её|их|раздел|страниц)|страниц[ау] на сайте|вот-вот обновят|профукал дедлайн|\(\(|\)\)|TODO|TBD|!\[\[|```yaml|^Описание:|^Теги:)/imu;
for (const slug of materialSlugs) {
  const file = path.join(root, "src/content/materials", `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    fail(registryPath, `MDX материала не найден: ${slug}`);
    continue;
  }
  const body = fs.readFileSync(file, "utf8");
  if (body.replace(/<[^>]+>/gu, " ").trim().length < 180) fail(file, "опубликованный материал не содержит содержательного текста");
  const match = body.match(placeholder);
  if (match) fail(file, `остался редакционный плейсхолдер «${match[0]}»`);
  if (/src="\[[^\]]+\]\([^)]+\)"/u.test(body)) fail(file, "iframe содержит Markdown-ссылку внутри src");
  const materialUsageIds = values(body, /usageId="([^"]+)"/g);
  unique(file, "usage_id внутри материала", materialUsageIds);
  for (const usageId of materialUsageIds) if (!usageIds.includes(usageId)) fail(file, `usage_id «${usageId}» отсутствует в реестре`);
}

for (const banned of ["tochki-sborki", "gorod-kotoryy-slyshno", "interfeys-do-zhesta", "veshchi-pomnyat-formu", "zametka-o-pustote", "alisa-morozova", "mira-volkova", "design-video", "signal-field"]) {
  if (registry.includes(banned)) fail(registryPath, `зарегистрирован удалённый демонстрационный контент «${banned}»`);
}

if (errors.length) {
  console.error(`Проверка контента: ${errors.length} ошибок\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`Контент проверен: ${materialSlugs.length} материала, ${issueSlugs.length} выпуск, ${mediaIds.length} медиа, ${personIds.length} человека.`);
