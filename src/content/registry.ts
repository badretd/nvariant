import type { Issue, MaterialMetadata, MediaAsset, MediaUsage, Person, Quote, SearchEntry } from "@/lib/types";

export const people: Person[] = [
  {
    id: "imran-badretdinov",
    name: "Имран Бадретдинов",
    photo: "hi-imran",
    description: "Программист, режиссёр и оператор; автор материалов о собственных творческих проектах и N-варианте.",
    occupation: "Автор, программист, режиссёр, оператор",
    aliases: ["logka"],
    tags: ["N-вариант", "сериалы", "музыка"],
  },
  {
    id: "klim-gulyaev",
    name: "Клим Гуляев",
    photo: "hi-klim",
    description: "Соавтор сериала «Выжить в школе» и сооснователь N-варианта.",
    occupation: "Соавтор, сооснователь",
    tags: ["N-вариант", "сериалы"],
  },
];

export const quotes: Quote[] = [];

export const media: MediaAsset[] = [
  {
    id: "is-demo-shot", type: "image", kind: "cover", title: "Кадр из сериала «Исповедь школьника»",
    src: "/media/is-demo-shot.png", width: 1280, height: 720,
    alt: "Два человека направляют игрушечные пистолеты на подростка с поднятыми руками; в одной руке у него банкноты",
    description: "Сохранившийся стоп-кадр из пилотной серии «Исповеди школьника».",
    author: "Имран Бадретдинов", source: "Личный архив", license: "CC BY 4.0",
    createdAt: "2023-04-09", downloadable: true, tags: ["сериал", "Исповедь школьника", "выпуск №1"],
  },
  {
    id: "vs-edit-process", type: "image", kind: "material", title: "Монтаж сериала «Выжить в школе»",
    src: "/media/vs-edit-process.png", width: 1280, height: 720,
    alt: "Экран монтажной программы DaVinci Resolve с многослойной видео- и аудиодорожкой сериала «Выжить в школе»",
    description: "Процесс монтажа третьей серии «Выжить в школе».",
    author: "Имран Бадретдинов", source: "Личный архив", license: "CC BY 4.0",
    createdAt: "2024-09-07", downloadable: true, tags: ["сериал", "монтаж", "Выжить в школе"],
  },
  {
    id: "hi-imran", type: "image", kind: "person", title: "Из работы над «Выжить в школе»",
    src: "/media/hi-imran.png", width: 960, height: 1280,
    alt: "Имран Бадретдинов сидит в комнате и держит перед собой игрушечный пистолет",
    description: "Фотография Имрана Бадретдинова со съёмок «Выжить в школе».",
    author: "Имран Бадретдинов", source: "Личный архив", license: "CC BY 4.0",
    createdAt: "2024-09-26", downloadable: true, tags: ["портрет", "Имран Бадретдинов", "Выжить в школе"],
  },
  {
    id: "hi-klim", type: "image", kind: "person", title: "Из работы над [УДАЛЕНО]",
    src: "/media/hi-klim.png", width: 720, height: 1280,
    alt: "Клим Гуляев в тёмном спортивном костюме и жёлтой шапке стоит у стены здания",
    description: "Фотография Клима Гуляева из личного архива.",
    author: "Имран Бадретдинов", source: "Личный архив", license: "CC BY 4.0",
    createdAt: "2024-10-07", downloadable: true, tags: ["портрет", "Клим Гуляев"],
  },
];

