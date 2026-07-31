import type { Issue, MaterialMetadata, MediaAsset, MediaUsage, Person, Quote, SearchEntry } from "@/lib/types";
import { searchTexts } from "./search-text";
import { plotSearchText } from "./plot";

export const people: Person[] = [
  { id: "imran-badretdinov", name: "Имран Бадретдинов", photo: "portrait-imran", description: "Главный редактор и основатель N-варианта.", occupation: "Автор, главный редактор, сооснователь", aliases: ["logka"], tags: ["N-вариант", "Сериалы", "Музыка"] },
  { id: "klim-gulyaev", name: "Клим Гуляев", photo: "portrait-klim", description: "Сооснователь N-варианта и актёр сериалов «Исповедь школьника» и «Выжить в школе».", occupation: "Автор, актёр, сооснователь", tags: ["N-вариант", "Сериалы", "Воспоминания"] },
  { id: "samad-yusupov", name: "Самад Юсупов", photo: "portrait-samad", description: "Независимый эксперт первого выпуска N-варианта.", occupation: "Независимый эксперт", tags: ["N-вариант"] },
];

export const quotes: Quote[] = [{
  id: "shest-roley-vyzov",
  text: "Шесть ролей — это был вызов. Я его принял и прошёл. Криво, с ошибками, уставший, но прошёл.",
  person: "klim-gulyaev",
  sourceTitle: "6 ролей",
  sourceUrl: "/materials/shest-roley#zaklyuchenie",
  sourceMaterial: "shest-roley",
}];

export const media: MediaAsset[] = [
  { id: "issue-cover", type: "image", kind: "cover", title: "Обложка выпуска №1 «Опыт прошлых лет»", src: "/media/issue-cover.png", width: 1080, height: 1440, alt: "Красно-чёрная обложка выпуска №1 «Опыт прошлых лет» с крупной типографикой N-варианта", description: "Обложка актуальной версии первого выпуска.", author: "Имран Бадретдинов", source: "Редакция N-варианта", license: "Все права защищены", createdAt: "2026-07-30", downloadable: false, tags: ["N-вариант", "Выпуск №1"] },
  { id: "is-demo-shot", type: "image", kind: "material", title: "Кадр из сериала «Исповедь школьника»", src: "/media/is-demo-shot.png", width: 1280, height: 720, alt: "Двое людей направляют игрушечное оружие на человека, стоящего с поднятыми руками и банкнотами", description: "Сохранившийся кадр из сериала «Исповедь школьника».", author: "Имран Бадретдинов", source: "Личный архив", license: "CC-BY 4.0", createdAt: "2023-04-09", downloadable: true, tags: ["Сериалы", "Персона"] },
  { id: "klim-report", type: "image", kind: "material", title: "Кадр из первого интервью Клима Гуляева", src: "/media/klim-report.jpg", width: 1920, height: 1080, alt: "Клим Гуляев задумчиво стоит на размытом в движении фоне ночного города", description: "Кадр из первого интервью Клима Гуляева, сохранившийся в личном архиве.", author: "Имран Бадретдинов", source: "Личный архив", license: "CC-BY 4.0", createdAt: "2023-03-25", downloadable: true, tags: ["LOST MEDIA", "Персона"] },
  { id: "cave", type: "image", kind: "material", title: "Кадр из 4 серии сериала «Выжить в школе»", src: "/media/cave.png", width: 369, height: 534, alt: "Имран Бадретдинов ведёт съёмку в каменной пещере для невыпущенной серии", description: "Кадр из пещеры для четвёртого эпизода сериала «Выжить в школе».", author: "Имран Бадретдинов", source: "Личный архив", license: "CC-BY 4.0", createdAt: "2024-09-08", downloadable: true, tags: ["Сериалы", "Персона"] },
  { id: "editing", type: "image", kind: "material", title: "Монтаж сериала «Выжить в школе»: финальный рендер", src: "/media/editing.jpg", width: 1280, height: 720, alt: "На мониторе открыт сложный проект DaVinci Resolve с множеством видео- и аудиодорожек", description: "Финальный монтаж и многослойный саунд-дизайн сериала «Выжить в школе».", author: "Имран Бадретдинов", source: "Личный архив", license: "CC-BY 4.0", createdAt: "2024-09-07", downloadable: true, tags: ["Сериалы", "Производственный ад"] },
  { id: "hi-imran", type: "image", kind: "material", title: "Из работы над «Выжить в школе»", src: "/media/hi-imran.jpg", width: 960, height: 1280, alt: "Имран Бадретдинов целится в сторону камеры из игрушечного пистолета", description: "Фотография со съёмок сериала «Выжить в школе».", author: "Клим Гуляев", source: "Telegram", license: "CC-BY 4.0", createdAt: "2024-09-26", downloadable: true, tags: ["Сериалы", "Персона"] },
  { id: "hi-klim", type: "image", kind: "material", title: "Из работы над 2 сезоном сериала «Исповедь школьника»", src: "/media/hi-klim.jpg", width: 1280, height: 960, alt: "Клим Гуляев едет на электросамокате прямо в сторону оператора", description: "Фотография со съёмок второго сезона сериала «Исповедь школьника».", author: "Имран Бадретдинов", source: "Telegram", license: "CC-BY 4.0", createdAt: "2024-11-10", downloadable: true, tags: ["Сериалы", "Персона"] },
  { id: "portrait-imran", type: "image", kind: "person", title: "Имран Бадретдинов", src: "/media/portrait-imran.jpg", width: 810, height: 1080, alt: "Портрет Имрана Бадретдинова для страницы участника N-варианта", description: "Редакционный портрет Имрана Бадретдинова.", author: "Личный архив", source: "Личный архив", license: "Все права защищены", createdAt: "2026-07-30", downloadable: false, tags: ["Персона", "N-вариант"] },
  { id: "portrait-klim", type: "image", kind: "person", title: "Клим Гуляев", src: "/media/portrait-klim.jpg", width: 960, height: 1280, alt: "Портрет Клима Гуляева для страницы участника N-варианта", description: "Редакционный портрет Клима Гуляева.", author: "Личный архив", source: "Личный архив", license: "Все права защищены", createdAt: "2026-07-30", downloadable: false, tags: ["Персона", "N-вариант"] },
  { id: "portrait-samad", type: "image", kind: "person", title: "Самад Юсупов", src: "/media/portrait-samad.jpg", width: 1080, height: 734, alt: "Портрет Самада Юсупова для страницы участника N-варианта", description: "Редакционный портрет Самада Юсупова.", author: "Личный архив", source: "Личный архив", license: "Все права защищены", createdAt: "2026-07-30", downloadable: false, tags: ["Персона", "N-вариант"] },
];

