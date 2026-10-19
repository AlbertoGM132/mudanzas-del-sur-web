"use client";

import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type Punto = { lat: number; lng: number };

type Props =
  | { modo: "ruta"; origen?: Punto | null; destino?: Punto | null; ruta?: [number, number][] | null; onClick?: (p: Punto) => void }
  | { modo: "camion"; portal: Punto; camion: Punto | null; onCamion: (p: Punto) => void; onPortal: (p: Punto) => void };

const HUELVA: Punto = { lat: 37.2614, lng: -6.9447 };

const pin = (txt: string, color: string) =>
  `<div class="mp-pin" style="--c:${color}"><span>${txt}</span></div>`;
const TRUCK = `<div class="mp-truck"><svg viewBox="0 0 36 24" width="36" height="24"><rect x="1" y="3" width="21" height="14" rx="2" fill="#141a33"/><path d="M22 7h6l6 6v4H22z" fill="#e8590c"/><circle cx="8" cy="19" r="3.2" fill="#141a33" stroke="#fff" stroke-width="1.5"/><circle cx="28" cy="19" r="3.2" fill="#141a33" stroke="#fff" stroke-width="1.5"/></svg></div>`;

/** Mapa de OpenStreetMap (gratis, sin clave). Leaflet se carga solo en el navegador. */
export default function Mapa(props: Props) {
  const div = useRef<HTMLDivElement>(null);
  const st = useRef<any>({});
  const latest = useRef(props);
  latest.current = props;

  // Crear el mapa una vez
  useEffect(() => {
    let vivo = true;
    (async () => {
      const L = (await import("leaflet")).default;
      if (!vivo || !div.current) return;
      const map = L.map(div.current, { zoomControl: true, attributionControl: true, scrollWheelZoom: false, tap: true } as any)
        .setView([HUELVA.lat, HUELVA.lng], 10);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      map.on("click", (e: any) => {
        const p = latest.current;
        if (p.modo === "ruta" && p.onClick) p.onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
        if (p.modo === "camion") p.onCamion({ lat: e.latlng.lat, lng: e.latlng.lng });
      });
      st.current = { L, map, capa: L.layerGroup().addTo(map) };
      pintar();
      setTimeout(() => map.invalidateSize(), 200);
    })();
    return () => { vivo = false; st.current.map?.remove(); st.current = {}; };
  }, []);

  useEffect(() => { pintar(); });

  function pintar() {
    const { L, map, capa } = st.current;
    if (!L) return;
    const p = latest.current;
    capa.clearLayers();
    const icon = (html: string, size: [number, number], anchor: [number, number]) =>
      L.divIcon({ html, className: "mp-icon", iconSize: size, iconAnchor: anchor });

    if (p.modo === "ruta") {
      const pts: any[] = [];
      if (p.origen) { L.marker([p.origen.lat, p.origen.lng], { icon: icon(pin("A", "#141a33"), [34, 44], [17, 42]) }).addTo(capa); pts.push([p.origen.lat, p.origen.lng]); }
      if (p.destino) { L.marker([p.destino.lat, p.destino.lng], { icon: icon(pin("B", "#e8590c"), [34, 44], [17, 42]) }).addTo(capa); pts.push([p.destino.lat, p.destino.lng]); }
      if (p.ruta && p.ruta.length > 1) {
        L.polyline(p.ruta, { color: "#141a33", weight: 7, opacity: 0.18 }).addTo(capa);
        L.polyline(p.ruta, { color: "#e8590c", weight: 4, opacity: 0.95 }).addTo(capa);
      } else if (pts.length === 2) {
        L.polyline(pts, { color: "#e8590c", weight: 3, dashArray: "6 8" }).addTo(capa);
      }
      const key = JSON.stringify([pts, p.ruta?.length]);
      if (st.current.key !== key) {
        st.current.key = key;
        if (pts.length === 2) map.fitBounds(p.ruta && p.ruta.length > 1 ? p.ruta : pts, { padding: [40, 40] });
        else if (pts.length === 1) map.setView(pts[0], 15);
      }
      return;
    }

    // Modo camión: el portal y el camión, los dos arrastrables, con la distancia entre ellos
    const portal = L.marker([p.portal.lat, p.portal.lng], { draggable: true, icon: icon(pin("🏠", "#141a33"), [34, 44], [17, 42]) }).addTo(capa);
    portal.on("dragend", (e: any) => latest.current.modo === "camion" && latest.current.onPortal(e.target.getLatLng()));
    const c = p.camion || { lat: p.portal.lat - 0.00025, lng: p.portal.lng + 0.0003 };
    const truck = L.marker([c.lat, c.lng], { draggable: true, icon: icon(TRUCK, [36, 24], [18, 12]), zIndexOffset: 500 }).addTo(capa);
    truck.on("dragend", (e: any) => latest.current.modo === "camion" && latest.current.onCamion(e.target.getLatLng()));
    if (p.camion) L.polyline([[p.portal.lat, p.portal.lng], [c.lat, c.lng]], { color: "#e8590c", weight: 3, dashArray: "4 7" }).addTo(capa);
    const key = JSON.stringify([p.portal.lat.toFixed(5), p.portal.lng.toFixed(5)]);
    if (st.current.key !== key) { st.current.key = key; map.setView([p.portal.lat, p.portal.lng], 18); }
  }

  return <div ref={div} className="mapa" role="application" aria-label="Mapa" />;
}
