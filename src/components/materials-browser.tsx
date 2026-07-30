"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { MaterialMetadata } from "@/lib/types";
import { getPerson, materialIssue } from "@/content/registry";
import { formatDate } from "./material";

const normalize = (value: string) => value.toLocaleLowerCase("ru").replace(/ё/g, "е").trim();
export function filterMaterials(items: MaterialMetadata[], query: string, tags: string[]) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    const haystack = normalize([item.title, item.description, item.text, ...item.headings.map((h) => h.title), ...item.authors.map((a) => getPerson(a.personId)?.name ?? ""), ...item.tags, materialIssue(item)?.title ?? "", materialIssue(item)?.number ?? ""].join(" "));
    return words.every((word) => haystack.includes(word) || (word.length > 3 && haystack.includes(word.slice(0, -1)))) && tags.every((tag) => item.tags.includes(tag));
  });
}
export function MaterialsBrowser({ items }: { items: MaterialMetadata[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [tags, setTags] = useState(() => (params.get("tags") ?? "").split(",").map(decodeURIComponent).filter(Boolean));
  const allTags = useMemo(() => [...new Set(items.flatMap((item) => item.tags))].sort((a, b) => a.localeCompare(b, "ru")), [items]);
  const shown = useMemo(() => filterMaterials(items, query, tags), [items, query, tags]);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = new URLSearchParams();
      if (query.trim()) next.set("q", query.trim());
      if (tags.length) next.set("tags", tags.join(","));
      history.replaceState(null, "", `/materials${next.size ? `?${next}` : ""}`);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query, tags]);
  const reset = () => { setQuery(""); setTags([]); };
  return <><label className="search-field"><span>Поиск по материалам</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название, текст, автор или тег" /></label>
    <fieldset className="tag-filters"><legend>Фильтр по тегам · все выбранные теги одновременно</legend>{allTags.map((tag) => { const count = items.filter((item) => item.tags.includes(tag)).length; return <label key={tag}><input type="checkbox" checked={tags.includes(tag)} onChange={() => setTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag])} /><span>{tag} <small>{count}</small></span></label>; })}</fieldset>
    <div className="archive-status" aria-live="polite"><strong>Найдено: {shown.length} материалов</strong>{(query || tags.length > 0) && <button type="button" onClick={reset}>Сбросить</button>}</div>
    {shown.length ? <div className="material-list">{shown.map((material) => <article key={material.slug}><div><time dateTime={material.publishedAt}>{formatDate(material.publishedAt)}</time><span>№{materialIssue(material)?.number} · {material.tags.join(" · ")}</span></div><h2><Link href={`/materials/${material.slug}`}>{material.title}</Link></h2><div><p>{material.description}</p><small>{material.authors.map((author) => getPerson(author.personId)?.name).filter(Boolean).join(", ")}</small></div><small>{material.readingTime} мин чтения</small></article>)}</div> : <div className="empty-state"><p>По вашему запросу ничего не найдено.</p><button type="button" onClick={reset}>Сбросить</button></div>}
  </>;
}
