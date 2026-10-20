// Analítica propia de la web, SIN cookies ni almacenamiento en el navegador.
// Cada visita lleva un id aleatorio que solo vive en la memoria de la pestaña: al
// cerrarla o recargar, se olvida. No se guarda IP, nombre ni nada que identifique a nadie.
// Si el navegador pide «no rastrear» (Do Not Track / GPC), no se mide nada.
// Los datos van a la función web_api (/evento) y se ven en el panel del negocio.
import { API } from "./site";

type Datos = Record<string, string | number | boolean | undefined>;
type Evento = { n: string; p: string; s: number; d?: Datos };

const URL_EVENTO = `${API}/evento`;
let activo = false;
let sid = "";
let t0 = 0;
let cola: Evento[] = [];
let ctx: Record<string, string> = {};

const ahora = () => Math.round(performance.now() - t0);
const pagina = () => {
  const p = location.pathname || "/";
  return p.endsWith("/") || p.includes(".") ? p : p + "/";
};

export function iniciar() {
  if (activo || typeof window === "undefined") return;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (nav.globalPrivacyControl || nav.doNotTrack === "1" || /bot|crawl|spider|headless|lighthouse/i.test(nav.userAgent)) return;
  activo = true;
  t0 = performance.now();
  const a = new Uint8Array(12);
  crypto.getRandomValues(a);
  sid = Array.from(a, (b) => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36]).join("");
  const q = new URLSearchParams(location.search);
  ctx = {
    utm_source: q.get("utm_source") || "", utm_medium: q.get("utm_medium") || "", utm_campaign: q.get("utm_campaign") || "",
    utm_content: q.get("utm_content") || "", utm_term: q.get("utm_term") || "",
    clid: ["gclid", "gbraid", "wbraid", "fbclid", "ttclid", "msclkid"].find((k) => q.has(k)) || "",
    ref: document.referrer || "", landing: pagina(), ancho: String(window.innerWidth),
  };
  setInterval(() => enviar(), 6000);
  window.addEventListener("pagehide", () => enviar());
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") enviar(); });
}

/** Apunta un evento (vista, clic, paso de la calculadora…). */
export function ev(n: string, d?: Datos, p?: string) {
  if (!activo) return;
  cola.push({ n, p: p || pagina(), s: ahora(), d });
  if (cola.length >= 25) enviar();
}

/** Manda ya lo pendiente (al ocultar o cerrar la página). */
export function enviar() {
  if (!cola.length) return;
  const body = JSON.stringify({ sid, ctx, ev: cola.splice(0, 50) });
  try {
    // text/plain: no necesita permiso previo (preflight) y sendBeacon llega aunque se cierre la pestaña
    if (navigator.sendBeacon && navigator.sendBeacon(URL_EVENTO, new Blob([body], { type: "text/plain" }))) return;
    fetch(URL_EVENTO, { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
  } catch {
    /* la analítica nunca rompe la web */
  }
}

/** El origen de la visita, para guardarlo con la solicitud (calculadora y contacto). */
export function atribucion() {
  if (!activo) return undefined;
  return { sid, ...ctx, ua: navigator.userAgent };
}

/** Datos para el chat: así se sabe desde qué página preguntan. */
export function contextoChat() {
  return activo ? { sid, pagina: pagina() } : {};
}
