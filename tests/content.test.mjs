import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const registry = fs.readFileSync(new URL("../src/content/registry.ts", import.meta.url), "utf8");
const materialsMap = fs.readFileSync(new URL("../src/content/materials.ts", import.meta.url), "utf8");
const contentBlocks = fs.readFileSync(new URL("../src/components/content-blocks.tsx", import.meta.url), "utf8");
const source = (slug) => fs.readFileSync(new URL(`../src/content/materials/${slug}.mdx`, import.meta.url), "utf8");
const values = (text, regex) => [...text.matchAll(regex)].map((match) => match[1]);

test("выпуск №1 состоит из четырёх завершённых материалов", () => {
  assert.match(registry, /number:\s*1,[\s\S]*slug:\s*"opyt-proshlyh-let"/);
  const refs = values(registry, /type:\s*"material",\s*material:\s*"([^"]+)"/g);
  assert.deepEqual(refs, ["upravlenie-komandoy", "serial-na-dvoih", "kogda-ty-ne-glavnyy", "filosofiya-n-varianta"]);
  for (const slug of refs) assert.match(materialsMap, new RegExp(`"${slug}"`));
});

test("черновики исключены из публичного реестра", () => {
  assert.doesNotMatch(registry, /shest-roley|osnovanie-n-varianta/);
  assert.doesNotMatch(materialsMap, /shest-roley|osnovanie-n-varianta/);
});

test("старого демо-контента и интерактива нет", () => {
  for (const old of ["tochki-sborki", "interfeys-do-zhesta", "design-video", "mira-volkova", "SignalTuner"]) {
    assert.doesNotMatch(`${registry}\n${materialsMap}`, new RegExp(old));
  }
});

test("медиа импортированы с размерами и уникальными usage_id", () => {
  for (const id of ["is-demo-shot", "vs-edit-process", "hi-imran", "hi-klim"]) {
    assert.match(registry, new RegExp(`id: "${id}"[\\s\\S]*?width: \\d+, height: \\d+`));
  }
  const ids = values(registry, /usageId:\s*"([^"]+)"/g);
  assert.equal(new Set(ids).size, ids.length);
});

test("медиа ведут к точным якорям материала и выпуска", () => {
  assert.match(registry, /\/materials\/\$\{material\.slug\}#media-\$\{id\}/);
  assert.match(registry, /\/issues\/\$\{issue\.slug\}#media-\$\{id\}/);
  assert.match(registry, /#media-\$\{id\}-cover/);
});

test("поиск включает выпуск, материалы, людей, медиа и подписи", () => {
  for (const type of ["Выпуск", "Материал", "Человек", "Медиа"]) assert.match(registry, new RegExp(`type: "${type}"`));
  assert.match(registry, /usage\.caption/);
});

test("Bandcamp embed исправлен и имеет внешний fallback", () => {
  const body = source("kogda-ty-ne-glavnyy");
  assert.doesNotMatch(body, /src="\[/);
  assert.match(body, /https:\/\/bandcamp\.com\/EmbeddedPlayer\//);
  assert.match(contentBlocks, /Если плеер не загрузился/);
  assert.doesNotMatch(contentBlocks, /autoplay/);
});

test("каждый материал принадлежит не более чем одному выпуску", () => {
  const refs = values(registry, /type:\s*"material",\s*material:\s*"([^"]+)"/g);
  assert.equal(new Set(refs).size, refs.length);
});
