"use client";
import { useEffect, useRef, useState } from "react";
import type { Issue } from "@/lib/types";
import { getMaterial } from "@/content/registry";

export function IssueToc({ issue }: { issue: Issue }) {
  const desktopToc = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0); const [active, setActive] = useState(""); const [open, setOpen] = useState(false);
  useEffect(() => {
    for (const section of issue.sections) for (const block of section.blocks) {
      if (block.type !== "material") continue;
      const material = getMaterial(block.material);
      const container = document.getElementById(`material-${block.material}`);
      if (!material || !container) continue;
      const renderedHeadings = [...container.querySelectorAll<HTMLElement>(".prose h2, .prose h3, .prose h4")];
      for (const heading of material.headings) {
        const rendered = renderedHeadings.find((element) => element.textContent?.trim() === heading.title);
        if (rendered) rendered.id = `heading-${material.slug}-${heading.id}`;
      }
    }
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? Math.round(scrollY / max * 100) : 0);
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-toc]")];
      setActive(nodes.filter((n) => n.getBoundingClientRect().top < innerHeight * .35).at(-1)?.id ?? "");
    };
    update(); addEventListener("scroll", update, { passive: true }); return () => removeEventListener("scroll", update);
  }, [issue]);
  useEffect(() => {
    const panel = desktopToc.current;
    const current = panel?.querySelector<HTMLElement>(".active");
    if (!panel || !current) return;
    const target = current.offsetTop - panel.clientHeight / 2 + current.clientHeight / 2;
    panel.scrollTo({ top: Math.max(0, target), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [active]);
  function go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); history.replaceState(null, "", `#${id}`); setOpen(false); }
  const content = <ol>{issue.sections.map((section, i) => <li key={section.id}><button className={active === `section-${section.id}` ? "active" : ""} onClick={() => go(`section-${section.id}`)}>{String(i + 1).padStart(2, "0")}. {section.title}</button><ul>{section.blocks.filter((b) => b.type === "material").map((b) => { const m = getMaterial(b.material)!; return <li key={m.slug}><button className={active === `material-${m.slug}` ? "active" : ""} onClick={() => go(`material-${m.slug}`)}>{m.title}</button>{m.headings.map((h) => <button className="toc-heading" key={h.id} onClick={() => go(`heading-${m.slug}-${h.id}`)}>{h.title}</button>)}</li>; })}</ul></li>)}</ol>;
  return <><aside ref={desktopToc} className="issue-toc"><div className="progress-label">Содержание <span>{progress}%</span></div><div className="progress-track"><i style={{ width: `${progress}%` }} /></div>{content}</aside><div className="mobile-toc"><button aria-expanded={open} onClick={() => setOpen(!open)}>Содержание · {progress}%</button>{open && <div className="mobile-toc-panel">{content}</div>}</div></>;
}
