import Image from "next/image";
import Link from "next/link";
import { getMedia, publicIssues, publicMaterials, issueMaterials, media } from "@/content/registry";
import { ProceduralBackground } from "@/components/home-background";
import { PlotTree } from "@/components/content-blocks";
import { Logo } from "@/components/ui";

export default function Home() {
  const issue = publicIssues[0]; const selected = issueMaterials(issue).filter((material) => !material.private); const cover = getMedia(issue.cover)!;
  const plotMaterial = publicMaterials.find((material) => material.slug === "serial-na-dvoih");
  return <main id="main" className="home"><section className="hero">
    <ProceduralBackground /><div className="hero-copy"><div className="eyebrow">Новый выпуск · №{issue.number}</div><h1>{issue.title}</h1><p>{issue.description}</p><div className="button-row"><Link href={`/issues/${issue.slug}`}>Читать выпуск</Link><Link href="/issues">Архив выпусков →</Link></div></div>
    <Link className="hero-cover" href={`/issues/${issue.slug}`} aria-label={`Читать выпуск №${issue.number}`}><Image src={cover.src!} alt={cover.alt} width={cover.width} height={cover.height} priority /></Link>
  </section>
  <section className="home-section home-toc"><div><span className="eyebrow">Внутри выпуска</span><h2>От контроля к своей площадке</h2></div><ol>{issue.sections.map((s, i) => <li key={s.id}><span>0{i + 1}</span><Link href={`/issues/${issue.slug}#section-${s.id}`}>{s.title}</Link><p>{s.intro}</p></li>)}</ol></section>
  <section className="home-section"><div className="section-head"><span className="eyebrow">Выбор редакции</span><h2>Материалы выпуска</h2></div><div className="editorial-grid">{selected.map((m, i) => <article key={m.slug}><span>0{i + 1} / {m.readingTime} мин</span><h3><Link href={`/materials/${m.slug}`}>{m.title}</Link></h3><p>{m.description}</p></article>)}</div></section>
  {plotMaterial && <section className="home-fragment"><div><span className="eyebrow">Из выпуска</span><h2>Сюжет, который выбирал зритель.</h2><p>У «Выжить в школе» было несколько развилок. Откройте варианты и сравните их с основной линией.</p><Link href={`/materials/${plotMaterial.slug}`}>Читать «Сериал на двоих» →</Link></div><PlotTree compact /></section>}
  <section className="home-section"><div className="section-head"><span className="eyebrow">Медиаиндекс</span><h2>Из галереи</h2><Link href="/gallery">Вся галерея →</Link></div><div className="media-strip">{media.slice(0, 3).map((m) => <Link href={`/media/${m.id}`} key={m.id}>{m.src && <Image src={m.src} alt={m.alt} width={500} height={350} />}<span>{m.title}</span></Link>)}</div></section>
  <section className="home-about"><Logo className="hero-mark" /><div><h2>N-вариант — площадка для опыта.</h2><p>Первый выпуск проходит путь от желания контролировать всё через перегрузку и делегирование к ограниченной ответственности и созданию собственной площадки.</p><Link href="/about">О проекте →</Link></div></section></main>;
}
