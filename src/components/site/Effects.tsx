"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Efectos de la web. El contenido ya está en el HTML: esto solo lo anima. */
export default function Effects() {
  const path = usePathname();

  useEffect(() => {
    const safe = (fn: () => void | (() => void), name: string) => {
      try { return fn(); } catch (e) { console.warn("efecto", name, e); }
    };
    const limpiar: Array<() => void> = [];
    document.documentElement.classList.add("js");

    // 1) Aparición suave al hacer scroll (umbral bajo + red de seguridad)
    safe(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
      if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
      const io = new IntersectionObserver((ents) => ents.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }), { threshold: 0.04, rootMargin: "0px 0px -6% 0px" });
      els.forEach((e) => io.observe(e));
      const t = window.setTimeout(() => els.forEach((e) => e.classList.add("in")), 4000);
      limpiar.push(() => { io.disconnect(); clearTimeout(t); });
    }, "reveal");

    // 2) Contadores
    safe(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
      const io = new IntersectionObserver((ents) => ents.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement; io.unobserve(el);
        const fin = Number(el.dataset.count || 0), t0 = performance.now(), dur = 1600;
        const paso = (t: number) => {
          const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(fin * e));
          if (p < 1) requestAnimationFrame(paso);
        };
        requestAnimationFrame(paso);
      }), { threshold: 0.2 });
      els.forEach((e) => io.observe(e));
      limpiar.push(() => io.disconnect());
    }, "count");

    // 3) La ruta de «Cómo funciona»: se dibuja y el camión avanza con el scroll
    safe(() => {
      const sec = document.querySelector<HTMLElement>("[data-route]");
      const path = sec?.querySelector<SVGPathElement>(".route-fg");
      const truck = sec?.querySelector<SVGGElement>(".route-truck");
      const steps = Array.from(sec?.querySelectorAll<HTMLElement>(".step") || []);
      const kmEl = sec?.querySelector<HTMLElement>("[data-km]");
      if (!sec || !path || !truck) return;
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      let raf = 0;
      const pintar = () => {
        raf = 0;
        const r = sec.getBoundingClientRect(), vh = window.innerHeight;
        const p = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / (r.height - vh * 0.35)));
        path.style.strokeDashoffset = `${len * (1 - p)}`;
        const pc = Math.min(p, (len - 34) / len);   // el camión aparca justo antes de la casa nueva
        const pt = path.getPointAtLength(len * pc), pt2 = path.getPointAtLength(Math.min(len, len * pc + 1));
        // Inclinación suave (un camión no sube en vertical) y ruedas que giran al avanzar
        const ang = Math.max(-22, Math.min(22, Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI));
        truck.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${ang})`);
        truck.querySelectorAll<SVGGElement>(".rueda").forEach((w, i) => {
          const cx = i === 0 ? 13 : 60;
          w.setAttribute("transform", `rotate(${p * 1440} ${cx} 35)`);
        });
        const activo = Math.min(steps.length - 1, Math.floor(p * steps.length));
        steps.forEach((s, i) => { s.classList.toggle("active", i === activo); s.classList.toggle("done", i < activo); });
        if (kmEl) kmEl.textContent = String(Math.round(p * 100));
      };
      const on = () => { if (!raf) raf = requestAnimationFrame(pintar); };
      pintar();
      window.addEventListener("scroll", on, { passive: true });
      window.addEventListener("resize", on);
      limpiar.push(() => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); });
    }, "route");

    // 4) El móvil de la calculadora «escanea» cuando se ve
    safe(() => {
      const ui = document.querySelector<HTMLElement>(".phone-ui");
      if (!ui) return;
      const io = new IntersectionObserver((ents) => ents.forEach((en) => {
        if (en.isIntersecting) { ui.classList.add("play"); io.disconnect(); }
      }), { threshold: 0.2 });
      io.observe(ui);
      limpiar.push(() => io.disconnect());
    }, "phone");

    return () => limpiar.forEach((f) => f());
  }, [path]);

  return null;
}
