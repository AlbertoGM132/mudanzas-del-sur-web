// Catálogo de objetos de la calculadora. Los m³ son los mismos que usa el servidor
// (functions/estimador.py de MudanzaPro): aquí solo sirven para enseñarlos en directo.

export type Cat = { nombre: string; ico: string; m3: number };

export const CATS: Record<string, Cat> = {
  sofa: { nombre: "Sofá", ico: "🛋", m3: 2.5 },
  sofa_pequeno: { nombre: "Sofá pequeño", ico: "🛋", m3: 1.5 },
  sillon: { nombre: "Sillón", ico: "💺", m3: 0.8 },
  cama: { nombre: "Cama de matrimonio", ico: "🛏", m3: 1.5 },
  cama_individual: { nombre: "Cama individual", ico: "🛏", m3: 1.0 },
  canape: { nombre: "Canapé", ico: "🛏", m3: 1.2 },
  colchon: { nombre: "Colchón", ico: "🛏", m3: 0.5 },
  armario2: { nombre: "Armario 1-2 puertas", ico: "🚪", m3: 1.0 },
  armario4: { nombre: "Armario 3-4 puertas", ico: "🚪", m3: 2.0 },
  armario6: { nombre: "Armario 5-6 puertas o esquinero", ico: "🚪", m3: 3.0 },
  comoda: { nombre: "Cómoda", ico: "🗄", m3: 0.6 },
  mesita: { nombre: "Mesita de noche", ico: "🗄", m3: 0.2 },
  mesa: { nombre: "Mesa de comedor", ico: "🍽", m3: 0.8 },
  mesa_pequena: { nombre: "Mesa pequeña", ico: "☕", m3: 0.3 },
  silla: { nombre: "Silla", ico: "🪑", m3: 0.2 },
  estanteria: { nombre: "Estantería", ico: "📚", m3: 0.7 },
  mueble_tv: { nombre: "Mueble de TV", ico: "📺", m3: 0.7 },
  aparador: { nombre: "Aparador", ico: "🗄", m3: 1.0 },
  escritorio: { nombre: "Escritorio", ico: "🖥", m3: 0.7 },
  frigorifico: { nombre: "Frigorífico", ico: "🧊", m3: 1.0 },
  lavadora: { nombre: "Lavadora", ico: "🫧", m3: 0.5 },
  secadora: { nombre: "Secadora", ico: "🫧", m3: 0.5 },
  lavavajillas: { nombre: "Lavavajillas", ico: "🍽", m3: 0.5 },
  horno_microondas: { nombre: "Horno o microondas", ico: "♨️", m3: 0.15 },
  televisor: { nombre: "Televisor", ico: "📺", m3: 0.3 },
  bicicleta: { nombre: "Bicicleta", ico: "🚲", m3: 0.5 },
  caja: { nombre: "Caja", ico: "📦", m3: 0.1 },
  maleta: { nombre: "Maleta", ico: "🧳", m3: 0.15 },
  planta: { nombre: "Planta grande", ico: "🪴", m3: 0.3 },
  electrodomestico: { nombre: "Otro electrodoméstico", ico: "🔌", m3: 0.3 },
  otro: { nombre: "Otra cosa", ico: "📦", m3: 0.4 },
};

export const RAPIDOS = ["sofa", "cama", "canape", "armario2", "armario4", "armario6", "mesa", "silla", "comoda",
  "estanteria", "mueble_tv", "frigorifico", "lavadora", "televisor", "caja"];

export const CASAS: { k: string; t: string; m3: [number, number] }[] = [
  { k: "estudio", t: "Estudio", m3: [8, 12] }, { k: "1", t: "1 dormitorio", m3: [12, 18] },
  { k: "2", t: "2 dormitorios", m3: [20, 28] }, { k: "3", t: "3 dormitorios", m3: [28, 38] },
  { k: "4", t: "4 o más", m3: [38, 48] }, { k: "chalet", t: "Chalet / casa grande", m3: [42, 60] },
];

export const PISOS = [
  { k: "bajo", t: "Bajo / casa" }, { k: "1", t: "1º" }, { k: "2", t: "2º" }, { k: "3", t: "3º" }, { k: "4", t: "4º o más" },
];

export const ESPECIALES = [
  { k: "piano", t: "Piano" }, { k: "caja-fuerte", t: "Caja fuerte" }, { k: "nevera-americana", t: "Nevera americana" },
  { k: "pesado", t: "Algo de +100 kg" }, { k: "plantas", t: "Plantas grandes" }, { k: "arte", t: "Cuadros u obras de arte" },
];

export type Item = { id: string; nombre: string; categoria: string; cantidad: number; ia?: boolean };

/** Mismo cálculo de volumen que el servidor (para enseñarlo mientras el cliente edita). */
export function volumen(items: Item[], tipo: "casa" | "porte", casa: string | null) {
  let s = items.reduce((a, it) => a + (CATS[it.categoria]?.m3 ?? 0.4) * Math.max(0, it.cantidad), 0);
  if (tipo === "casa") {
    s *= 1.15;
    const c = CASAS.find((x) => x.k === casa);
    if (c) s = s ? Math.min(Math.max(s, c.m3[0]), c.m3[1] * 1.2) : (c.m3[0] + c.m3[1]) / 2;
  }
  return Math.round(Math.max(s, items.length || casa ? 0.5 : 0) * 10) / 10;
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export function metros(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371000, r = Math.PI / 180;
  const dLa = (b.lat - a.lat) * r, dLo = (b.lng - a.lng) * r;
  const h = Math.sin(dLa / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Foto → JPEG más pequeño (sin datos de ubicación: el lienzo no copia el EXIF). */
export async function comprimir(file: File, lado: number, calidad = 0.82): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((ok, ko) => {
      const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = url;
    });
    const k = Math.min(1, lado / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas");
    c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
    c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", calidad);
  } finally {
    URL.revokeObjectURL(url);
  }
}
