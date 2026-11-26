"use client";

import React, { useEffect, useRef, useState } from "react";

export type Lugar = { label: string; calle: string; poblacion: string; lat: number; lng: number };

/** Un resultado de Photon → Lugar (calle y número, población y provincia). */
function lugarDe(f: any, lat?: number, lng?: number): Lugar {
  const p = f.properties || {};
  const calle = [p.street || p.name, p.housenumber].filter(Boolean).join(" ");
  const poblacion = p.city || p.town || p.village || p.county || "";
  const label = [calle, poblacion !== calle ? poblacion : "", p.state && p.state !== poblacion ? p.state : ""].filter(Boolean).join(", ");
  return { label, calle: calle || label, poblacion, lat: lat ?? f.geometry.coordinates[1], lng: lng ?? f.geometry.coordinates[0] };
}

/** Dirección del punto que se toca en el mapa (Photon reverse). Se queda con las coordenadas
 *  exactas del toque; si no encuentra nada, deja las coordenadas para que se pueda localizar. */
export async function direccionDe(p: { lat: number; lng: number }): Promise<Lugar> {
  const coords = `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`;
  try {
    const data = await (await fetch(`https://photon.komoot.io/reverse?lat=${p.lat}&lon=${p.lng}&limit=1`)).json();
    const f = (data.features || [])[0];
    if (f) {
      const l = lugarDe(f, p.lat, p.lng);
      if (l.label) return l;
    }
  } catch { /* sin conexión: se quedan las coordenadas */ }
  return { label: `Punto en el mapa (${coords})`, calle: `Punto en el mapa (${coords})`, poblacion: "", lat: p.lat, lng: p.lng };
}

/** Buscador de direcciones (Photon, de OpenStreetMap: gratis y sin clave), con prioridad a Huelva. */
export default function Buscador({ id, valor, placeholder, onElegir }: {
  id: string; valor: Lugar | null; placeholder: string; onElegir: (l: Lugar) => void;
}) {
  const [q, setQ] = useState(valor?.label || "");
  const [res, setRes] = useState<Lugar[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const ultima = useRef("");

  useEffect(() => { if (valor) setQ(valor.label); }, [valor?.label]);

  useEffect(() => {
    const texto = q.trim();
    if (texto.length < 3 || texto === valor?.label) { setRes([]); return; }
    const t = setTimeout(async () => {
      ultima.current = texto;
      setCargando(true);
      try {
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(texto)}&limit=6&lat=37.26&lon=-6.94&bbox=-9.6,35.9,3.4,43.9`;
        const data = await (await fetch(url)).json();
        if (ultima.current !== texto) return;
        const vistos = new Set<string>();
        const lista: Lugar[] = (data.features || []).map((f: any) => lugarDe(f)).filter((l: Lugar) => l.label && !vistos.has(l.label) && vistos.add(l.label));
        setRes(lista); setAbierto(true);
      } catch {
        setRes([]);
      } finally {
        setCargando(false);
      }
    }, 380);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="buscador">
      <input id={id} name={id} className="input" value={q} placeholder={placeholder} autoComplete="off"
        onChange={(e) => { setQ(e.target.value); setAbierto(true); }}
        onFocus={() => res.length && setAbierto(true)}
        onBlur={() => setTimeout(() => setAbierto(false), 180)}
        aria-autocomplete="list" aria-expanded={abierto && res.length > 0} />
      {cargando && <span className="buscador-spin" aria-hidden="true" />}
      {abierto && res.length > 0 && (
        <ul className="buscador-lista" role="listbox">
          {res.map((r) => (
            <li key={r.label + r.lat} role="option" aria-selected="false">
              <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { onElegir(r); setQ(r.label); setAbierto(false); }}>
                📍 {r.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
