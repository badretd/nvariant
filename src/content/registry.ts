import type { Issue, MaterialMetadata, MediaAsset, MediaUsage, Person, Quote, SearchEntry } from "@/lib/types";

export const people: Person[] = [
  { id: "alisa-morozova", name: "Алиса Морозова", description: "Редактор и исследовательница повседневных городских практик.", occupation: "Автор, редактор", aliases: ["А. Морозова"], tags: ["город", "наблюдение"] },
  { id: "lev-savin", name: "Лев Савин", description: "Фотограф, работающий с архитектурой и следами времени.", occupation: "Фотограф", tags: ["фотография", "архитектура"] },
  { id: "vera-krylova", name: "Вера Крылова", description: "Независимая разработчица и дизайнер интерактивных систем.", occupation: "Автор, разработчик", tags: ["технологии", "интерфейсы"] },
  { id: "mira-volkova", name: "Мира Волкова", description: "Вымышленная героиня демонстрационного интервью о звуковой памяти.", occupation: "Архивистка звука", aliases: ["М. Волкова"], tags: ["звук", "архив"] },
];

export const quotes: Quote[] = [{
  id: "city-pause", text: "Пауза — тоже часть городской партитуры.", person: "mira-volkova",
  sourceTitle: "Город, который слышно", sourceUrl: "/materials/gorod-kotoryy-slyshno#quote-city-pause",
  sourceMaterial: "gorod-kotoryy-slyshno", context: "О внимании к тихим промежуткам.", date: "2026-07-18",
}];

export const media: MediaAsset[] = [
  { id: "issue-1-cover", type: "image", kind: "cover", title: "Обложка выпуска №1", src: "/media/issue-1-cover.svg", alt: "Геометрическая обложка с красным кругом и координатной сеткой", description: "Обложка первого выпуска «Точки сборки».", author: "Редакция N-вариант", source: "N-вариант", license: "CC BY-NC 4.0", createdAt: "2026-07-20", downloadable: true, tags: ["обложка", "выпуск"] },
  { id: "city-grid", type: "image", kind: "material", title: "Городская сетка", src: "/media/city-grid.svg", alt: "Схематичный городской квартал, пересечённый красной линией", description: "Редакционная схема маршрута и остановок.", author: "Лев Савин", source: "N-вариант", license: "CC BY-NC 4.0", createdAt: "2026-07-18", downloadable: true, tags: ["город", "схема"] },
  { id: "signal-field", type: "animation", kind: "illustration", title: "Поле сигналов", src: "/media/signal-field.svg", alt: "Ритмические вертикальные линии разной высоты", description: "Визуальная метафора слабых и сильных сигналов.", author: "Вера Крылова", source: "N-вариант", license: "CC BY-NC 4.0", createdAt: "2026-07-19", downloadable: true, tags: ["сигнал", "интерфейс"] },
  { id: "design-video", type: "youtube", kind: "video", title: "Короткая история дизайна", youtubeId: "wIuVvCuiJhU", thumbnail: "https://i.ytimg.com/vi/wIuVvCuiJhU/hqdefault.jpg", alt: "Превью видеолекции о дизайне", description: "Внешняя видеолекция как пример ленивого YouTube-встраивания.", author: "YouTube-автор", source: "YouTube", sourceUrl: "https://www.youtube.com/watch?v=wIuVvCuiJhU", license: "Стандартная лицензия YouTube", createdAt: "2026-07-19", downloadable: false, tags: ["видео", "дизайн"] },
  { id: "vera-portrait", type: "image", kind: "person", title: "Портрет Веры Крыловой", src: "/media/vera-portrait.svg", alt: "Абстрактный графический портрет в профиль", description: "Условный портрет участницы журнала.", author: "Редакция N-вариант", source: "N-вариант", license: "CC BY-NC 4.0", createdAt: "2026-07-20", downloadable: true, tags: ["портрет", "люди"] },
];

