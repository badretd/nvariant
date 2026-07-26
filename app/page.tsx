import Image from "next/image";
import Link from "next/link";
import { issues, issueMaterials, media } from "@/content/registry";
import { ProceduralBackground } from "@/components/home-background";

export default function Home() {
  const issue = issues[0]; const selected = issueMaterials(issue);
  return <main id="main" className="home"><section className="hero">
    <ProceduralBackground /><div className="hero-copy"><div className="eyebrow">Новый выпуск · №{issue.number}</div><h1>{issue.title}</h1><p>{issue.description}</p><div className="button-row"><Link href={`/issues/${issue.slug}`}>Читать выпуск</Link><Link href="/issues">Архив выпусков →</Link></div></div>
    <Link className="hero-cover" href={`/issues/${issue.slug}`} aria-label={`Читать выпуск №${issue.number}`}><Image src="/media/issue-1-cover.svg" alt="Обложка выпуска №1 «Точки сборки»" width={800} height={1000} priority /></Link>
  </section>
  <section className="home-section home-toc"><div><span className="eyebrow">Внутри выпуска</span><h2>Три приближения</h2></div><ol>{issue.sections.slice(1).map((s, i) => <li key={s.id}><span>0{i + 1}</span><Link href={`/issues/${issue.slug}#section-${s.id}`}>{s.title}</Link><p>{s.intro}</p></li>)}</ol></section>
  <section className="home-section"><div className="section-head"><span className="eyebrow">Выбор редакции</span><h2>Материалы выпуска</h2></div><div className="editorial-grid">{selected.map((m, i) => <article key={m.slug}><span>0{i + 1} / {m.readingTime} мин</span><h3><Link href={`/materials/${m.slug}`}>{m.title}</Link></h3><p>{m.description}</p></article>)}</div></section>
  <section className="home-fragment"><div><span className="eyebrow">Визуальный фрагмент</span><h2>Сигнал — это отношение</h2><p>Он существует только между источником, средой и вниманием.</p><Link href="/materials/interfeys-do-zhesta#test-system">Открыть интерактив →</Link></div><Image src="/media/signal-field.svg" alt="Поле вертикальных сигналов" width={900} height={500} /></section>
  <section className="home-section"><div className="section-head"><span className="eyebrow">Медиаиндекс</span><h2>Из галереи</h2><Link href="/gallery">Вся галерея →</Link></div><div className="media-strip">{media.slice(0, 3).map((m) => <Link href={`/media/${m.id}`} key={m.id}>{m.src && <Image src={m.src} alt={m.alt} width={500} height={350} />}<span>{m.title}</span></Link>)}</div></section>
  <section className="home-about"><span className="hero-mark">[N]</span><div><h2>N-вариант — журнал как редакционная композиция.</h2><p>Каждый выпуск соединяет самостоятельные материалы в единый маршрут чтения. Здесь нет ленты: только отобранные тексты, изображения и связи между ними.</p><Link href="/about">О проекте →</Link></div></section></main>;
}
