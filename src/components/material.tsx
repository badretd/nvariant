import Link from "next/link";
import { getPerson, materialIssue } from "@/content/registry";
import { materialBodies } from "@/content/materials";
import type { MaterialMetadata } from "@/lib/types";

export function Corrections({ items }: { items?: { date: string; text: string }[] }) {
  if (!items?.length) return null;
  return <section className="corrections"><h2>Правки</h2>{items.map((item) => <div key={item.date}><time dateTime={item.date}>{formatDate(item.date)}</time><p>{item.text}</p></div>)}</section>;
}
export function formatDate(date: string) { return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00Z`)); }
export function MaterialHeader({ material, compact = false }: { material: MaterialMetadata; compact?: boolean }) {
  return <header className={compact ? "material-header compact" : "material-header"}>
    <div className="eyebrow">{material.tags.join(" · ")}</div><h1>{material.title}</h1><p className="dek">{material.description}</p>
    <div className="meta"><time dateTime={material.publishedAt}>{formatDate(material.publishedAt)}</time><span>{material.readingTime} мин чтения</span></div>
  </header>;
}
export function MaterialBody({ material, inIssue = false }: { material: MaterialMetadata; inIssue?: boolean }) {
  const Body = materialBodies[material.slug as keyof typeof materialBodies];
  return <><div className="prose"><Body /></div>{!inIssue && <Corrections items={material.corrections} />}<Authors material={material} /></>;
}
export function Authors({ material }: { material: MaterialMetadata }) {
  return <details className="authors"><summary>Авторы <span>{material.authors.length}</span></summary><div className="authors-content">{material.authors.map((credit) => { const person = getPerson(credit.personId); return person && <div className="author-row" key={credit.personId}><Link href={`/people#person-${person.id}`}>{person.name}</Link><span>{credit.role}</span><p>{person.description}</p></div>; })}</div></details>;
}
export function IssueBelonging({ material }: { material: MaterialMetadata }) {
  const issue = materialIssue(material); if (!issue) return null;
  return <aside className="issue-belonging">Материал входит в <Link href={`/issues/${issue.slug}#material-${material.slug}`}>выпуск №{issue.number} «{issue.title}»</Link>.</aside>;
}