const materialRecords: MaterialMetadata[] = [
  {
    slug: "upravlenie-komandoy", title: "Управление командой",
    description: "О том, как я создал и уничтожил команду из примерно десяти человек.",
    publishedAt: "2026-07-26", authors: [{ personId: "imran-badretdinov", role: "Автор" }],
    tags: ["лидерство", "сериалы", "N-вариант"], issue: "opyt-proshlyh-let",
    showInMaterialsArchive: true, cover: "is-demo-shot", media: ["is-demo-shot"],
    mediaUsages: [{ mediaId: "is-demo-shot", usageId: "is-demo-shot-usage", caption: "Кадр из сериала «Исповедь школьника»", placement: "wide" }],
    headings: [{ id: "v-chem-delo", title: "В чём дело?", level: 2 }, { id: "sovet", title: "Совет", level: 2 }],
    readingTime: 1,
    text: `Сколько себя помню, я всегда везде хотел быть главным, несмотря на свою тотальную безответственность. В любой игре я всегда стремился быть лидером. И вот в 2023 году мне выпала возможность продюсировать сериал по идее моего друга. Я специально не упоминаю его, потому что получилось очень плохо.
В чём дело? Сейчас вы нигде не сможете посмотреть полноценную серию, потому что серии были удалены из сети. Не по моей воле, но это уже неважно. Единственное, что осталось от сериала, — несколько стоп-кадров из пилотной серии.
Спустя время могу сказать, что сериал очень плохо состарился. Мы все уже давно изменились настолько, что не узнаём тех людей на экране, которыми когда-то сами были. Боевые сцены поставлены особенно отвратительно. Ну и актёрская игра тоже удивляет.
Самое удивительное в этой ситуации то, что после просмотра результата первой серии мы пошли снимать вторую. На тот момент нам всё понравилось. Я думаю, дело в том, что все, кто принимал участие в создании сериала, полюбили его именно за тот труд, который они в него вложили. Но со временем это чувство ослабевало, а желание всё удалить нарастало.
Совет. Наша команда распалась из-за разногласий в видении сюжета. Через время я понимаю, что мне стоило прислушаться к команде и идти на компромиссы, чтобы удержать проект на плаву. Что случилось бы, если бы я тогда поступил по-другому? Никто уже не узнает.
И если вы занимаетесь чем-то подобным в качестве лидера, то всегда берите критически важные вопросы на себя, а не делегируйте создание главного медиа человеку, у которого может появиться желание всё удалить.`,
    seo: { description: "Личный опыт лидерства, распада творческой команды и запоздалый разговор о компромиссах." },
  },
  {
    slug: "serial-na-dvoih", title: "Сериал на двоих",
    description: "Как наше дуо создавало свой личный бренд.",
    publishedAt: "2026-07-26", authors: [{ personId: "imran-badretdinov", role: "Автор" }, { personId: "klim-gulyaev", role: "Соавтор проекта" }],
    tags: ["производственный ад", "сериалы", "N-вариант"], issue: "opyt-proshlyh-let",
    showInMaterialsArchive: true, cover: "vs-edit-process", media: ["vs-edit-process"],
    mediaUsages: [{ mediaId: "vs-edit-process", usageId: "vs-edit-usage", caption: "Монтаж сериала «Выжить в школе»", placement: "wide" }],
    headings: [{ id: "pro-delegirovanie", title: "Про делегирование", level: 2 }],
    readingTime: 1,
    text: `2 сентября 2024 года, в первый учебный день, на новом тогда телеграм-канале «Выжить в школе» выходит одноимённый сериал. Это был хоррор с элементами голосования зрителей. После каждой серии появлялось голосование, которое решало, куда дальше пойдёт сюжет. Всего было выпущено три серии и одна утерянная под номером четыре.
Сериал делали вместе с Климом Гуляевым. Первую серию сделали за один день, без особого напряга. Вторую монтировал уже я на компьютере два дня. А третью мы делали с жесточайшими переработками до часа ночи, лишь бы успеть домонтировать, снять и выложить всё за три дня.
Мне очень понравилось работать над ним. Хоть он и собрал меньше просмотров, чем «Исповедь школьника», но всё же это хороший сериал, за который мне до сих пор не стыдно.
Про делегирование. Чем больше я делал сам, тем хуже в итоге получалось. Это заметно по убыванию вайба с первой по третью серию. Под конец монтаж стал явно лучше, но это уже не то. Я не умел делать хорроры, и лучше было делегировать всё это прошаренному человеку. Но что случилось, то случилось.
Пересмотрел третью серию во время написания этой статьи и понял, что саунд-дизайн и правда, без иронии, здесь на высоте. Все звуки воссозданы с нуля, потому что записывать звук возможности не было. Это очень круто.
И да, именно тогда я понял, что не обязан уметь делать абсолютно всё, ведь можно просто дать задачу, с которой ты плохо справляешься, другому человеку. Удивительно!`,
  },
  {
    slug: "kogda-ty-ne-glavnyy", title: "Когда ты не главный",
    description: "Работа в команде без лидерской роли.",
    publishedAt: "2026-07-26", authors: [{ personId: "imran-badretdinov", role: "Автор музыки и текста" }],
    tags: ["игры", "музыка", "logka"], issue: "opyt-proshlyh-let",
    showInMaterialsArchive: true, media: [],
    headings: [], readingTime: 1,
    text: `Какой же кайф работать не 24/7. Хотя даже если ты работаешь 24/7, но имеешь только часть ответственности за проект, то это тоже кайф, я считаю. Я работал над OST для игры «Копия» от spacepond. Сделал 11 треков за две недели и не пожалел. После ещё примерно месяца работы я смог собрать семь лучших, которые попали в мой первый релиз под основным ником logka. Плеер с Bandcamp позволяет послушать его, не выходя с сайта.
Получилось как-то так. Ну а ещё да: игра выйдет только в 2027 году, походу. Но мы не отчаиваемся. Хотел бы рассказать ещё про вечер в день релиза альбома. Тогда мы собрались с друзьями в дискорде и послушали все треки перед релизом. Это был самый вайбовый день в моей жизни. И да, возможно, в будущем этот материал обновится и статья перестанет быть бесполезной саморекламой.`,
  },
  {
    slug: "filosofiya-n-varianta", title: "Философия N-варианта",
    description: "Почему N-вариант — это архив попыток, а не гонка за вниманием.",
    publishedAt: "2026-07-26", authors: [{ personId: "imran-badretdinov", role: "Автор исходной идеи" }],
    tags: ["N-вариант", "ИИ", "редакция"], issue: "opyt-proshlyh-let",
    showInMaterialsArchive: true, media: [],
    headings: [], readingTime: 1,
    text: `Интернет редко поощряет медленное чтение.
Большинство сайтов хотят удержать внимание ещё на секунду дольше. Алгоритмы предлагают следующий материал раньше, чем человек успевает закончить предыдущий. Метрики измеряют клики, просмотры, удержание, время на странице. Постепенно становится проще создавать не то, что хочется исследовать, а то, что с большей вероятностью будет замечено.
Это не обвинение алгоритмам. Они делают то, для чего были созданы. Но у любой системы оптимизации есть побочный эффект: она постепенно начинает влиять не только на распространение идей, но и на их рождение.
Именно поэтому появился N-вариант.
Это не новостной сайт, не блог и не попытка выиграть гонку за внимание. Здесь материалы не публикуются потому, что их пора выпускать. Они появляются тогда, когда появляется мысль, которую нельзя оставить незаписанной.
Каждый выпуск — это законченная композиция. Отдельные материалы могут существовать самостоятельно, но внутри выпуска они становятся частью большего разговора. Здесь важен не только текст, но и его соседство с другими текстами, иллюстрациями, цитатами и идеями.
Название «N-вариант» выбрано не случайно. В математике и программировании буквой N часто обозначают неизвестное количество. Не ответ, а пространство возможных ответов. Новый вариант решения. Следующую попытку. Продолжение исследования.
Этот сайт устроен похожим образом. Он не пытается сформулировать окончательные выводы. Скорее, он собирает варианты понимания мира, технологий, культуры и творчества.
Здесь не существует требования всегда быть правым. Если спустя время материал окажется неполным или неточным, он будет исправлен. История изменений останется открытой. Ошибка не воспринимается как повод удалить мысль — она становится частью процесса её уточнения. Поэтому на сайте есть раздел правок.
Ещё одна особенность проекта — уважение к источникам. Каждая фотография, иллюстрация, видео или цитата сопровождаются метаданными: авторством, лицензией, происхождением и контекстом использования. Галерея существует не как украшение, а как архив визуального материала, где каждое изображение можно проследить до места, в котором оно было использовано.
Технологии здесь — не тема сами по себе. Меня интересует не только то, что можно создать, но и почему появляется желание создавать именно это. Какие идеи рождаются из любопытства, какие — из необходимости, а какие — из стремления соответствовать ожиданиям окружающих.
Вероятно, большинство проектов, о которых будет рассказано здесь, никогда не станут массовыми. Некоторые окажутся неудачными. Некоторые будут существовать всего несколько недель. Другие изменятся до неузнаваемости. Это нормально.
Творчество не обязано быть линейным. Исследование редко движется по прямой.
Поэтому N-вариант — это не архив успехов. Это архив попыток.
Если хотя бы одна опубликованная здесь идея подтолкнёт кого-то сделать собственный, более удачный вариант, значит, она уже выполнила свою задачу.`,
  },
];

