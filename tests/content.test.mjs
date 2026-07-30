import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { extractMedia, parseImport } from "../scripts/import-issue.mjs";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const registry = read("src/content/registry.ts");
const map = read("src/content/materials.ts");
const source = read("source-imports/opyt-proshlyh-let-v2/Опыт прошлых лет v2.md");
const mdx = (slug) => read(`src/content/materials/${slug}.mdx`);
const slugs = ["mne-vsegda-hotelos-byt-glavnym", "upravlenie-komandoy", "shest-roley", "serial-na-dvoih", "kogda-ty-ne-glavnyy", "osnovanie-n-varianta"];

test("импорт определяет шесть границ материалов и извлекает метаданные", () => {
  const materials = parseImport(source);
  assert.equal(materials.length, 6);
  assert.equal(materials[0].description, "Почему человек, который всегда хотел быть главным, постепенно начал искать способы отвечать только за часть работы.");
  assert.deepEqual(materials[2].tags, ["Воспоминания", "Сериалы"]);
});

test("изображения связаны с ближайшими YAML-записями", () => {
  const media = extractMedia(source);
  assert.equal(media.length, 6);
  assert.deepEqual(media.map((item) => item.id), ["is-demo-shot", "klim-report", "cave", "editing", "hi-imran", "hi-klim"]);
  assert.equal(media.find((item) => item.id === "editing")?.file, "photo_2026-07-25_09-04-19.jpg");
});

test("выпуск использует актуальный порядок шести материалов", () => {
  const refs = [...registry.matchAll(/type:\s*"material",\s*material:\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(refs, slugs);
  for (const slug of slugs) assert.match(map, new RegExp(`"${slug}"`));
  assert.doesNotMatch(`${registry}\n${map}`, /filosofiya-n-varianta|vs-edit-process/);
});

test("публичный MDX очищен от импортной разметки и редакционных заметок", () => {
  for (const slug of slugs) {
    const body = mdx(slug);
    assert.doesNotMatch(body, /\(\(|\)\)|TODO|```yaml|!\[\[|^Описание:|^Теги:/m);
  }
});

test("скрытые пересказы, дерево сюжета и LOST MEDIA реализованы", () => {
  assert.match(mdx("upravlenie-komandoy"), /<details className="plot-disclosure">/);
  assert.match(mdx("serial-na-dvoih"), /<PlotTree \/>/);
  assert.match(mdx("osnovanie-n-varianta"), /<LostMedia message="df20efee20f1ebe5e4f3" \/>/);
});

test("внутренняя цитата и страницы людей связаны", () => {
  assert.match(mdx("upravlenie-komandoy"), /\/materials\/shest-roley#zaklyuchenie/);
  assert.match(mdx("upravlenie-komandoy"), /\/people#person-klim-gulyaev/);
  assert.match(registry, /id: "samad-yusupov"/);
  assert.match(registry, /role: "Независимый эксперт"/);
});

test("медиа ведут к точным usage-якорям и старые файлы исключены", () => {
  assert.match(registry, /#media-\$\{usage\.usageId\}/);
  assert.match(read("src/components/content-blocks.tsx"), /media-\$\{usageId \?\? id\}/);
  assert.doesNotMatch(registry, /vs-edit-process|\/media\/hi-imran\.png|\/media\/hi-klim\.png/);
});

test("архив материалов поддерживает запрос, AND-фильтры и URL", () => {
  const browser = read("src/components/materials-browser.tsx");
  assert.match(browser, /words\.every/);
  assert.match(browser, /tags\.every/);
  assert.match(browser, /next\.set\("q"/);
  assert.match(browser, /next\.set\("tags"/);
  assert.match(browser, /По вашему запросу ничего не найдено/);
});

test("поиск строится из актуального общего текста", () => {
  assert.match(registry, /searchTexts\["serial-na-dvoih"\]/);
  assert.match(registry, /type: "Материал"/);
  assert.doesNotMatch(read("src/content/search-text.ts"), /\(\(|```yaml|Описание:|vs-edit-process/);
});

test("Bandcamp не запускается автоматически и имеет fallback", () => {
  assert.match(mdx("kogda-ty-ne-glavnyy"), /BandcampEmbed/);
  const blocks = read("src/components/content-blocks.tsx");
  assert.match(blocks, /Если плеер не загрузился/);
  assert.doesNotMatch(blocks, /autoplay/);
});

test("навигация выпуска использует scoped-якоря реальных заголовков", () => {
  const toc = read("src/components/issue-toc.tsx");
  assert.match(toc, /rendered\.id = `heading-\$\{material\.slug\}-\$\{heading\.id\}`/);
  assert.match(toc, /go\(`heading-\$\{m\.slug\}-\$\{h\.id\}`\)/);
});

test("дерево сюжета поддерживает масштабирование, панорамирование и текстовый fallback", () => {
  const canvas = read("src/components/plot-tree-canvas.tsx");
  assert.match(canvas, /onWheel=/);
  assert.match(canvas, /onPointerMove=/);
  assert.match(canvas, /Управление масштабом дерева сюжета/);
  const blocks = read("src/components/content-blocks.tsx");
  assert.match(blocks, /Полный сюжет в текстовом виде/);
  assert.match(blocks, /plotSequel/);
  assert.match(read("src/content/plot.ts"), /Поздравляю, теперь мы знаем ваш адрес/);
});
