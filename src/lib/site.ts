// Datos de contacto y direcciones del servidor, en un solo sitio.
export const TEL = "659 71 52 71";
export const TEL_HREF = "tel:+34659715271";
export const EMAIL = "contactomudanzasdelsur@gmail.com";
export const INSTAGRAM = "https://instagram.com/mudanzasdelsur_";
export const RESENAS_URL = "https://g.page/r/CezeZgltIhvZECA/review";
export const SITE_URL = "https://mudanzasdelsur.es";

export const wa = (texto = "Hola, me gustaría pedir un presupuesto para una mudanza.") =>
  `https://wa.me/34659715271?text=${encodeURIComponent(texto)}`;

// Funciones de IA (asistente, fotos, calculadora, contacto) en Firebase
export const API =
  process.env.NEXT_PUBLIC_WEB_API || "https://europe-west1-smartsonubalogictis.cloudfunctions.net/web_api";

export async function api<T = any>(accion: string, body: unknown): Promise<T & { ok: boolean; error?: string }> {
  try {
    const r = await fetch(`${API}/${accion}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok && !data.error) data.error = "No se ha podido enviar. Escríbenos por WhatsApp al " + TEL + ".";
    return { ok: r.ok && data.ok !== false, ...data };
  } catch {
    return { ok: false, error: "Sin conexión. Inténtalo de nuevo o escríbenos por WhatsApp al " + TEL + "." } as any;
  }
}

export const PUEBLOS = [
  "Huelva", "Aljaraque", "Punta Umbría", "Cartaya", "Lepe", "Isla Cristina", "Ayamonte", "Moguer",
  "Palos de la Frontera", "San Juan del Puerto", "Gibraleón", "Mazagón", "El Rompido", "Sevilla", "Toda Andalucía",
];
