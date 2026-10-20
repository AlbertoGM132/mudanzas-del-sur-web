"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TEL, TEL_HREF } from "@/lib/site";

const LINKS = [
  { href: "/servicios/", label: "Servicios" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/blog/", label: "Consejos" },
  { href: "/contacto/", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname() || "/";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className={`site-header${scrolled || open ? " scrolled" : ""}`}>
      <div className="wrap bar">
        <Link href="/" className="brand" aria-label="Mudanzas del Sur, inicio">
          <img src="/assets/img/logo-claro.webp" alt="Mudanzas del Sur" width={96} height={46} />
        </Link>
        <nav className="nav" aria-label="Principal">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined}>{l.label}</Link>
          ))}
          <a href={TEL_HREF}>{TEL}</a>
        </nav>
        <Link href="/calculadora/" className="btn btn-lime header-cta">Calcula tu mudanza</Link>
        <button className="burger" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}><span /></button>
      </div>
      <div className={`mobile-nav${open ? " open" : ""}`} aria-hidden={!open}>
        {LINKS.map((l) => (<Link key={l.href} href={l.href} tabIndex={open ? 0 : -1}>{l.label}</Link>))}
        <a href={TEL_HREF} tabIndex={open ? 0 : -1}>Llamar · {TEL}</a>
        <Link href="/calculadora/" className="btn btn-lime" tabIndex={open ? 0 : -1}>Calcula tu mudanza con IA</Link>
      </div>
    </header>
  );
}