const materialRecords: MaterialMetadata[] = [
  { slug: "gorod-kotoryy-slyshno", title: "Город, который слышно", description: "Разговор о том, как тихие звуки становятся способом читать пространство.", publishedAt: "2026-07-18", authors: [{ personId: "alisa-morozova", role: "Автор и интервьюер" }, { personId: "lev-savin", role: "Фотограф" }], people: ["mira-volkova"], tags: ["город", "интервью", "звук"], issue: "tochki-sborki", showInMaterialsArchive: true, cover: "city-grid", media: ["city-grid"], quoteIds: ["city-pause"], headings: [{ id: "slow-listening", title: "Медленное слушание", level: 2 }, { id: "map-of-pauses", title: "Карта пауз", level: 2 }], readingTime: 4, text: "город звук маршрут пауза двор шум тишина внимание архив медленное слушание карта пауз" },
  { slug: "interfeys-do-zhesta", title: "Интерфейс до жеста", description: "Что происходит между намерением человека и ответом системы.", publishedAt: "2026-07-19", updatedAt: "2026-07-22", authors: [{ personId: "vera-krylova", role: "Автор и разработчик" }], tags: ["технологии", "интерфейсы", "эссе"], issue: "tochki-sborki", showInMaterialsArchive: true, cover: "signal-field", media: ["signal-field"], headings: [{ id: "space-between", title: "Пространство между", level: 2 }, { id: "test-system", title: "Проверить систему", level: 2 }], readingTime: 5, text: "интерфейс жест ожидание система обратная связь кнопка сигнал интерактивная шкала пространство между", corrections: [{ date: "2026-07-22", text: "Уточнено описание клавиатурного управления интерактивной шкалой." }] },
  { slug: "veshchi-pomnyat-formu", title: "Вещи помнят форму", description: "Короткое фотоэссе о следах использования и незаметном ремонте.", publishedAt: "2026-07-20", authors: [{ personId: "lev-savin", role: "Фотограф" }, { personId: "alisa-morozova", role: "Редактор" }], tags: ["фотография", "архитектура", "наблюдение"], issue: "tochki-sborki", showInMaterialsArchive: true, media: ["city-grid", "design-video"], headings: [{ id: "repair-line", title: "Линия ремонта", level: 2 }], readingTime: 3, text: "вещи форма ремонт поверхность фотография след использование архитектура линия ремонта видео" },
  { slug: "zametka-o-pustote", title: "Заметка о полезной пустоте", description: "Независимая заметка о свободном месте как рабочем инструменте.", publishedAt: "2026-07-24", authors: [{ personId: "vera-krylova", role: "Автор" }], tags: ["эссе", "дизайн", "пространство"], showInMaterialsArchive: true, media: ["signal-field"], headings: [{ id: "room-to-think", title: "Место для мысли", level: 2 }], readingTime: 2, text: "пустота свободное место дизайн внимание пауза пространство мысль композиция" },
];
export function calculateReadingTime(text: string) {
  const words = text.trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}
export const materials: MaterialMetadata[] = materialRecords.map((material) => ({
  ...material,
  readingTime: calculateReadingTime(material.text),
}));

export const issues: Issue[] = [{
  number: 1, slug: "tochki-sborki", title: "Точки сборки", description: "Первый выпуск о паузах, сигналах и следах, из которых складывается повседневность.", publishedAt: "2026-07-20", cover: "issue-1-cover",
  sections: [
    { id: "vstuplenie", title: "Вступление", intro: "Мы начинаем с малого: прислушиваемся, проверяем отклик и замечаем след.", blocks: [{ type: "editorial", text: "Выпуск устроен как последовательность трёх приближений — от города к интерфейсу и вещи." }, { type: "quote", quote: "city-pause" }] },
    { id: "lyudi", title: "Люди и пространство", intro: "Первый маршрут проходит через звуковую память.", blocks: [{ type: "material", material: "gorod-kotoryy-slyshno" }] },
    { id: "signaly", title: "Сигналы", intro: "Второй раздел смотрит на едва заметный ответ системы.", blocks: [{ type: "material", material: "interfeys-do-zhesta" }, { type: "media", media: "signal-field", caption: "Общий визуальный ритм выпуска." }] },
    { id: "sledy", title: "Следы", intro: "Финал — наблюдение за поверхностями, которые хранят работу рук.", blocks: [{ type: "material", material: "veshchi-pomnyat-formu" }] },
  ],
  corrections: [{ date: "2026-07-23", text: "Добавлена ссылка на источник видеоматериала в третьем разделе." }],
}];

