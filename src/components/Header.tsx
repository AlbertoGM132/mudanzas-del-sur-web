"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const navLinks = [
  { label: "Inicio", href: "/home-page" },
  { label: "Servicios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "header-blur shadow-sm" : "bg-transparent"}`}>
        <div className="container-main">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/home-page" className="flex-shrink-0">
              <AppImage
                src="/assets/images/logo.png"
                alt="Mudanzas del Sur logo"
                width={160}
                height={52}
                priority
                className="h-20 md:h-22 w-auto object-contain mix-blend-multiply"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="nav-link">{link.label}</Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="tel:+34659715271" className="btn-primary text-sm py-3 px-5">
                <Icon name="PhoneIcon" size={16} variant="solid" />
                ¡Llama Ahora!
              </a>
            </div>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <Icon name={menuOpen ? "XMarkIcon" : "Bars3Icon"} size={22} />
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 bg-white flex flex-col pt-20 pb-8 px-6 transition-transform duration-400 ease-out md:hidden ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <nav className="flex flex-col gap-2 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-heading font-bold text-xl text-foreground py-4 border-b border-border/60"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <a href="tel:+34659715271" className="btn-primary w-full justify-center text-base py-4">
            <Icon name="PhoneIcon" size={18} variant="solid" />
            +34 659 71 52 71
          </a>
        </div>
      </div>
    </>
  );
}