export function calculateReadingTime(text: string) {
  const words = text.trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}
export const materials: MaterialMetadata[] = materialRecords.map((material) => ({ ...material, readingTime: calculateReadingTime(material.text) }));

export const issues: Issue[] = [{
  number: 1,
  slug: "opyt-proshlyh-let",
  title: "Опыт прошлых лет",
  description: "Истории о контроле, делегировании и попытках не уничтожить идею в процессе её создания.",
  publishedAt: "2026-07-26",
  cover: "is-demo-shot",
  sections: [
    {
      id: "iz-moego-opyta", title: "Из моего опыта", intro: "Важнейший период в моей жизни.",
      blocks: [
        { type: "material", material: "upravlenie-komandoy" },
        { type: "material", material: "serial-na-dvoih" },
        { type: "material", material: "kogda-ty-ne-glavnyy" },
      ],
    },
    {
      id: "n-variant", title: "N-вариант", intro: "Почему это место стало архивом попыток.",
      blocks: [{ type: "material", material: "filosofiya-n-varianta" }],
    },
  ],
  seo: { title: "№1. Опыт прошлых лет", description: "Истории о контроле, делегировании и попытках не уничтожить идею в процессе её создания.", image: "/media/is-demo-shot.png" },
}];

export function getMaterial(slug: string) { return materials.find((item) => item.slug === slug); }
export function getIssue(slug: string) { return issues.find((item) => item.slug === slug); }
export function getPerson(id: string) { return people.find((item) => item.id === id); }
export function getMedia(id: string) { return media.find((item) => item.id === id); }
export function getQuote(id: string) { return quotes.find((quote) => quote.id === id); }
export function materialIssue(material: MaterialMetadata) { return material.issue ? getIssue(material.issue) : undefined; }
export function issueMaterials(issue: Issue) {
  return issue.sections.flatMap((section) => section.blocks
    .filter((block): block is Extract<typeof block, { type: "material" }> => block.type === "material")
    .map((block) => getMaterial(block.material)!));
}
export function mediaUsages(id: string): MediaUsage[] {
  const usages: MediaUsage[] = [];
  for (const material of materials) {
    for (const usage of material.mediaUsages ?? []) if (usage.mediaId === id) {
      usages.push({ mediaId: id, usageId: usage.usageId, label: material.title, url: `/materials/${material.slug}#media-${id}`, context: "material" });
      const issue = materialIssue(material);
      if (issue) usages.push({ mediaId: id, usageId: `${usage.usageId}-issue`, label: `№${issue.number} «${issue.title}»: ${material.title}`, url: `/issues/${issue.slug}#media-${id}`, context: "issue" });
    }
  }
  for (const issue of issues) if (issue.cover === id) usages.push({ mediaId: id, usageId: `${id}-cover`, label: `Обложка выпуска №${issue.number} «${issue.title}»`, url: `/issues/${issue.slug}#media-${id}-cover`, context: "issue" });
  for (const person of people) if (person.photo === id) usages.push({ mediaId: id, usageId: `${id}-portrait`, label: person.name, url: `/people#media-${id}`, context: "person" });
  return usages;
}
export function searchIndex(): SearchEntry[] {
  return [
    ...issues.flatMap((issue) => [
      { id: `issue-${issue.slug}`, type: "Выпуск" as const, title: `№${issue.number} ${issue.title}`, text: `${issue.description} ${issue.sections.map((section) => `${section.title} ${section.intro ?? ""}`).join(" ")}`, url: `/issues/${issue.slug}`, tags: [] },
      ...issue.sections.map((section) => ({ id: `section-${issue.slug}-${section.id}`, type: "Выпуск" as const, title: `${issue.title}: ${section.title}`, text: section.intro ?? "", url: `/issues/${issue.slug}#section-${section.id}`, tags: [] })),
    ]),
    ...materials.map((material) => ({ id: `material-${material.slug}`, type: "Материал" as const, title: material.title, text: `${material.description} ${material.text} ${material.headings.map((heading) => heading.title).join(" ")} ${material.authors.map((author) => getPerson(author.personId)?.name).join(" ")} ${(material.mediaUsages ?? []).map((usage) => usage.caption).join(" ")}`, url: `/materials/${material.slug}`, tags: material.tags })),
    ...people.map((person) => ({ id: `person-${person.id}`, type: "Человек" as const, title: person.name, text: `${person.aliases?.join(" ") ?? ""} ${person.description} ${person.occupation} ${materials.filter((material) => material.authors.some((author) => author.personId === person.id) || material.people?.includes(person.id)).map((material) => `${material.title} ${material.tags.join(" ")}`).join(" ")}`, url: `/people#person-${person.id}`, tags: person.tags })),
    ...media.map((asset) => ({ id: `media-${asset.id}`, type: "Медиа" as const, title: asset.title, text: `${asset.description} ${asset.alt} ${asset.author} ${materials.flatMap((material) => material.mediaUsages ?? []).filter((usage) => usage.mediaId === asset.id).map((usage) => usage.caption).join(" ")}`, url: `/media/${asset.id}`, tags: asset.tags })),
  ];
}
