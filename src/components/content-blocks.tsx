"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getMedia, getQuote } from "@/content/registry";
import { CopyLink } from "./ui";
import { PlotTreeCanvas } from "./plot-tree-canvas";
import { plotBranches, plotEpisodes, plotSequel } from "@/content/plot";

export function MediaBlock({ id, caption, usageId, usageSuffix, compact = false }: { id: string; caption?: string; usageId?: string; usageSuffix?: string; compact?: boolean }) {
  const asset = getMedia(id); if (!asset) return null;
  const anchor = `media-${usageId ?? id}${usageSuffix ? `-${usageSuffix}` : ""}`;
  return <figure id={anchor} className={`media-block${compact ? " media-block-compact" : ""}`}>
    {asset.type === "youtube" ? <YouTubeFacade id={id} /> : asset.src ? <Image src={asset.src} alt={asset.alt} width={asset.width ?? 1400} height={asset.height ?? 900} sizes="(max-width: 800px) 100vw, 1100px" /> : null}
    <figcaption data-usage-id={usageId}><span>{caption ?? asset.description} — {asset.author}. {asset.license}.</span> <span><Link href={`/media/${asset.id}`}>В галерею</Link> · <CopyLink url={`#${anchor}`} label="Ссылка" /></span></figcaption>
  </figure>;
}
export function BandcampEmbed({ title, embedUrl, externalUrl }: { title: string; embedUrl: string; externalUrl: string }) {
  return <figure className="bandcamp-embed"><iframe src={embedUrl} title={title} loading="lazy" allow="encrypted-media" /><figcaption>Альбом на Bandcamp. Если плеер не загрузился, <a href={externalUrl}>откройте релиз на Bandcamp</a>.</figcaption></figure>;
}
export function YouTubeFacade({ id }: { id: string }) {
  const asset = getMedia(id); const [active, setActive] = useState(false);
  if (!asset?.youtubeId) return null;
  return <div id={`media-${id}`} className="video-facade">
    {active ? <iframe src={`https://www.youtube-nocookie.com/embed/${asset.youtubeId}`} title={asset.title} allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" /> :
      <button onClick={() => setActive(true)} aria-label={`Воспроизвести: ${asset.title}`} style={{ backgroundImage: `url(${asset.thumbnail})` }}><span>▶</span><strong>{asset.title}</strong></button>}
  </div>;
}
export function QuoteBlock({ id }: { id: string }) {
  const quote = getQuote(id); if (!quote) return null;
  return <blockquote className="registered-quote"><p>«{quote.text}»</p><cite><Link href={quote.sourceUrl}>{quote.sourceTitle}</Link></cite></blockquote>;
}
export function PlotTree({ compact = false }: { compact?: boolean }) {
  return <section className={`plot-tree${compact ? " compact" : ""}`} aria-labelledby={compact ? "home-plot-title" : "plot-title"}>
    <p className="eyebrow">Интерактивная схема</p><h3 id={compact ? "home-plot-title" : "plot-title"}>Как мог измениться сюжет</h3>
    <div className="plot-tree-guide"><div><strong>Сверху вниз</strong><span>основная хронология сериала</span></div><div><strong>Красная рамка</strong><span>момент выбора зрителя</span></div><div><strong>Ответвление вбок</strong><span>альтернативная концовка</span></div><div><strong>После флешки</strong><span>переход к сюжету сиквела</span></div></div>
    <PlotTreeCanvas compact={compact} />
    <details className="plot-tree-fallback"><summary>Полный сюжет в текстовом виде</summary>
      {plotEpisodes.map((episode) => <section key={episode.title}><h4>{episode.title}</h4>{episode.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
      <h4>Варианты выбора</h4>{plotBranches.map((branch) => <section key={branch.title}><h5>{branch.title}</h5><p>{branch.context}</p>{branch.options.map(([choice, outcome]) => <div key={choice}><strong>{choice}</strong><p>{outcome}</p></div>)}</section>)}
      <section><h4>{plotSequel.title}</h4>{plotSequel.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
    </details>
  </section>;
}
export function LostMedia({ message }: { message: string }) {
  const [open, setOpen] = useState(false); const trigger = useRef<HTMLButtonElement>(null); const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const triggerElement = trigger.current;
    close.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") { event.preventDefault(); close.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); triggerElement?.focus(); };
  }, [open]);
  return <><button ref={trigger} type="button" className="lost-media-trigger" onClick={() => setOpen(true)}>LOST MEDIA</button>{open && <span className="lost-media-dialog" role="dialog" aria-modal="true" aria-labelledby="lost-media-title"><button ref={close} type="button" onClick={() => setOpen(false)} aria-label="Закрыть">×</button><code id="lost-media-title">{message}</code></span>}</>;
}
export function Separator() { return <hr className="editorial-separator" />; }