const commonExpert = { personId: "samad-yusupov", role: "Независимый эксперт" };
const records: Omit<MaterialMetadata, "readingTime">[] = [
  { slug: "mne-vsegda-hotelos-byt-glavnym", title: "Мне всегда хотелось быть главным", description: "Почему человек, который всегда хотел быть главным, постепенно начал искать способы отвечать только за часть работы.", publishedAt: "2026-08-02", authors: [{ personId: "imran-badretdinov", role: "Автор" }, commonExpert], tags: ["Истории", "Сериалы", "N-вариант"], issue: "opyt-proshlyh-let", showInMaterialsArchive: true, cover: "is-demo-shot", media: ["is-demo-shot"], mediaUsages: [{ mediaId: "is-demo-shot", usageId: "is-demo-shot-usage", caption: "Кадр из сериала «Исповедь школьника»", placement: "wide" }], headings: [{ id: "nastoyashchee", title: "Настоящее", level: 2 }, { id: "pochemu-ya-nachal", title: "Почему я начал", level: 3 }, { id: "pochemu-eto-interesno", title: "Почему это интересно", level: 3 }], text: searchTexts["mne-vsegda-hotelos-byt-glavnym"] },
  { slug: "upravlenie-komandoy", title: "Управление командой", description: "Как желание сохранить полный контроль разрушило коллективный проект.", publishedAt: "2026-08-02", authors: [{ personId: "imran-badretdinov", role: "Автор" }, { personId: "klim-gulyaev", role: "Актёр сериала" }, commonExpert], people: ["klim-gulyaev"], tags: ["Истории", "Сериалы", "Лидерство", "N-вариант"], issue: "opyt-proshlyh-let", showInMaterialsArchive: true, cover: "klim-report", media: ["klim-report"], quoteIds: ["shest-roley-vyzov"], mediaUsages: [{ mediaId: "klim-report", usageId: "klim-report-usage", caption: "Кадр из первого интервью Клима Гуляева (LOST MEDIA)", placement: "wide" }], headings: [{ id: "nachalo", title: "Начало", level: 2 }, { id: "serial", title: "Сериал", level: 2 }, { id: "komandnaya-rabota", title: "Командная работа", level: 2 }, { id: "itog", title: "Итог", level: 2 }], text: searchTexts["upravlenie-komandoy"] },
  { slug: "shest-roley", title: "6 ролей", description: "Воспоминания одного из актёров сериала «Исповедь школьника».", publishedAt: "2026-08-02", authors: [{ personId: "klim-gulyaev", role: "Автор" }, commonExpert], tags: ["Воспоминания", "Сериалы"], issue: "opyt-proshlyh-let", showInMaterialsArchive: true, media: [], headings: [{ id: "moe-sostoyanie", title: "Моё состояние", level: 3 }, { id: "chto-ya-ponyal", title: "Что я понял", level: 3 }, { id: "zaklyuchenie", title: "Заключение", level: 3 }], text: searchTexts["shest-roley"] },
  { slug: "serial-na-dvoih", title: "Сериал на двоих", description: "Как рост технического качества уничтожил атмосферу.", publishedAt: "2026-08-02", authors: [{ personId: "imran-badretdinov", role: "Автор" }, commonExpert], people: ["klim-gulyaev"], tags: ["Истории", "Сериалы", "Производственный ад", "N-вариант"], issue: "opyt-proshlyh-let", showInMaterialsArchive: true, cover: "editing", media: ["cave", "editing"], mediaUsages: [{ mediaId: "cave", usageId: "cave-usage", caption: "Кадр из пещеры для невыпущенного 4 эпизода сериала «Выжить в школе»", placement: "wide" }, { mediaId: "editing", usageId: "editing-usage", caption: "Монтаж сериала «Выжить в школе»: финальный рендер", placement: "wide" }], headings: [{ id: "ideya", title: "Идея", level: 2 }, { id: "reaktsiya-auditorii", title: "Реакция аудитории", level: 2 }, { id: "proizvodstvennyy-ad", title: "Производственный ад", level: 2 }, { id: "zaklyuchenie", title: "Заключение", level: 2 }], text: `${searchTexts["serial-na-dvoih"]} ${plotSearchText}` },
  { slug: "kogda-ty-ne-glavnyy", title: "Когда ты не главный", description: "Как я работал в команде, не будучи главным.", publishedAt: "2026-08-02", authors: [{ personId: "imran-badretdinov", role: "Автор" }, commonExpert], tags: ["Истории", "Музыка", "N-вариант"], issue: "opyt-proshlyh-let", showInMaterialsArchive: true, media: [], headings: [{ id: "s-chego-vse-nachalos", title: "С чего всё началось", level: 2 }, { id: "chto-ya-sdelal", title: "Что я сделал", level: 2 }], text: searchTexts["kogda-ty-ne-glavnyy"] },
  { slug: "osnovanie-n-varianta", title: "Основание N-варианта", description: "Как мы создавали N-вариант.", publishedAt: "2026-08-02", authors: [{ personId: "imran-badretdinov", role: "Автор" }, commonExpert], people: ["klim-gulyaev", "samad-yusupov"], tags: ["N-вариант"], issue: "opyt-proshlyh-let", showInMaterialsArchive: true, cover: "hi-imran", media: ["hi-imran", "hi-klim"], mediaUsages: [{ mediaId: "hi-imran", usageId: "hi-imran-usage", caption: "Из работы над «Выжить в школе»", placement: "wide" }, { mediaId: "hi-klim", usageId: "hi-klim-usage", caption: "Из работы над 2 сезоном сериала «Исповедь школьника»", placement: "wide" }], headings: [{ id: "privet", title: "Привет", level: 2 }, { id: "osnovateli", title: "Основатели", level: 2 }, { id: "workflow", title: "Немного о нашем workflow", level: 2 }], text: searchTexts["osnovanie-n-varianta"] },
];

