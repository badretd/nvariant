import test from "node:test"; import assert from "node:assert/strict"; import fs from "node:fs";
const source = fs.readFileSync(new URL("../src/content/registry.ts", import.meta.url), "utf8");
const values = (re) => [...source.matchAll(re)].map((m) => m[1]);
test("полный материал включён не более чем в один выпуск", () => { const refs = values(/type:\s*"material",\s*material:\s*"([^"]+)"/g); assert.equal(new Set(refs).size, refs.length); });
test("URL использования медиа содержит точный якорь", () => { assert.match(source, /\/materials\/\$\{material\.slug\}#media-\$\{id\}/); assert.match(source, /\/issues\/\$\{issue\.slug\}#media-\$\{id\}/); });
test("поисковый индекс содержит все пять типов", () => { for (const type of ["Выпуск", "Материал", "Человек", "Медиа", "Цитата"]) assert.match(source, new RegExp(`type: "${type}"`)); });
