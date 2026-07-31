"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getIssue, getMedia, publicMaterials, people } from "@/content/registry";
import { formatDate } from "./material";

export function PeopleBrowser() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const rows = people
    .map((person) => ({
      person,
      related: publicMaterials.filter(
        (material) =>
          material.authors.some((author) => author.personId === person.id) ||
          material.people?.includes(person.id),
      ),
    }))
    .filter(({ person, related }) =>
      `${person.name} ${person.aliases?.join(" ")} ${person.description} ${person.occupation} ${related
        .map((material) => `${material.title} ${material.tags.join(" ")} ${material.issue ? getIssue(material.issue)?.title : ""}`)
        .join(" ")}`
        .toLowerCase()
        .includes(normalizedQuery),
    );

  return (
    <>
      <label className="search-field people-search">
        <span>Поиск по людям и материалам</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Имя, роль, материал или тег"
        />
      </label>
      <div className="people-list">
        {rows.map(({ person, related }) => {
          const photo = person.photo ? getMedia(person.photo) : undefined;
          return (
            <article id={`person-${person.id}`} key={person.id}>
              <div className="person-summary">
                {photo?.src && (
                  <Link className="person-photo" id={`media-${photo.id}`} href={`/media/${photo.id}`}>
                    <Image src={photo.src} alt={photo.alt} width={photo.width ?? 240} height={photo.height ?? 320} />
                  </Link>
                )}
                <div className="person-copy">
                  <h2>{person.name}</h2>
                  <p>{person.description}</p>
                  <span>{person.occupation} · {person.tags.join(", ")}</span>
                </div>
                <span className="person-count">{related.length} публикации</span>
              </div>
              <details>
                <summary>Связанные материалы</summary>
                <label className="visually-hidden" htmlFor={`related-${person.id}`}>Поиск внутри списка {person.name}</label>
                <RelatedSearch id={`related-${person.id}`} items={related} personId={person.id} />
              </details>
            </article>
          );
        })}
        {!rows.length && <p className="people-empty">По вашему запросу никого не найдено.</p>}
      </div>
    </>
  );
}

function RelatedSearch({ id, items, personId }: { id: string; items: typeof publicMaterials; personId: string }) {
  const [query, setQuery] = useState("");
  const shown = items.filter((material) => `${material.title} ${material.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <input id={id} type="search" placeholder="Поиск в списке" value={query} onChange={(event) => setQuery(event.target.value)} />
      <div className="related-list">
        {shown.map((material) => {
          const credit = material.authors.find((author) => author.personId === personId);
          const issue = material.issue ? getIssue(material.issue) : undefined;
          return (
            <Link className="related-row" href={`/materials/${material.slug}`} key={material.slug}>
              <strong>{material.title}</strong>
              <span>{formatDate(material.publishedAt)} · {issue && !issue.private ? `Выпуск №${issue.number}` : "Самостоятельно"} · {credit?.role ?? "Участник"}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
