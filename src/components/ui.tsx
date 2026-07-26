"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [["Главная", "/"], ["Выпуски", "/issues"], ["Материалы", "/materials"], ["Люди", "/people"], ["Галерея", "/gallery"], ["Поиск", "/search"], ["О проекте", "/about"]];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link className="logo" href="/" aria-label="N-вариант — главная">[N]</Link>
    <button className="menu-button" aria-expanded={open} aria-controls="global-nav" onClick={() => setOpen(!open)}>Меню</button>
    <nav id="global-nav" aria-label="Основная навигация" className={open ? "nav open" : "nav"}>
      {links.map(([label, href]) => <Link key={href} href={href} aria-current={path === href || (href !== "/" && path.startsWith(href)) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <ThemeToggle />
  </header>;
}
function ThemeToggle() {
  useEffect(() => {
    const saved = localStorage.getItem("n-theme");
    const dark = saved === "dark" || (!saved && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, []);
  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next; localStorage.setItem("n-theme", next);
  }
  return <button className="theme-button" onClick={toggle} aria-label="Переключить светлую и тёмную тему">Тема</button>;
}
export function CopyLink({ url, label = "Скопировать ссылку" }: { url?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    const value = url ? new URL(url, location.origin).toString() : location.href;
    try { await navigator.clipboard.writeText(value); } catch {
      const input = document.createElement("textarea"); input.value = value; document.body.appendChild(input); input.select(); document.execCommand("copy"); input.remove();
    }
    setCopied(true); window.setTimeout(() => setCopied(false), 1800);
  }
  return <button className="text-button" onClick={copy}>{copied ? "Ссылка скопирована" : label}</button>;
}
export function HashHighlight() {
  useEffect(() => {
    const mark = () => {
      document.querySelectorAll(".anchor-highlight").forEach((el) => el.classList.remove("anchor-highlight"));
      if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.classList.add("anchor-highlight");
    };
    mark(); addEventListener("hashchange", mark); return () => removeEventListener("hashchange", mark);
  }, []);
  return null;
}
export function Dialog({ trigger, children }: { trigger: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  return <><button onClick={() => ref.current?.showModal()}>{trigger}</button><dialog ref={ref} onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}><button className="dialog-close" aria-label="Закрыть" onClick={() => ref.current?.close()}>×</button>{children}</dialog></>;
}
