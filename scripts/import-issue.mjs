import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourcePath = path.join(root, "source-imports", "opyt-proshlyh-let-v2", "Опыт прошлых лет v2.md");
const source = fs.readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");

export const materialConfig = [
  ["Мне всегда хотелось быть главным", "mne-vsegda-hotelos-byt-glavnym"],
  ["Управление командой", "upravlenie-komandoy"],
  ["6 ролей", "shest-roley"],
  ["Сериал на двоих", "serial-na-dvoih"],
  ["Когда ты не главный", "kogda-ty-ne-glavnyy"],
  ["Основание N-варианта", "osnovanie-n-varianta"],
];

export function parseImport(markdown) {
  const markers = [...markdown.matchAll(/^### --(.+)$/gm)];
  return markers.map((marker, index) => {
    const raw = markdown.slice(marker.index + marker[0].length, markers[index + 1]?.index ?? markdown.length);
    const description = raw.match(/^\s*Описание:\s*(.+)$/m)?.[1].trim() ?? "";
    const tags = raw.match(/^\s*Теги:\s*(.+)$/m)?.[1].split(",").map((tag) => tag.trim()) ?? [];
    const end = raw.search(/--(?:\n|$)/);
    return { title: marker[1].trim(), description, tags, body: (end >= 0 ? raw.slice(0, end) : raw).replace(/^\s*(Описание|Теги):.*$/gm, "").trim() };
  });
}

export function extractMedia(markdown) {
  const records = [];
  const pattern = /(?:!\[(?:[^\]]*)\]\(([^)]+)\)|!\[\[([^\]]+)\]\])\s*\n```yaml\n([\s\S]*?)```/g;
  for (const match of markdown.matchAll(pattern)) {
    if (!match[3]) continue;
    const yaml = match[3];
    const field = (name) => yaml.match(new RegExp(`^${name}:\\s*[\"']?(.+?)[\"']?\\s*$`, "m"))?.[1].replace(/^["']|["']$/g, "");
    records.push({
      file: match[1] ?? match[2], id: field("id"), title: field("title"), alt: field("alt"),
      author: field("author"), source: field("source"), license: field("license"),
      createdAt: field("created_at"), downloadable: field("downloadable") === "true",
      caption: field("caption"), usageId: field("usage_id"), placement: field("placement"),
    });
  }
  return records;
}

function publicBody(body) {
  let result = body
    .replace(/!\[([^\]]*)\]\(([^)]+)\)\s*\n```yaml\n([\s\S]*?)```/g, (_, _alt, _file, yaml) => {
      const id = yaml.match(/^id:\s*(.+)$/m)?.[1].trim();
      const caption = yaml.match(/^\s*caption:\s*"(.+)"$/m)?.[1];
      const usageId = yaml.match(/^\s*usage_id:\s*(.+)$/m)?.[1].trim();
      return `<MediaBlock id="${id}" caption="${caption}" usageId="${usageId}" />`;
    })
    .replace(/!\[\[([^\]]+)\]\]\s*\n```yaml\n([\s\S]*?)```/g, (_, _file, yaml) => {
      const id = yaml.match(/^id:\s*(.+)$/m)?.[1].trim();
      const caption = yaml.match(/^\s*caption:\s*"(.+)"$/m)?.[1];
      const usageId = yaml.match(/^\s*usage_id:\s*(.+)$/m)?.[1].trim();
      return `<MediaBlock id="${id}" caption="${caption}" usageId="${usageId}" />`;
    });

  result = result
    .replace(/\(\(Сделай так чтобы текс ниже[\s\S]*?\)\)\s*\n\s*### Краткий пересказ сюжета([\s\S]*?)### Послесловие/, "<details className=\"plot-disclosure\">\n<summary>Показать краткий пересказ сюжета</summary>\n\n#### Краткий пересказ сюжета$1</details>\n\n#### Послесловие")
    .replace(/\(\(Так же сделать текст ниже скрытым под заголовком по умолчанию\)\)\s*\n\s*## Сюжет([\s\S]*?)\(\(Тут будет интерактивное дерево сюжета[\s\S]*?\)\)/, "<details className=\"plot-disclosure\">\n<summary>Показать краткий пересказ сюжета</summary>\n\n### Сюжет$1</details>\n\n<PlotTree />")
    .replace(/\(\(далее цитата из материала “6 ролей”[\s\S]*?\)\)/, "")
    .replace(/\(\(Тут должна быть полноценное поле ввода как в гугле[\s\S]*?q=([^&\"]+)[\s\S]*?\)\)/g, (_, q) => `[Найти проект в Google](https://www.google.com/search?q=${q})`)
    .replace(/\(\(TODO: вставить виджет на альбом https:\/\/logka\.bandcamp\.com\/album\/copy-ost\)\)/, '<BandcampEmbed title="COPY OST — logka" embedUrl="https://bandcamp.com/EmbeddedPlayer/album=662356440/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/" externalUrl="https://logka.bandcamp.com/album/copy-ost" />')
    .replace(/\(LOST MEDIA\)\s*\(\(надпись должна[\s\S]*?\)\)/, '<LostMedia message="df20efee20f1ebe5e4f3" />')
    .replace(/\(\([\s\S]*?\)\)/g, "")
    .replace(/Клим(?:ом|а)? Гуляев(?:ым|а)?/g, (name) => `[${name}](/people#person-klim-gulyaev)`)
    .replace(/Самад(?:ом|а)? Юсупов(?:ым|а)?/g, (name) => `[${name}](/people#person-samad-yusupov)`)
    .replace(/^(#{1,3}) /gm, (_, hashes) => `${"#".repeat(hashes.length + 1)} `)
    .replace(/—-/g, "—")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  result = result
    .replace(/<MediaBlock id="hi-(imran|klim)"([^>]*)\/>/g, '<MediaBlock id="hi-$1"$2 compact />')
    .replace(/((?:^\|.+\|\n){3,})/gm, (table) => {
      const rows = table.trim().split("\n").map((line) => line.slice(1, -1).split("|").map((cell) => cell.trim()));
      const [head, , ...bodyRows] = rows;
      return `<table>\n  <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>\n  <tbody>\n${bodyRows.map((row) => `    <tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("\n")}\n  </tbody>\n</table>`;
    });
  return result;
}

if (process.argv[1] === import.meta.filename) {
  const parsed = parseImport(source);
  const searchTexts = {};
  for (const [title, slug] of materialConfig) {
    const material = parsed.find((item) => item.title === title);
    if (!material) throw new Error(`Не найден материал: ${title}`);
    const body = publicBody(material.body);
    fs.writeFileSync(path.join(root, "src", "content", "materials", `${slug}.mdx`), `${body}\n`);
    searchTexts[slug] = body
      .replace(/<[^>]+>/g, " ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[#*_>|`]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  fs.writeFileSync(path.join(root, "src", "content", "search-text.ts"), `export const searchTexts = ${JSON.stringify(searchTexts, null, 2)} as const;\n`);
  console.log(`Создано ${parsed.length} MDX-файлов; найдено ${extractMedia(source).length} медиаописаний.`);
}
