import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "..");
const registryPath = path.join(root, "src/content/registry.ts");
const registry = fs.readFileSync(registryPath, "utf8");
const mediaSection = registry.match(/export const media: MediaAsset\[\] = \[([\s\S]*?)\n\];/)?.[1] ?? "";
const records = [...mediaSection.matchAll(/\bid:\s*"([^"]+)"[\s\S]*?\bsrc:\s*"\/media\/([^"]+)"/g)].map((match) => ({ id: match[1], file: match[2] }));
const errors = [];
const duplicate = (label, values) => {
  for (const value of new Set(values)) if (values.filter((item) => item === value).length > 1) errors.push(`${label}: ${value}`);
};
duplicate("дублирующийся media ID", records.map((item) => item.id));
duplicate("один файл зарегистрирован несколько раз", records.map((item) => item.file));

const publicDir = path.join(root, "public/media");
const publicFiles = fs.readdirSync(publicDir).filter((file) => fs.statSync(path.join(publicDir, file)).isFile());
for (const record of records) if (!fs.existsSync(path.join(publicDir, record.file))) errors.push(`файл для ${record.id} отсутствует: public/media/${record.file}`);
for (const file of publicFiles) if (!records.some((record) => record.file === file)) errors.push(`осиротевший публичный файл: public/media/${file}`);

const hashes = new Map();
for (const record of records) {
  const file = path.join(publicDir, record.file);
  if (!fs.existsSync(file)) continue;
  const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  if (hashes.has(hash)) errors.push(`дублирующие файлы: ${hashes.get(hash)} и ${record.file}`);
  hashes.set(hash, record.file);
}

const mdxDir = path.join(root, "src/content/materials");
const usages = fs.readdirSync(mdxDir).filter((file) => file.endsWith(".mdx")).flatMap((file) => {
  const body = fs.readFileSync(path.join(mdxDir, file), "utf8");
  return [...body.matchAll(/<MediaBlock\s+id="([^"]+)"[\s\S]*?usageId="([^"]+)"/g)].map((match) => ({ file, id: match[1], usageId: match[2] }));
});
duplicate("дублирующийся usage ID", usages.map((item) => item.usageId));
for (const usage of usages) if (!records.some((record) => record.id === usage.id)) errors.push(`${usage.file}: неизвестное медиа ${usage.id}`);
for (const id of ["is-demo-shot", "klim-report", "cave", "editing", "hi-imran", "hi-klim"]) if (!usages.some((usage) => usage.id === id)) errors.push(`редакционное медиа не используется: ${id}`);
for (const old of ["vs-edit-process.png", "hi-imran.png", "hi-klim.png"]) if (publicFiles.includes(old) || registry.includes(`/media/${old}`)) errors.push(`осталось медиа предыдущей версии: ${old}`);

if (errors.length) {
  console.error(`Аудит медиа: ${errors.length} ошибок\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`Медиа проверены: ${records.length} записей, ${publicFiles.length} файлов, ${usages.length} редакционных использований, сирот нет.`);
