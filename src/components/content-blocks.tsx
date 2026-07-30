"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getMedia, getQuote } from "@/content/registry";
import { CopyLink } from "./ui";

export function MediaBlock({ id, caption, usageId, usageSuffix }: { id: string; caption?: string; usageId?: string; usageSuffix?: string }) {
  const asset = getMedia(id); if (!asset) return null;
  const anchor = `media-${id}${usageSuffix ? `-${usageSuffix}` : ""}`;
  return <figure id={anchor} className="media-block">
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
export function Separator() { return <hr className="editorial-separator" />; }
