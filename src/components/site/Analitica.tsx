"use client";

// Mide páginas, secciones vistas, hasta dónde se baja, botones pulsados y tiempo en cada página.
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { enviar, ev, iniciar } from "@/lib/analitica";

function queEs(el: Element): string | null {
  const propio = el.getAttribute("data-ev");
  if (propio) return propio;
  const href = (el as HTMLAnchorElement).href || "";
  if (/wa\.me|api\.whatsapp|whatsapp\.com/.test(href)) return "whatsapp";
  if (href.startsWith("tel:")) return "llamar";
  if (href.startsWith("mailto:")) return "email";
  if (/\/calculadora\/?($|[?#])/.test(href)) return "calculadora";
  if (/instagram\.com/.test(href)) return "instagram";
  if (/tiktok\.com/.test(href)) return "tiktok";
  if (/facebook\.com/.test(href)) return "facebook";
  if (/google\.[a-z.]+\/maps|g\.page|maps\.app/.test(href)) return "mapa";
  return null;
}

function zonaDe(el: Element): string {
  const z = el.closest("[data-zona]")?.getAttribute("data-zona");
  if (z) return z;
  if (el.closest(".site-header, .mobile-nav")) return "cabecera";
  if (el.closest("footer")) return "pie";
  if (el.closest(".fab-stack")) return "flotante";
  if (el.closest(".chat-panel")) return "chat";
  return el.closest("section[id]")?.id || (el.closest(".hero") ? "inicio" : "");
}

export default function Analitica() {
  const path = usePathname() || "/";
  const pag = useRef({ visible: 0, desde: 0, ruta: "/" });

  // Una vez: arranque, clics y tiempo visible
  useEffect(() => {
    iniciar();
    const clic = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a, button, [data-ev]");
      if (!el) return;
      const que = queEs(el);
      if (que) ev("clic", { que, zona: zonaDe(el), texto: (el.textContent || "").trim().slice(0, 40) });
    };
    const vis = () => {
      const p = pag.current;
      // Tiempo visible acumulado en la página (el panel se queda con el mayor de cada página)
      if (document.visibilityState === "hidden") { p.visible += performance.now() - p.desde; ev("salida", { seg: Math.round(p.visible / 1000) }, p.ruta); enviar(); }
      else p.desde = performance.now();
    };
    document.addEventListener("click", clic, { capture: true });
    document.addEventListener("visibilitychange", vis);
    return () => { document.removeEventListener("click", clic, { capture: true }); document.removeEventListener("visibilitychange", vis); };
  }, []);

  // Cada página: vista, secciones, scroll y tiempo al salir
  useEffect(() => {
    const p = pag.current;
    const ruta = path.endsWith("/") ? path : path + "/";
    p.desde = performance.now(); p.visible = 0; p.ruta = ruta;
    ev("vista", { titulo: document.title.slice(0, 80) });
    const marcas = new Set<number>();
    let pendiente = false;
    const scroll = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        const alto = document.documentElement.scrollHeight - window.innerHeight;
        const pct = alto <= 0 ? 100 : ((window.scrollY + 1) / alto) * 100;
        for (const m of [25, 50, 75, 100]) if (pct >= m - 2 && !marcas.has(m)) { marcas.add(m); ev("scroll", { pct: m }); }
      });
    };
    window.addEventListener("scroll", scroll, { passive: true });
    const vistas = new Set<string>();
    const io = new IntersectionObserver((entradas) => {
      for (const x of entradas) {
        const id = x.target.id || (x.target.classList.contains("hero") ? "inicio" : "");
        if (x.isIntersecting && id && !vistas.has(id)) { vistas.add(id); ev("seccion", { id }); }
      }
    }, { threshold: 0.35 });
    const t = setTimeout(() => document.querySelectorAll("main section[id], main section.hero").forEach((s) => io.observe(s)), 300);
    return () => {
      clearTimeout(t); io.disconnect(); window.removeEventListener("scroll", scroll);
      if (document.visibilityState === "visible") p.visible += performance.now() - p.desde;
      ev("salida", { seg: Math.round(p.visible / 1000) }, ruta);
    };
  }, [path]);

  return null;
}