export function getMaterial(slug: string) { return materials.find((item) => item.slug === slug); }
export function getIssue(slug: string) { return issues.find((item) => item.slug === slug); }
export function getPerson(id: string) { return people.find((item) => item.id === id); }
export function getMedia(id: string) { return media.find((item) => item.id === id); }
export function getQuote(id: string) { return quotes.find((item) => item.id === id); }
export function materialIssue(material: MaterialMetadata) { return material.issue ? getIssue(material.issue) : undefined; }
export function issueMaterials(issue: Issue) { return issue.sections.flatMap((s) => s.blocks.filter((b): b is Extract<typeof b, { type: "material" }> => b.type === "material").map((b) => getMaterial(b.material)!)); }
export function mediaUsages(id: string): MediaUsage[] {
  const usages: MediaUsage[] = [];
  for (const material of materials) if (material.media?.includes(id) || material.cover === id) usages.push({ mediaId: id, label: material.title, url: `/materials/${material.slug}#media-${id}`, context: "material" });
  for (const issue of issues) {
    if (issue.cover === id) usages.push({ mediaId: id, label: `Выпуск №${issue.number} «${issue.title}»`, url: `/issues/${issue.slug}#media-${id}`, context: "issue" });
    for (const section of issue.sections) for (const block of section.blocks) if (block.type === "media" && block.media === id) usages.push({ mediaId: id, label: `${issue.title}: ${section.title}`, url: `/issues/${issue.slug}#media-${id}`, context: "issue" });
  }
  for (const person of people) if (person.photo === id) usages.push({ mediaId: id, label: person.name, url: `/people#person-${person.id}`, context: "person" });
  return usages;
}
export function searchIndex(): SearchEntry[] {
  return [
    ...issues.flatMap((i) => [{ id: `issue-${i.slug}`, type: "Выпуск" as const, title: `№${i.number} ${i.title}`, text: `${i.description} ${i.sections.map((s) => `${s.title} ${s.intro ?? ""}`).join(" ")}`, url: `/issues/${i.slug}`, tags: [] }, ...i.sections.map((s) => ({ id: `section-${i.slug}-${s.id}`, type: "Выпуск" as const, title: `${i.title}: ${s.title}`, text: s.intro ?? "", url: `/issues/${i.slug}#section-${s.id}`, tags: [] }))]),
    ...materials.map((m) => ({ id: `material-${m.slug}`, type: "Материал" as const, title: m.title, text: `${m.description} ${m.text} ${m.authors.map((a) => getPerson(a.personId)?.name).join(" ")}`, url: `/materials/${m.slug}`, tags: m.tags })),
    ...people.map((p) => ({ id: `person-${p.id}`, type: "Человек" as const, title: p.name, text: `${p.aliases?.join(" ") ?? ""} ${p.description} ${p.occupation} ${materials.filter((m) => m.authors.some((a) => a.personId === p.id) || m.people?.includes(p.id)).map((m) => `${m.title} ${m.tags.join(" ")}`).join(" ")}`, url: `/people#person-${p.id}`, tags: p.tags })),
    ...media.map((m) => ({ id: `media-${m.id}`, type: "Медиа" as const, title: m.title, text: `${m.description} ${m.alt} ${m.author}`, url: `/media/${m.id}`, tags: m.tags })),
    ...quotes.map((q) => ({ id: `quote-${q.id}`, type: "Цитата" as const, title: q.sourceTitle, text: `${q.text} ${q.context ?? ""}`, url: q.sourceUrl, tags: [] })),
  ];
}
