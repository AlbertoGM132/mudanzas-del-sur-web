// Etiqueta de Google Ads, SOLO si la persona acepta las cookies (Consent Mode v2, modo básico:
// sin aceptación no se carga nada de Google). Sirve para que Google Ads sepa qué anuncios
// acaban en una solicitud o en un WhatsApp, y así pujar mejor.

export const AW_ID = "AW-17300769700";
export const CONVERSION = {
  solicitud: "aeDNCLakpOoaEKSX07lA", // «Solicitud de presupuesto»: calculadora o formulario enviados
  whatsapp: "ykSuCMzhvrAdEKSX07lA", // «Clic en WhatsApp»
} as const;

const CLAVE = "mds_cookies";
export const EVENTO_COOKIES = "mds:cookies";
export type Eleccion = "si" | "no";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Gtag; }
}

let cargada = false;

export function eleccion(): Eleccion | null {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === "si" || v === "no" ? v : null;
  } catch {
    return null;
  }
}

export function guardarEleccion(v: Eleccion) {
  try { localStorage.setItem(CLAVE, v); } catch { /* sin almacenamiento: se vuelve a preguntar */ }
  if (v === "si") cargar();
  else if (window.gtag) window.gtag("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
}

/** Carga la etiqueta de Google (solo con consentimiento). */
export function cargar() {
  if (cargada || typeof window === "undefined" || eleccion() !== "si") return;
  cargada = true;
  window.dataLayer = window.dataLayer || [];
  // gtag necesita el objeto `arguments`, no un array
  window.gtag = function gtag() { window.dataLayer!.push(arguments); } as Gtag; // eslint-disable-line prefer-rest-params
  window.gtag("consent", "default", {
    ad_storage: "granted", ad_user_data: "granted", ad_personalization: "denied", analytics_storage: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", AW_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${AW_ID}`;
  document.head.appendChild(s);
}

/** Avisa a Google Ads de una conversión. Sin consentimiento no hace nada. */
export function conversion(tipo: keyof typeof CONVERSION, valor = 1) {
  if (!cargada || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: `${AW_ID}/${CONVERSION[tipo]}`, value: valor, currency: "EUR" });
}