export function calculateReadingTime(text: string) {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/u).filter(Boolean).length / 180));
}
export const materials: MaterialMetadata[] = records.map((material) => ({ ...material, readingTime: calculateReadingTime(material.text) }));

export const issues: Issue[] = [{
  number: 1, slug: "opyt-proshlyh-let", title: "Опыт прошлых лет",
  description: "Истории о желании контролировать всё, перегрузке, делегировании, ограниченной ответственности и создании собственной площадки.",
  publishedAt: "2026-08-02", cover: "issue-cover",
  sections: [
    { id: "vstuplenie", title: "Вступление", intro: "От желания быть главным — к вопросу о разделении ответственности.", blocks: [{ type: "material", material: "mne-vsegda-hotelos-byt-glavnym" }] },
    { id: "kontrol", title: "Глава I. Контроль", intro: "Коллективный проект, шесть ролей и цена полного контроля.", blocks: [{ type: "material", material: "upravlenie-komandoy" }, { type: "material", material: "shest-roley" }] },
    { id: "otvetstvennost", title: "Глава II. Перегрузка и ограниченная ответственность", intro: "Как техническое качество вытесняет атмосферу — и почему иногда лучше не быть главным.", blocks: [{ type: "material", material: "serial-na-dvoih" }, { type: "material", material: "kogda-ty-ne-glavnyy" }] },
    { id: "novoe-nachalo", title: "Глава III. Новое начало", intro: "Создание собственной площадки для опыта, попыток и новых вариантов.", blocks: [{ type: "material", material: "osnovanie-n-varianta" }] },
  ],
  seo: { title: "№1. Опыт прошлых лет", description: "Контроль, перегрузка, делегирование, ограниченная ответственность и создание N-варианта.", image: "/media/issue-cover.png" },
}];

