# N-вариант

N-вариант — русскоязычный цифровой журнал на Next.js 16 App Router, React 19, TypeScript и MDX. Контент хранится непосредственно в Git-репозитории. Проект не использует CMS, базу данных, внешний поисковый сервис или серверное API.

Этот документ — инструкция для редактора или разработчика, который вручную добавляет:

- отдельный материал;
- фотографию, обложку или другое медиа;
- человека и его авторские роли;
- выпуск журнала;
- цитату, правку или специальный MDX-блок.

Инструкция описывает текущую архитектуру репозитория. Не переносите примеры в другой Next.js-проект без проверки: проект работает на Next.js 16, и его API могут отличаться от предыдущих версий.

## Содержание

1. [Требования и запуск](#требования-и-запуск)
2. [Как устроена публикация](#как-устроена-публикация)
3. [Основные идентификаторы](#основные-идентификаторы)
4. [Как вручную добавить человека](#как-вручную-добавить-человека)
5. [Как вручную добавить медиа](#как-вручную-добавить-медиа)
6. [Как вручную добавить отдельный материал](#как-вручную-добавить-отдельный-материал)
7. [Как добавить материал в выпуск](#как-добавить-материал-в-выпуск)
8. [Как вручную создать новый выпуск](#как-вручную-создать-новый-выпуск)
9. [Цитаты, правки и специальные блоки](#цитаты-правки-и-специальные-блоки)
10. [Поиск, теги и время чтения](#поиск-теги-и-время-чтения)
11. [SEO, RSS и sitemap](#seo-rss-и-sitemap)
12. [Проверка перед публикацией](#проверка-перед-публикацией)
13. [Изменение и удаление контента](#изменение-и-удаление-контента)
14. [Типичные ошибки](#типичные-ошибки)
15. [Полный редакционный чек-лист](#полный-редакционный-чек-лист)

## Требования и запуск

Нужны:

- Node.js 20 или новее;
- npm;
- Git;
- редактор с поддержкой TypeScript и MDX;
- локальная копия репозитория.

Установка:

```bash
npm install
```

Запуск локального сайта:

```bash
npm run dev
```

По умолчанию Next.js покажет локальный адрес в терминале, обычно `http://localhost:3000`.

Основные команды:

```bash
npm run lint
npm run typecheck
npm test
npm run validate
npm run validate:media
npm run build
```

Назначение команд:

| Команда | Что проверяет |
| --- | --- |
| `npm run dev` | Запускает локальный сервер разработки |
| `npm run lint` | Проверяет TypeScript, React и правила Next.js через ESLint |
| `npm run typecheck` | Проверяет типы без генерации JavaScript |
| `npm test` | Запускает контентные тесты |
| `npm run validate` | Проверяет связи между материалами, людьми, выпусками и медиа |
| `npm run validate:media` | Сверяет реестр медиа с файлами и MDX-использованиями |
| `npm run build` | Выполняет контентную проверку и production-сборку Next.js |
| `npm run start` | Запускает уже собранный production-сайт |

Перед публикацией нужны все проверки, а не только `npm run build`.

## Как устроена публикация

Контент распределён между несколькими файлами:

```text
src/
├── content/
│   ├── registry.ts          # люди, медиа, цитаты, материалы и выпуски
│   ├── materials.ts         # статическая карта slug → MDX-компонент
│   ├── search-text.ts       # очищенный полный текст для поиска
│   ├── plot.ts              # данные специального дерева сюжета
│   └── materials/
│       └── *.mdx            # публичные тексты материалов
├── components/
│   ├── content-blocks.tsx   # MediaBlock, QuoteBlock, Bandcamp и т. п.
│   ├── material.tsx         # оболочка материала, авторы и правки
│   └── ...
└── lib/
    └── types.ts             # TypeScript-типы контентной модели

public/
└── media/                   # публично доступные редакционные файлы

source-imports/              # непубличные исходники миграций
```

Один материал состоит не из одного файла, а минимум из трёх связанных частей:

1. `src/content/materials/<slug>.mdx` — видимый текст;
2. импорт и запись в `src/content/materials.ts` — возможность загрузить MDX;
3. запись материала в `src/content/registry.ts` — метаданные и связи.

Для полнотекстового поиска также нужен текст в `src/content/search-text.ts`.

Связи можно представить так:

```text
Person ───────┐
              ├── MaterialMetadata ─── MDX body
MediaAsset ───┤          │
              │          ├── Search index
Quote ────────┘          │
                         └── Issue → section → block
```

Реестр является источником данных для:

- `/materials`;
- `/materials/[slug]`;
- `/issues`;
- `/issues/[slug]`;
- `/people`;
- `/gallery`;
- `/media/[id]`;
- `/search`;
- RSS;
- sitemap;
- Open Graph metadata;
- архивных фильтров;
- расчёта времени чтения.

Не поддерживайте отдельные ручные списки для галереи или поиска: они генерируются из реестра.

## Основные идентификаторы

### Slug материала или выпуска

`slug` используется в URL:

```text
/materials/kak-rabotaet-redaktsiya
/issues/novyy-vypusk
```

Правила:

- латиница в нижнем регистре;
- слова разделены дефисами;
- без пробелов;
- без кириллицы;
- без даты, если дата не является смысловой частью названия;
- после публикации slug нельзя менять без редиректа.

Пример:

```ts
slug: "kak-rabotaet-redaktsiya"
```

### ID человека

ID человека используется во внутренних связях:

```ts
id: "anna-petrova"
```

Публичная ссылка:

```text
/people#person-anna-petrova
```

### ID медиа

ID медиа должен описывать сам актив, а не материал, в котором он встречается:

```ts
id: "redaktsiya-za-rabotoy"
```

Файл обычно называется так же:

```text
public/media/redaktsiya-za-rabotoy.jpg
```

Публичная страница:

```text
/media/redaktsiya-za-rabotoy
```

### Usage ID

`usageId` описывает конкретное место использования медиа:

```ts
usageId: "redaktsiya-za-rabotoy-intro"
```

Один и тот же файл может использоваться несколько раз, но каждое использование обязано иметь уникальный `usageId`.

Точная ссылка:

```text
/materials/kak-rabotaet-redaktsiya#media-redaktsiya-za-rabotoy-intro
```

Не путайте:

- `media.id` — идентификатор файла и страницы медиа;
- `usageId` — идентификатор конкретной вставки.

### ID заголовка

Заголовки материала регистрируются отдельно для навигации выпуска:

```ts
{ id: "nachalo", title: "Начало", level: 2 }
```

`title` должен полностью совпадать с видимым текстом заголовка в MDX:

```mdx
## Начало
```

Навигация присваивает заголовку material-scoped anchor, поэтому одинаковые названия в разных материалах не конфликтуют.

## Как вручную добавить человека

Человека надо добавить до материала, который ссылается на него как на автора или участника.

### Шаг 1. Подготовьте ID

Например:

```text
anna-petrova
```

Проверьте, что такого ID ещё нет в массиве `people` в `src/content/registry.ts`.

### Шаг 2. При необходимости добавьте портрет

Портрет является обычным `MediaAsset`. Сначала выполните весь процесс из раздела [Как вручную добавить медиа](#как-вручную-добавить-медиа).

Рекомендуемый ID:

```text
portrait-anna-petrova
```

### Шаг 3. Добавьте запись в `people`

Файл:

```text
src/content/registry.ts
```

Пример:

```ts
{
  id: "anna-petrova",
  name: "Анна Петрова",
  photo: "portrait-anna-petrova",
  description: "Редактор и автор материалов о городской культуре.",
  occupation: "Автор, редактор",
  aliases: ["annpet"],
  tags: ["Город", "Редакция"],
}
```

Описание полей:

| Поле | Обязательное | Значение |
| --- | --- | --- |
| `id` | да | Стабильный внутренний ID |
| `name` | да | Публичное имя |
| `photo` | нет | ID существующего медиа |
| `description` | да | Краткое подтверждённое описание |
| `occupation` | да | Публичные роли через запятую |
| `aliases` | нет | Псевдонимы для поиска |
| `tags` | да | Темы, по которым человека можно найти |

Не добавляйте:

- выдуманную биографию;
- личные данные без редакционной необходимости;
- роль автора только потому, что человек упомянут в тексте;
- фото без понятного источника и разрешения.

### Шаг 4. Используйте человека в материале

Как автора:

```ts
authors: [
  { personId: "anna-petrova", role: "Автор" },
]
```

Как редактора:

```ts
authors: [
  { personId: "anna-petrova", role: "Редактор" },
]
```

Как упомянутого участника, который не является автором:

```ts
people: ["anna-petrova"]
```

Внутренняя ссылка из MDX:

```md
[Анна Петрова](/people#person-anna-petrova)
```

### Шаг 5. Проверьте страницу

Откройте:

```text
/people#person-anna-petrova
```

Проверьте:

- портрет;
- имя;
- описание;
- occupation;
- связанные материалы;
- авторскую роль в каждом материале;
- поиск по имени и псевдониму.

## Как вручную добавить медиа

Медиа состоит из:

1. физического файла;
2. общей записи `MediaAsset`;
3. при использовании в статье — записи `mediaUsages`;
4. компонента `<MediaBlock>` в MDX.

### Шаг 1. Проверьте права и метаданные

До копирования файла выясните:

- кто автор;
- откуда получен файл;
- разрешена ли публикация;
- какая лицензия действует;
- можно ли разрешить скачивание;
- когда создан актив;
- нужен ли `sourceUrl`;
- содержит ли изображение персональные данные.

Не ставьте `CC-BY 4.0`, если автор явно не выбрал эту лицензию.

### Шаг 2. Выберите media ID и имя файла

Исходник:

```text
IMG_4821 final.jpg
```

Производственное имя:

```text
redaktsiya-za-rabotoy.jpg
```

Media ID:

```text
redaktsiya-za-rabotoy
```

Расширение сохраняйте в нижнем регистре:

```text
.jpg
.png
.webp
```

Не оставляйте в `public/media`:

- пробелы;
- кириллицу;
- `final-final`;
- имена камеры;
- дубликаты одного файла;
- временные thumbnail-файлы без записи в реестре.

### Шаг 3. Скопируйте файл

Назначение:

```text
public/media/redaktsiya-za-rabotoy.jpg
```

Всё внутри `public` доступно по прямому URL. Не помещайте туда:

- исходный Markdown;
- YAML;
- редакционные комментарии;
- архивы;
- приватные оригиналы;
- неподготовленные импорты.

### Шаг 4. Узнайте реальные размеры

Нужны исходные `width` и `height`, а не CSS-размер на странице.

Пример:

```ts
width: 1600,
height: 1067,
```

Next.js использует размеры для:

- резервирования места;
- предотвращения layout shift;
- оптимизации изображений;
- правильного aspect ratio.

### Шаг 5. Добавьте `MediaAsset`

В массив `media` файла `src/content/registry.ts`:

```ts
{
  id: "redaktsiya-za-rabotoy",
  type: "image",
  kind: "material",
  title: "Редакция за работой",
  src: "/media/redaktsiya-za-rabotoy.jpg",
  width: 1600,
  height: 1067,
  alt: "Три редактора обсуждают распечатанный макет за длинным столом",
  description: "Рабочая встреча перед публикацией второго выпуска.",
  author: "Анна Петрова",
  source: "Архив редакции",
  sourceUrl: "https://example.com/source",
  license: "CC-BY 4.0",
  createdAt: "2026-08-10",
  downloadable: true,
  tags: ["Редакция", "Производство"],
}
```

### Поля MediaAsset

| Поле | Обязательное | Комментарий |
| --- | --- | --- |
| `id` | да | Уникальный media ID |
| `type` | да | `"image"`, `"youtube"` или `"animation"` |
| `kind` | да | `"cover"`, `"material"`, `"person"`, `"illustration"` или `"video"` |
| `title` | да | Название актива, не подпись конкретного использования |
| `src` | для локального файла | URL от корня `public` |
| `youtubeId` | для YouTube | ID видео, не полный URL |
| `thumbnail` | для видео | Изображение фасада |
| `alt` | да | Описание визуально значимой информации |
| `width` | для локального изображения | Реальная ширина |
| `height` | для локального изображения | Реальная высота |
| `description` | да | Что представляет собой актив |
| `author` | да | Автор изображения или видео |
| `source` | да | Название источника |
| `sourceUrl` | нет | Прямая ссылка на источник |
| `license` | да | Условия использования |
| `createdAt` | да | Дата `YYYY-MM-DD` |
| `downloadable` | да | Показывать ли кнопку скачивания |
| `tags` | да | Поисковые и галерейные темы |

### Как написать alt

Хороший alt:

```text
Три редактора обсуждают распечатанный макет за длинным столом
```

Плохой alt:

```text
Фото
```

Alt:

- описывает значимое содержимое;
- не повторяет слово «изображение»;
- не превращается в длинную подпись;
- не добавляет факты, которых нельзя увидеть;
- не дублирует дословно соседний абзац.

Валидатор отклоняет слишком короткий или бессодержательный alt.

### Шаг 6. Зарегистрируйте использование в материале

В записи материала:

```ts
media: ["redaktsiya-za-rabotoy"],
mediaUsages: [
  {
    mediaId: "redaktsiya-za-rabotoy",
    usageId: "redaktsiya-za-rabotoy-intro",
    caption: "Обсуждение макета перед публикацией",
    context: "Подготовка второго выпуска",
    placement: "wide",
  },
],
```

`media` — перечень активов материала.

`mediaUsages` — конкретные размещения. Если один актив встречается дважды:

```ts
mediaUsages: [
  {
    mediaId: "redaktsiya-za-rabotoy",
    usageId: "redaktsiya-za-rabotoy-intro",
    caption: "Первое обсуждение",
    placement: "wide",
  },
  {
    mediaId: "redaktsiya-za-rabotoy",
    usageId: "redaktsiya-za-rabotoy-conclusion",
    caption: "Финальная проверка",
    placement: "inline",
  },
],
```

### Шаг 7. Вставьте `MediaBlock` в MDX

```mdx
<MediaBlock
  id="redaktsiya-za-rabotoy"
  caption="Обсуждение макета перед публикацией"
  usageId="redaktsiya-za-rabotoy-intro"
/>
```

Значения обязаны совпадать с `mediaUsages`.

Компактное изображение:

```mdx
<MediaBlock
  id="portrait-anna-petrova"
  caption="Анна Петрова"
  usageId="portrait-anna-petrova-in-article"
  compact
/>
```

`compact` уменьшает визуальную ширину, но не создаёт новый файл.

### Шаг 8. Проверьте все представления

Откройте:

```text
/materials/<material-slug>#media-<usage-id>
/issues/<issue-slug>#media-<usage-id>
/gallery
/media/<media-id>
/search?q=<название>
```

Проверьте:

- изображение загружается;
- alt соответствует изображению;
- подпись и авторство верны;
- ссылка из галереи ведёт к правильной вставке;
- кнопка скачивания соответствует `downloadable`;
- лицензия показана;
- медиа не дублируется.

### Локальное YouTube-видео не скачивается

Для YouTube используется фасад без автозапуска:

```ts
{
  id: "intervyu-s-avtorom",
  type: "youtube",
  kind: "video",
  title: "Интервью с автором",
  youtubeId: "VIDEO_ID",
  thumbnail: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
  alt: "Автор сидит перед книжным шкафом во время интервью",
  description: "Разговор о подготовке материала.",
  author: "Редакция N-варианта",
  source: "YouTube",
  sourceUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  license: "Стандартная лицензия YouTube",
  createdAt: "2026-08-10",
  downloadable: false,
  tags: ["Интервью"],
}
```

В MDX:

```mdx
<YouTubeFacade id="intervyu-s-avtorom" />
```

Не добавляйте autoplay.

## Как вручную добавить отдельный материал

Ниже описан материал, который сначала существует отдельно. Включение в выпуск — отдельный шаг.

### Шаг 1. Выберите slug

Пример:

```text
kak-rabotaet-redaktsiya
```

Проверьте:

- slug отсутствует в `registry.ts`;
- файла с таким именем нет;
- URL ранее не использовался другим материалом.

### Шаг 2. Подготовьте людей и медиа

До записи материала:

- добавьте всех авторов в `people`;
- добавьте обложку и иллюстрации в `media`;
- определите contributor roles;
- подготовьте теги;
- проверьте права на цитаты и изображения.

### Шаг 3. Создайте MDX

Файл:

```text
src/content/materials/kak-rabotaet-redaktsiya.mdx
```

Пример:

```mdx
## Начало

Первый содержательный абзац материала.

### Что изменилось

Продолжение текста с [внутренней ссылкой](/people#person-anna-petrova).

<MediaBlock
  id="redaktsiya-za-rabotoy"
  caption="Обсуждение макета перед публикацией"
  usageId="redaktsiya-za-rabotoy-intro"
/>

## Заключение

Финальный вывод.
```

В MDX не нужно повторять:

- название материала;
- описание;
- дату;
- авторский блок;
- теги.

Эти элементы выводит оболочка страницы из реестра.

### Требования к MDX

Разрешены:

- обычные абзацы;
- `##` и `###`;
- списки;
- ссылки;
- blockquote;
- HTML-таблицы;
- зарегистрированные MDX-компоненты.

Не оставляйте:

````text
((редакционная инструкция))
TODO
TBD
![[obsidian-image.png]]
```yaml
Описание:
Теги:
````

Не вставляйте сырой YAML изображения.

Таблицы рекомендуется писать семантически, потому что базовая конфигурация MDX не подключает remark-gfm:

```mdx
<table>
  <thead>
    <tr>
      <th>Этап</th>
      <th>Срок</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Редактура</td>
      <td>2 дня</td>
    </tr>
  </tbody>
</table>
```

Не вкладывайте блочный компонент в строку абзаца, если компонент выводит `div`, `section`, `figure` или `p`. Размещайте его отдельным блоком с пустыми строками.

### Шаг 4. Импортируйте MDX в `materials.ts`

```ts
import KakRabotaetRedaktsiya from "./materials/kak-rabotaet-redaktsiya.mdx";
```

Добавьте в карту:

```ts
export const materialBodies = {
  // существующие материалы
  "kak-rabotaet-redaktsiya": KakRabotaetRedaktsiya,
};
```

Ключ обязан совпадать с:

- именем файла;
- `slug` в реестре.

Без этого страница найдёт метаданные, но не сможет отрисовать тело.

### Шаг 5. Добавьте очищенный поисковый текст

Файл:

```text
src/content/search-text.ts
```

Добавьте ключ:

```ts
export const searchTexts = {
  // существующий текст
  "kak-rabotaet-redaktsiya": "Начало Первый содержательный абзац материала. Что изменилось Продолжение текста...",
} as const;
```

В поисковый текст включайте:

- все публичные абзацы;
- заголовки;
- содержимое доступных disclosure-блоков;
- значимый текст интерактива;
- текстовые подписи, если они помогают поиску.

Не включайте:

- JSX;
- YAML;
- пути файлов;
- редакционные инструкции;
- скрытые служебные комментарии;
- `TODO`;
- подписи пропавших медиа;
- Markdown-синтаксис, если его можно убрать.

Для большого специального компонента допустим отдельный экспорт:

```ts
import { specialSearchText } from "./special-content";

text: `${searchTexts["kak-rabotaet-redaktsiya"]} ${specialSearchText}`
```

### Шаг 6. Добавьте MaterialMetadata

В массив `records` файла `src/content/registry.ts`:

```ts
{
  slug: "kak-rabotaet-redaktsiya",
  title: "Как работает редакция",
  description: "Что происходит с текстом между первым черновиком и публикацией.",
  publishedAt: "2026-08-10",
  authors: [
    { personId: "anna-petrova", role: "Автор" },
    { personId: "imran-badretdinov", role: "Редактор" },
  ],
  people: ["klim-gulyaev"],
  tags: ["Редакция", "Производство"],
  showInMaterialsArchive: true,
  cover: "redaktsiya-za-rabotoy",
  media: ["redaktsiya-za-rabotoy"],
  mediaUsages: [
    {
      mediaId: "redaktsiya-za-rabotoy",
      usageId: "redaktsiya-za-rabotoy-intro",
      caption: "Обсуждение макета перед публикацией",
      context: "Подготовка второго выпуска",
      placement: "wide",
    },
  ],
  headings: [
    { id: "nachalo", title: "Начало", level: 2 },
    { id: "chto-izmenilos", title: "Что изменилось", level: 3 },
    { id: "zaklyuchenie", title: "Заключение", level: 2 },
  ],
  text: searchTexts["kak-rabotaet-redaktsiya"],
  seo: {
    title: "Как работает редакция",
    description: "Редакционный путь материала от черновика до публикации.",
    image: "/media/redaktsiya-za-rabotoy.jpg",
  },
}
```

`readingTime` вручную не добавляется в `records`: итоговый массив `materials` рассчитывает его функцией `calculateReadingTime`.

### Поля MaterialMetadata

| Поле | Обязательное | Назначение |
| --- | --- | --- |
| `slug` | да | URL материала |
| `title` | да | Публичное название |
| `description` | да | Короткий dek и SEO fallback |
| `publishedAt` | да | Дата первой публикации |
| `updatedAt` | нет | Дата содержательного обновления |
| `authors` | да | Авторы и публичные роли |
| `people` | нет | Упомянутые или участвовавшие люди |
| `tags` | да | Публичные фильтры |
| `issue` | нет | Slug единственного выпуска |
| `showInMaterialsArchive` | да | Показывать ли в `/materials` |
| `cover` | нет | ID медиа для карточки и Open Graph fallback |
| `media` | да | Массив ID медиа, можно пустой |
| `quoteIds` | нет | Зарегистрированные цитаты |
| `mediaUsages` | нет | Все вставки медиа |
| `headings` | да | Навигационные заголовки, можно пустой массив |
| `text` | да | Очищенный полный текст |
| `corrections` | нет | Публичная история правок |
| `seo` | нет | SEO override |

### Авторы и участники

`authors` — только люди с публичной contributor role:

```ts
authors: [
  { personId: "anna-petrova", role: "Автор" },
  { personId: "imran-badretdinov", role: "Редактор" },
]
```

`people` — связанные люди без авторского кредита:

```ts
people: ["klim-gulyaev"]
```

Не дублируйте одного человека без причины одновременно в `authors` и `people`.

### Заголовки

MDX:

```mdx
## Начало
### Что изменилось
## Заключение
```

Registry:

```ts
headings: [
  { id: "nachalo", title: "Начало", level: 2 },
  { id: "chto-izmenilos", title: "Что изменилось", level: 3 },
  { id: "zaklyuchenie", title: "Заключение", level: 2 },
]
```

Порядок должен совпадать с текстом. `title` сравнивается с отрисованным заголовком. Если написать в одном месте `Итоги`, а в другом `Итог`, ссылка навигации не получит правильный anchor.

### Шаг 7. Проверьте отдельную страницу

Откройте:

```text
/materials/kak-rabotaet-redaktsiya
```

Проверьте:

- title и description;
- дату;
- время чтения;
- авторов и роли;
- headings;
- изображения;
- ссылки;
- светлую и тёмную тему;
- мобильную ширину;
- reduced motion;
- Open Graph metadata через production-сборку.

## Как добавить материал в выпуск

Материал может:

- существовать отдельно;
- входить максимум в один выпуск;
- показываться или не показываться в общем архиве материалов.

### Шаг 1. Добавьте issue slug в материал

```ts
issue: "redaktsionnaya-kuhnya"
```

### Шаг 2. Добавьте блок материала в Issue

```ts
{
  type: "material",
  material: "kak-rabotaet-redaktsiya",
}
```

Материал должен быть указан в двух местах:

- `material.issue`;
- `issue.sections[].blocks[]`.

Они описывают разные направления связи. Не оставляйте только одну сторону.

### Шаг 3. Выберите правильное место

Порядок блоков — публичный порядок непрерывного выпуска:

```ts
sections: [
  {
    id: "podgotovka",
    title: "Глава I. Подготовка",
    intro: "Как идея превращается в редакционную задачу.",
    blocks: [
      { type: "material", material: "kak-rabotaet-redaktsiya" },
      { type: "quote", quote: "redaktsiya-eto-dialog" },
    ],
  },
]
```

### Шаг 4. Проверьте непрерывную композицию

Откройте:

```text
/issues/redaktsionnaya-kuhnya
```

Проверьте:

- порядок материалов;
- sticky navigation;
- мобильное содержание;
- ссылки на заголовки;
- media anchors;
- авторские блоки;
- отсутствие повторяющихся DOM ID;
- логический переход между материалами.

## Как вручную создать новый выпуск

Выпуск — не тег и не статическая подборка. Это упорядоченная редакционная композиция из секций и блоков.

### Шаг 1. Подготовьте выпуск

Определите:

- следующий уникальный `number`;
- slug;
- название;
- описание;
- дату;
- обложку;
- секции;
- порядок материалов;
- переходы и редакционные вставки;
- SEO.

### Шаг 2. Добавьте обложку как MediaAsset

Рекомендуемый ID:

```text
issue-2-cover
```

Пример:

```ts
{
  id: "issue-2-cover",
  type: "image",
  kind: "cover",
  title: "Обложка выпуска №2 «Редакционная кухня»",
  src: "/media/issue-2-cover.png",
  width: 1080,
  height: 1440,
  alt: "Обложка выпуска №2 «Редакционная кухня» с красной типографикой",
  description: "Обложка второго выпуска N-варианта.",
  author: "Анна Петрова",
  source: "Редакция N-варианта",
  license: "Все права защищены",
  createdAt: "2026-08-16",
  downloadable: false,
  tags: ["N-вариант", "Выпуск №2"],
}
```

### Шаг 3. Добавьте Issue

В массив `issues`:

```ts
{
  number: 2,
  slug: "redaktsionnaya-kuhnya",
  title: "Редакционная кухня",
  description: "Как идея проходит исследование, редактуру и публикацию.",
  publishedAt: "2026-08-16",
  cover: "issue-2-cover",
  sections: [
    {
      id: "podgotovka",
      title: "Глава I. Подготовка",
      intro: "От идеи до первого черновика.",
      blocks: [
        {
          type: "material",
          material: "kak-rabotaet-redaktsiya",
        },
      ],
    },
    {
      id: "publikatsiya",
      title: "Глава II. Публикация",
      intro: "Что происходит перед нажатием кнопки deploy.",
      blocks: [
        {
          type: "editorial",
          title: "От редакции",
          text: "Короткий переход между материалами.",
        },
      ],
    },
  ],
  seo: {
    title: "№2. Редакционная кухня",
    description: "Исследование, редактура и публикация цифрового журнала.",
    image: "/media/issue-2-cover.png",
  },
}
```

### Поля Issue

| Поле | Обязательное | Назначение |
| --- | --- | --- |
| `number` | да | Уникальный номер |
| `slug` | да | URL |
| `title` | да | Название |
| `description` | да | Описание выпуска |
| `publishedAt` | да | Дата публикации |
| `cover` | да | Media ID обложки |
| `sections` | да | Упорядоченные главы |
| `corrections` | нет | История правок выпуска |
| `seo` | нет | SEO override |

### Типы блоков выпуска

#### Материал

```ts
{ type: "material", material: "kak-rabotaet-redaktsiya" }
```

#### Зарегистрированная цитата

```ts
{ type: "quote", quote: "redaktsiya-eto-dialog" }
```

#### Редакционный переход

```ts
{
  type: "editorial",
  title: "От редакции",
  text: "Текст перехода.",
}
```

#### Отдельное медиа

```ts
{
  type: "media",
  media: "issue-2-diagram",
  caption: "Схема редакционного процесса",
}
```

Для длинного самостоятельного текста используйте материал, а не огромный editorial block.

### Шаг 4. Свяжите материалы

В каждой записи материала выпуска:

```ts
issue: "redaktsionnaya-kuhnya"
```

Один материал не должен входить в несколько выпусков.

### Шаг 5. Проверьте автоматически создаваемые страницы

После добавления Issue автоматически появятся:

```text
/issues/redaktsionnaya-kuhnya
```

И запись в:

- `/issues`;
- `/issues.xml`;
- `/sitemap.xml`;
- `/search`;
- homepage, если код homepage выбирает этот выпуск как текущий.

Важно: homepage сейчас берёт первый элемент `issues[0]`. При публикации нового выпуска проверьте порядок массива или измените стратегию выбора текущего выпуска. Не рассчитывайте, что дата автоматически сделает выпуск главным.

### Шаг 6. Проверьте выпуск

Проверьте:

- номер и название;
- обложку;
- описание;
- порядок секций;
- порядок материалов;
- время чтения;
- количество участников;
- sticky TOC;
- mobile TOC;
- progress;
- headings;
- exact media anchors;
- светлую и тёмную темы;
- RSS;
- sitemap;
- metadata;
- homepage.

## Цитаты, правки и специальные блоки

### Зарегистрированная цитата

Добавьте запись в `quotes`:

```ts
{
  id: "redaktsiya-eto-dialog",
  text: "Редактура — это не исправление автора, а разговор с текстом.",
  person: "anna-petrova",
  sourceTitle: "Как работает редакция",
  sourceUrl: "/materials/kak-rabotaet-redaktsiya#zaklyuchenie",
  sourceMaterial: "kak-rabotaet-redaktsiya",
  context: "Заключительный раздел",
  date: "2026-08-10",
}
```

В MDX:

```mdx
<QuoteBlock id="redaktsiya-eto-dialog" />
```

В выпуске:

```ts
{ type: "quote", quote: "redaktsiya-eto-dialog" }
```

Текст цитаты храните один раз. Не создавайте разные ID для одинаковой цитаты без редакционной причины.

### Правки материала

```ts
corrections: [
  {
    date: "2026-08-12",
    text: "Исправлена дата первой редакционной встречи.",
  },
]
```

Используйте `updatedAt` для даты содержательного обновления:

```ts
updatedAt: "2026-08-12"
```

Не создавайте correction для каждой опечатки, если редакционная политика этого не требует. Фактические изменения, влияющие на понимание, должны быть публичны.

### Bandcamp

```mdx
<BandcampEmbed
  title="Название релиза — автор"
  embedUrl="https://bandcamp.com/EmbeddedPlayer/..."
  externalUrl="https://author.bandcamp.com/album/release"
/>
```

Требования:

- без autoplay;
- `title` описывает содержимое;
- `externalUrl` открывает обычную страницу;
- embed URL не содержит Markdown.

### Disclosure

Для скрытого по умолчанию, но доступного текста:

```mdx
<details className="plot-disclosure">
  <summary>Показать дополнительный контекст</summary>

  Текст, доступный в исходном HTML.
</details>
```

Не скрывайте критически важную информацию исключительно в интерактиве.

### Новый MDX-компонент

Если нужен новый компонент:

1. создайте типизированный React-компонент в `src/components`;
2. проверьте Server/Client boundary;
3. экспортируйте его в `mdx-components.tsx`;
4. используйте в MDX;
5. добавьте доступный fallback;
6. добавьте тест;
7. проверьте reduced motion;
8. не добавляйте тяжёлую зависимость без необходимости.

Пример регистрации:

```ts
import { MyEditorialBlock } from "@/components/my-editorial-block";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    MyEditorialBlock,
    ...components,
  };
}
```

## Поиск, теги и время чтения

### Глобальный поиск

`searchIndex()` создаёт записи для:

- выпусков;
- материалов;
- людей;
- медиа;
- цитат.

Материалы индексируются из `material.text`, авторов, тегов и выпуска.

Медиа индексируются из title, description, alt, author, source и tags.

Люди индексируются из имени, aliases, description и occupation.

### Поиск в `/materials`

Архив материалов использует те же `MaterialMetadata` и `text`.

Он ищет по:

- title;
- description;
- полному text;
- headings;
- авторам;
- людям;
- тегам;
- названию и номеру выпуска.

Параметры:

```text
/materials?q=редакция
/materials?tags=Редакция,Производство
/materials?q=макет&tags=Редакция
```

Несколько тегов объединяются по AND: материал должен содержать каждый выбранный тег.

### Нормализация тегов

Используйте единый label:

```text
Сериалы
```

Не создавайте одновременно:

```text
сериал
Сериал
сериалы
Сериалы
```

Перед добавлением проверьте существующие теги в `registry.ts`.

Тег должен:

- помогать найти несколько связанных публикаций;
- иметь понятное читателю значение;
- не повторять title;
- не быть внутренней редакционной категорией;
- не быть чрезмерно узким без необходимости.

### Время чтения

Формула:

```ts
Math.ceil(words / 180)
```

Минимум — одна минута.

Расчёт идёт по `material.text`, а не по отрендеренному MDX. Поэтому search text должен содержать полный публичный текст.

Если материал содержит большой интерактив или disclosure, добавьте его содержимое в `text`, иначе:

- поиск его не увидит;
- время чтения будет занижено.

## SEO, RSS и sitemap

### Metadata материала

Если `seo` отсутствует, используются title и description материала.

Override:

```ts
seo: {
  title: "Как работает редакция",
  description: "Редакционный путь материала от идеи до публикации.",
  image: "/media/redaktsiya-za-rabotoy.jpg",
}
```

### Metadata выпуска

```ts
seo: {
  title: "№2. Редакционная кухня",
  description: "Исследование процесса выпуска цифрового журнала.",
  image: "/media/issue-2-cover.png",
}
```

### Canonical URL

Canonical создаётся страницами автоматически:

```text
/materials/<slug>
/issues/<slug>
/media/<id>
```

### RSS

Автоматические endpoints:

```text
/materials.xml
/issues.xml
```

Материал попадёт в RSS после добавления в `materials`.

Выпуск попадёт в RSS после добавления в `issues`.

### Sitemap

`app/sitemap.ts` включает:

- статические страницы;
- все issues;
- все materials;
- все media.

Новый зарегистрированный объект появляется автоматически.

### Публичный origin

Перед production deploy задайте:

```text
NEXT_PUBLIC_SITE_URL=https://example.com
```

Без переменной используется технический fallback:

```text
https://n-variant.example
```

Проверьте origin перед реальной публикацией, иначе RSS, sitemap и metadata могут получить неправильный домен.

## Проверка перед публикацией

### Автоматические проверки

Запускайте по порядку:

```bash
npm run lint
npm run typecheck
npm test
npm run validate
npm run validate:media
npm run build
```

### Что проверяет `validate`

В текущей реализации проверяются:

- уникальные material slugs;
- уникальные media IDs;
- уникальные person IDs;
- уникальные issue slugs;
- материал не включён в несколько выпусков;
- author references существуют;
- media references существуют;
- issue blocks ссылаются на известные материалы;
- даты имеют формат `YYYY-MM-DD`;
- локальные media files существуют;
- alt не пустой и не бессодержательный;
- usage IDs уникальны;
- MDX-файл существует;
- материал не пуст;
- нет `TODO`, `TBD`, двойных скобок и сырого YAML;
- нет Obsidian image syntax;
- usage ID из MDX зарегистрирован;
- старый демонстрационный контент не вернулся.

Ошибки содержат путь и проблемное значение.

### Что проверяет `validate:media`

Проверяются:

- дубли media ID;
- один файл не зарегистрирован под разными ID;
- файл существует;
- в `public/media` нет незарегистрированного файла;
- файлы не совпадают по SHA-256;
- MDX media ID существует;
- usage ID не повторяется;
- обязательные медиа текущего выпуска используются;
- удалённые файлы предыдущей версии не вернулись.

Если добавляется новый постоянный набор обязательных медиа выпуска, обновите соответствующие ожидания в `scripts/validate-media.mjs` и тестах осознанно. Не ослабляйте аудит, чтобы скрыть ошибку.

### Ручная проверка материала

Проверьте:

- `/materials/<slug>`;
- title, description и date;
- авторов и роли;
- теги;
- reading time;
- все headings;
- все ссылки;
- все media blocks;
- exact media anchors;
- mobile;
- light/dark;
- keyboard;
- reduced motion;
- empty or broken embeds.

### Ручная проверка выпуска

Проверьте:

- `/issues/<slug>`;
- обложку;
- главы;
- порядок;
- sticky TOC;
- auto-scroll TOC;
- mobile contents;
- progress;
- повторяющиеся заголовки;
- переходы;
- authors;
- точные media links;
- финальные сведения выпуска.

### Ручная проверка связанных индексов

Проверьте:

```text
/
/materials
/materials?q=<слово>
/materials?tags=<тег>
/issues
/gallery
/media/<id>
/people
/search?q=<слово>
/materials.xml
/issues.xml
/sitemap.xml
/robots.txt
```

## Изменение и удаление контента

### Обновление материала

Если меняется только текст:

1. измените MDX;
2. обновите `searchTexts`;
3. добавьте `updatedAt`;
4. при необходимости добавьте correction;
5. обновите headings;
6. проверьте reading time;
7. запустите проверки.

Если меняется title:

- обновите metadata;
- обновите issue transitions;
- обновите quote source titles;
- обновите homepage copy;
- не меняйте slug без необходимости.

### Замена файла с сохранением media ID

Если актив концептуально тот же:

1. замените файл под тем же стабильным именем;
2. обновите width и height;
3. обновите alt, title, description, author, source, license и date при необходимости;
4. не создавайте второй файл;
5. проверьте hash audit;
6. выполните production build.

### Удаление материала

Удалите:

1. block из Issue;
2. `issue` relationship;
3. metadata record;
4. импорт из `materials.ts`;
5. ключ карты `materialBodies`;
6. MDX-файл;
7. search text;
8. quote references;
9. homepage references;
10. tests, ожидающие материал.

После удаления проверьте, не стали ли ненужными люди или медиа.

### Удаление медиа

Удалите:

1. `<MediaBlock>` из MDX;
2. `mediaUsages`;
3. ID из `material.media`;
4. cover references;
5. person photo references;
6. issue media blocks;
7. media record;
8. физический файл;
9. тестовые ожидания.

Нельзя оставить файл в `public/media`: media audit посчитает его orphan.

Нельзя оставить запись без файла: validation завершится ошибкой.

### Удаление человека

Перед удалением найдите:

- `authors[].personId`;
- `people[]`;
- quote person;
- Markdown links;
- photo;
- descriptions других людей.

Удалите человека только после удаления всех ссылок или переназначения ролей.

### Удаление выпуска

Удалите:

1. Issue record;
2. `issue` у каждого материала;
3. homepage references;
4. cover usage;
5. issue-specific quotes/editorials;
6. tests;
7. старую обложку, если она нигде не нужна.

Ранее опубликованный URL лучше сохранить редиректом или архивной страницей. Не ломайте внешние ссылки молча.

## Типичные ошибки

### Материал есть в registry, но страница падает

Причина: отсутствует импорт или ключ в `src/content/materials.ts`.

### MDX создан, но маршрут не появляется

Причина: нет MaterialMetadata в `registry.ts`.

### Текст не находится

Причина: `searchTexts` не обновлён или содержит старую версию.

### Время чтения слишком маленькое

Причина: `material.text` не содержит полный текст disclosure или интерактива.

### Автор не отображается

Причины:

- person ID отсутствует;
- опечатка в `personId`;
- человек добавлен в `people`, но не в `authors`;
- роль не указана.

### Изображение не отображается

Причины:

- неверный `src`;
- файл отсутствует;
- регистр расширения не совпадает;
- media ID в MDX отличается от registry;
- файл лежит не в `public/media`.

### Ссылка из галереи ведёт не туда

Причины:

- `usageId` отличается между MDX и registry;
- usage ID повторяется;
- ссылка использует media ID вместо usage ID.

### Навигация выпуска не открывает заголовок

Причины:

- metadata title не совпадает с текстом MDX;
- heading отсутствует;
- heading находится вне `.prose`;
- slug или heading ID написан с ошибкой.

### Таблица отображается как текст с вертикальными чертами

Причина: текущая MDX-конфигурация не подключает remark-gfm. Используйте семантический `<table>`.

### Появляется вложенный `<p>`

Причина: блочный React-компонент вставлен внутрь Markdown-абзаца. Разместите компонент на отдельной строке с пустыми строками либо сделайте его корневой HTML-структурой совместимой с phrasing content.

### `validate:media` сообщает orphan

Причина: файл есть в `public/media`, но отсутствует в `media`.

### `validate:media` сообщает duplicate

Причина: один и тот же файл скопирован дважды или два records указывают на один файл.

### Новый выпуск не появился на homepage

Причина: homepage использует порядок массива `issues`, а не автоматически сортирует по дате.

### Build работает локально, но URL неправильные

Причина: не задан `NEXT_PUBLIC_SITE_URL`.

## Полный редакционный чек-лист

### Новый человек

- [ ] Выбран уникальный person ID
- [ ] Есть подтверждённое публичное имя
- [ ] Description не содержит выдуманных фактов
- [ ] Occupation отражает публичные роли
- [ ] Aliases нужны поиску
- [ ] Портрет зарегистрирован как media
- [ ] Права и источник портрета известны
- [ ] `/people#person-<id>` работает

### Новое медиа

- [ ] Выбран уникальный media ID
- [ ] Файл переименован по ID
- [ ] Файл лежит в `public/media`
- [ ] Width и height реальны
- [ ] Alt содержателен
- [ ] Author указан
- [ ] Source указан
- [ ] License проверена
- [ ] Date в формате `YYYY-MM-DD`
- [ ] Downloadable выбран осознанно
- [ ] Tags нормализованы
- [ ] MediaAsset добавлен
- [ ] Material media list обновлён
- [ ] Media usage добавлен
- [ ] Usage ID уникален
- [ ] MediaBlock вставлен
- [ ] `/media/<id>` работает
- [ ] Галерея показывает актив
- [ ] Exact usage link ведёт к правильному месту

### Новый материал

- [ ] Slug уникален
- [ ] MDX создан
- [ ] Импорт добавлен в `materials.ts`
- [ ] Ключ добавлен в `materialBodies`
- [ ] Search text добавлен
- [ ] MaterialMetadata добавлен
- [ ] Title и description готовы
- [ ] Published date готова
- [ ] Authors существуют
- [ ] Contributor roles корректны
- [ ] People references существуют
- [ ] Tags нормализованы
- [ ] Cover существует
- [ ] Media и media usages синхронизированы
- [ ] Headings совпадают с MDX
- [ ] SEO заполнено или корректно наследуется
- [ ] Нет редакционных инструкций
- [ ] Нет raw YAML
- [ ] Нет Obsidian syntax
- [ ] Нет TODO
- [ ] `/materials/<slug>` работает
- [ ] Поиск находит полный текст
- [ ] Reading time правдоподобен

### Новый выпуск

- [ ] Number уникален
- [ ] Slug уникален
- [ ] Cover зарегистрирована
- [ ] Description сохраняет редакционный замысел
- [ ] Sections имеют уникальные ID
- [ ] Material order проверен
- [ ] Каждый материал содержит правильный `issue`
- [ ] Материал не входит в другой выпуск
- [ ] Editorial и quote blocks проверены
- [ ] Sticky TOC работает
- [ ] Mobile TOC работает
- [ ] Progress работает
- [ ] Homepage обновлена
- [ ] `/issues/<slug>` работает
- [ ] `/issues.xml` обновился
- [ ] Sitemap содержит выпуск
- [ ] Search содержит выпуск

### Перед deploy

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run validate`
- [ ] `npm run validate:media`
- [ ] `npm run build`
- [ ] Проверена homepage
- [ ] Проверены все новые маршруты
- [ ] Проверены light/dark
- [ ] Проверен mobile
- [ ] Проверена клавиатура
- [ ] Проверен reduced motion
- [ ] Проверены RSS и sitemap
- [ ] Задан `NEXT_PUBLIC_SITE_URL`

## Исходные импорты

`source-imports/` предназначен для непубличных исходников миграции.

Текущая исходная редакция выпуска №1:

```text
source-imports/opyt-proshlyh-let-v2/
```

Она не участвует непосредственно в runtime и не должна перемещаться в `public`.

Импорт первого выпуска автоматизирован вспомогательным скриптом:

```bash
node scripts/import-issue.mjs
```

Этот скрипт специализирован под формат текущего исходного документа и не является универсальной CMS. После его запуска обязательно просмотрите diff: генерация может перезаписать MDX и `search-text.ts`.

Решения текущей миграции описаны в:

```text
docs/migration-opyt-proshlyh-let.md
```

## Деплой

Проект рассчитан на Vercel и обычный code-first workflow:

1. внести контентные изменения;
2. проверить diff;
3. выполнить все проверки;
4. закоммитить изменения;
5. отправить ветку;
6. проверить preview deployment;
7. проверить production domain;
8. выполнить финальную ручную проверку маршрутов.

CMS, база данных и внешний backend для публикации не нужны.
