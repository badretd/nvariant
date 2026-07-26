import fs from "node:fs"; import path from "node:path";
const root = process.cwd(); const registry = fs.readFileSync(path.join(root, "src/content/registry.ts"), "utf8"); const errors = [];
const ids = (pattern) => [...registry.matchAll(pattern)].map((m) => m[1]);
const unique = (name, values) => { const seen = new Set(); for (const value of values) if (seen.has(value)) errors.push(`${name}: повторяющееся значение «${value}»`); else seen.add(value); };
const materialSlugs = ids(/\{\s*slug:\s*"([^"]+)"/g); const mediaIds = ids(/\{\s*id:\s*"([^"]+)",\s*type:/g); const personIds = ids(/\{\s*id:\s*"([^"]+)",\s*name:/g); const quoteIds = ids(/\{\s*id:\s*"([^"]+)",\s*text:/g); const issueSlugs = ids(/number:\s*\d+,\s*slug:\s*"([^"]+)"/g);
unique("material.slug", materialSlugs); unique("media.id", mediaIds); unique("person.id", personIds); unique("quote.id", quoteIds); unique("issue.slug", issueSlugs);
const dates = ids(/(?:publishedAt|updatedAt|createdAt|date):\s*"([^"]+)"/g); for (const date of dates) if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) errors.push(`Некорректная дата: ${date}`);
for (const src of ids(/src:\s*"\/media\/([^"]+)"/g)) if (!fs.existsSync(path.join(root, "public/media", src))) errors.push(`Медиафайл не найден: public/media/${src}`);
for (const slug of materialSlugs) if (!fs.existsSync(path.join(root, "src/content/materials", `${slug}.mdx`))) errors.push(`MDX материала не найден: ${slug}`);
for (const ref of ids(/type:\s*"material",\s*material:\s*"([^"]+)"/g)) if (!materialSlugs.includes(ref)) errors.push(`Выпуск ссылается на неизвестный материал: ${ref}`);
for (const ref of ids(/type:\s*"quote",\s*quote:\s*"([^"]+)"/g)) if (!quoteIds.includes(ref)) errors.push(`Выпуск ссылается на неизвестную цитату: ${ref}`);
const issueMaterialRefs = ids(/type:\s*"material",\s*material:\s*"([^"]+)"/g); unique("Материал включён более чем в один выпуск", issueMaterialRefs);
if (errors.length) { console.error(`Проверка контента: ${errors.length} ошибок\n- ${errors.join("\n- ")}`); process.exit(1); }
console.log(`Контент проверен: ${materialSlugs.length} материала, ${issueSlugs.length} выпуск, ${mediaIds.length} медиа, ${personIds.length} человека, ${quoteIds.length} цитата.`);
