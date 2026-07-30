# N-вариант

Русскоязычный цифровой журнал на Next.js 16 App Router, TypeScript и MDX. Контент хранится в репозитории; CMS, база данных и серверное API не требуются.

## Запуск и проверки

Требуются Node.js 20+ и npm.

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run validate
npm run build
```

## Контент

- `src/content/registry.ts` — типизированные реестры материалов, выпусков, людей и медиа.
- `src/content/materials/*.mdx` — публичные тексты материалов.
- `src/content/materials.ts` — статическая карта MDX-компонентов.
- `src/lib/types.ts` — типы контентной модели.
- `public/media/` — публичные медиафайлы со стабильными именами по ID.
- `source-imports/` — непубличные исходные редакционные импорты.

Первый выпуск — №1 «Опыт прошлых лет». Он включает четыре завершённых материала. Решения по исключённым черновикам и приватная проверка согласий описаны в [`docs/migration-opyt-proshlyh-let.md`](docs/migration-opyt-proshlyh-let.md).

Время чтения вычисляется из очищенного поискового текста из расчёта 180 слов в минуту. Статический поисковый индекс собирается функцией `searchIndex()` из тех же реестров.

## Медиа

Медиа сначала регистрируется в `media`, затем используется из MDX через `MediaBlock`. Метаданные актива хранятся один раз, а подпись, контекст, размещение и `usageId` — в `material.mediaUsages`.

```mdx
<MediaBlock
  id="is-demo-shot"
  caption="Кадр из сериала «Исповедь школьника»"
  usageId="is-demo-shot-usage"
/>
```

Каждый актив получает страницу `/media/[id]` и входит в галерею. `mediaUsages()` строит точные ссылки на материал, непрерывный выпуск и страницу человека. Скачивание не меняет указанную лицензию.

Внешний Bandcamp-плеер реализован компонентом `BandcampEmbed`: без автозапуска, с заголовком, ленивой загрузкой и внешней ссылкой на случай отказа embed.

## Публикация

Приложение генерирует sitemap, robots, Open Graph metadata, canonical URL и RSS (`/materials.xml`, `/issues.xml`). Перед деплоем задайте `NEXT_PUBLIC_SITE_URL` с публичным origin.