export const publicMaterials = materials.filter((material) => !material.private);
export const publicIssues = issues.filter((issue) => !issue.private);

export function getMaterial(slug: string) { return materials.find((item) => item.slug === slug); }
export function getIssue(slug: string) { return issues.find((item) => item.slug === slug); }
export function getPerson(id: string) { return people.find((item) => item.id === id); }
export function getMedia(id: string) { return media.find((item) => item.id === id); }
export function getQuote(id: string) { return quotes.find((item) => item.id === id); }
export function materialIssue(material: MaterialMetadata) { return material.issue ? getIssue(material.issue) : undefined; }
export function issueMaterials(issue: Issue) {
  return issue.sections.flatMap((section) => section.blocks.filter((block): block is Extract<typeof block, { type: "material" }> => block.type === "material").map((block) => getMaterial(block.material)!));
}
export function mediaUsages(id: string): MediaUsage[] {
  const usages: MediaUsage[] = [];
  for (const material of publicMaterials) for (const usage of material.mediaUsages ?? []) if (usage.mediaId === id) {
    usages.push({ mediaId: id, usageId: usage.usageId, label: material.title, url: `/materials/${material.slug}#media-${usage.usageId}`, context: "material" });
    const issue = materialIssue(material);
    if (issue && !issue.private) usages.push({ mediaId: id, usageId: `${usage.usageId}-issue`, label: `№${issue.number} «${issue.title}»: ${material.title}`, url: `/issues/${issue.slug}#media-${usage.usageId}`, context: "issue" });
  }
  for (const issue of publicIssues) if (issue.cover === id) usages.push({ mediaId: id, usageId: `${id}-cover`, label: `Обложка выпуска №${issue.number} «${issue.title}»`, url: `/issues/${issue.slug}#media-${id}-cover`, context: "issue" });
  for (const person of people) if (person.photo === id) usages.push({ mediaId: id, usageId: `${id}-portrait`, label: person.name, url: `/people#person-${person.id}`, context: "person" });
  return usages;
}
export function searchIndex(): SearchEntry[] {
  return [
    ...publicIssues.map((issue) => ({ id: `issue-${issue.slug}`, type: "Выпуск" as const, title: `№${issue.number} ${issue.title}`, text: `${issue.description} ${issue.sections.map((section) => `${section.title} ${section.intro ?? ""}`).join(" ")}`, url: `/issues/${issue.slug}`, tags: [] })),
    ...publicMaterials.map((material) => ({ id: `material-${material.slug}`, type: "Материал" as const, title: material.title, text: `${material.description} ${material.text} ${material.authors.map((author) => getPerson(author.personId)?.name ?? "").join(" ")} ${materialIssue(material)?.private ? "" : materialIssue(material)?.title ?? ""} №${materialIssue(material)?.private ? "" : materialIssue(material)?.number ?? ""}`, url: `/materials/${material.slug}`, tags: material.tags })),
    ...people.map((person) => ({ id: `person-${person.id}`, type: "Человек" as const, title: person.name, text: `${person.aliases?.join(" ") ?? ""} ${person.description} ${person.occupation}`, url: `/people#person-${person.id}`, tags: person.tags })),
    ...media.map((asset) => ({ id: `media-${asset.id}`, type: "Медиа" as const, title: asset.title, text: `${asset.description} ${asset.alt} ${asset.author} ${asset.source}`, url: `/media/${asset.id}`, tags: asset.tags })),
    ...quotes.filter((quote) => !quote.sourceMaterial || !getMaterial(quote.sourceMaterial)?.private).map((quote) => ({ id: `quote-${quote.id}`, type: "Цитата" as const, title: quote.sourceTitle, text: quote.text, url: quote.sourceUrl, tags: [] })),
  ];
}
