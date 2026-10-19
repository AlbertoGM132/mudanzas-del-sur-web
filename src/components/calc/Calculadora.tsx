"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { api, TEL, wa } from "@/lib/site";
import { CASAS, CATS, ESPECIALES, Item, PISOS, RAPIDOS, comprimir, metros, uid, volumen } from "./datos";
import Buscador, { Lugar } from "./Buscador";
import { IArrow, ICamera, ISpark, IWhatsApp } from "@/components/site/Icons";

const Mapa = dynamic(() => import("./Mapa"), { ssr: false, loading: () => <div className="mapa mapa-cargando">Cargando mapa…</div> });

type Lado = { lugar: Lugar | null; piso: string; ascensor: "" | "si" | "no"; camion: { lat: number; lng: number } | null; puerta: boolean };
type Foto = { id: string; full: string; small: string };
type Estudio = { min?: number; max?: number; m3: number; vehiculo: string; personas: number; horas: number; dias: number; km: number; sin_precio: boolean; especiales: string[] };

const PASOS = ["Qué mudas", "Fotos", "Direcciones", "Camión", "Detalles", "Tus datos"];
const MAX_FOTOS = 8;
const MSG_IA = ["Mirando tus fotos…", "Reconociendo los muebles…", "Contando armarios y sofás…", "Calculando los metros cúbicos…"];
const ladoVacio = (): Lado => ({ lugar: null, piso: "bajo", ascensor: "", camion: null, puerta: false });

function Contador({ a }: { a: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t0 = performance.now(); let raf = 0;
    const f = (t: number) => { const p = Math.min(1, (t - t0) / 1200); setV(Math.round(a * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf);
  }, [a]);
  return <>{v.toLocaleString("es-ES")}</>;
}

function Stepper({ v, on, min = 0 }: { v: number; on: (n: number) => void; min?: number }) {
  return (
    <span className="stepper">
      <button type="button" onClick={() => on(Math.max(min, v - 1))} aria-label="Quitar uno">−</button>
      <b aria-live="polite">{v}</b>
      <button type="button" onClick={() => on(Math.min(60, v + 1))} aria-label="Añadir uno">+</button>
    </span>
  );
}

export default function Calculadora() {
  const t0 = useRef(Date.now());
  const [paso, setPaso] = useState(0);
  const [tipo, setTipo] = useState<"casa" | "porte" | null>(null);
  const [casa, setCasa] = useState<string | null>(null);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [ia, setIa] = useState<"" | "analizando" | "hecho" | "error">("");
  const [iaMsg, setIaMsg] = useState("");
  const [iaTick, setIaTick] = useState(0);
  const [cajasIa, setCajasIa] = useState<number | null>(null);
  const [origen, setOrigen] = useState<Lado>(ladoVacio());
  const [destino, setDestino] = useState<Lado>(ladoVacio());
  const [ruta, setRuta] = useState<{ km: number; coords: [number, number][] | null; aprox: boolean } | null>(null);
  const [ladoCamion, setLadoCamion] = useState<"origen" | "destino">("origen");
  const [desmontaje, setDesmontaje] = useState("nose");
  const [embalaje, setEmbalaje] = useState("yo");
  const [especiales, setEspeciales] = useState<string[]>([]);
  const [cuando, setCuando] = useState<"fecha" | "pronto" | "nosabe">("nosabe");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");
  const [c, setC] = useState({ nombre: "", telefono: "", email: "", web: "" });
  const [acepto, setAcepto] = useState(false);
  const [err, setErr] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [estudio, setEstudio] = useState<Estudio | null>(null);
  const top = useRef<HTMLDivElement>(null);

  const m3 = useMemo(() => volumen(items, tipo || "casa", casa), [items, tipo, casa]);
  const irA = (n: number) => {
    setErr(""); setPaso(n);
    setTimeout(() => { const y = (top.current?.getBoundingClientRect().top || 0) + window.scrollY - 84; window.scrollTo({ top: y, behavior: "smooth" }); }, 40);
  };

  // Mensajes mientras la IA mira las fotos
  useEffect(() => {
    if (ia !== "analizando") return;
    const t = setInterval(() => setIaTick((x) => x + 1), 1600);
    return () => clearInterval(t);
  }, [ia]);

  // Ruta por carretera entre las dos direcciones (OSRM, gratis)
  useEffect(() => {
    const a = origen.lugar, b = destino.lugar;
    if (!a || !b) { setRuta(null); return; }
    let vivo = true;
    const recta = metros(a, b) / 1000 * 1.3;
    setRuta({ km: Math.round(recta), coords: null, aprox: true });
    fetch(`https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=simplified&geometries=geojson`)
      .then((r) => r.json())
      .then((d) => {
        if (!vivo || !d.routes?.[0]) return;
        const rt = d.routes[0];
        setRuta({ km: Math.round(rt.distance / 100) / 10, coords: rt.geometry.coordinates.map((x: number[]) => [x[1], x[0]]), aprox: false });
      })
      .catch(() => {});
    return () => { vivo = false; };
  }, [origen.lugar?.lat, origen.lugar?.lng, destino.lugar?.lat, destino.lugar?.lng]);

  async function anadirFotos(files: FileList | null) {
    if (!files) return;
    const libres = MAX_FOTOS - fotos.length;
    const lista = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, Math.max(0, libres));
    if (Array.from(files).length > libres) setIaMsg(`Máximo ${MAX_FOTOS} fotos: hemos cogido las primeras.`);
    const nuevas: Foto[] = [];
    for (const f of lista) {
      try {
        const [full, small] = await Promise.all([comprimir(f, 1600), comprimir(f, 1024, 0.78)]);
        nuevas.push({ id: uid(), full, small });
      } catch {
        setIaMsg("Alguna foto no se ha podido abrir (prueba con JPG o PNG).");
      }
    }
    setFotos((x) => [...x, ...nuevas]);
    if (nuevas.length) setIa("");
  }

  async function analizar() {
    if (!fotos.length) return;
    setIa("analizando"); setIaMsg(""); setIaTick(0);
    const r = await api<{ items?: { nombre: string; categoria: string; cantidad: number }[]; cajas?: number | null; especiales?: string[]; fallback?: boolean }>(
      "fotos", { fotos: fotos.map((f) => f.small), tipo });
    if (!r.ok || !r.items) {
      setIa("error");
      setIaMsg(r.error || "No hemos podido analizar las fotos. Añade tus muebles a mano aquí abajo.");
      return;
    }
    const deIa = r.items.map((it) => ({ id: uid(), nombre: it.nombre, categoria: it.categoria, cantidad: it.cantidad, ia: true }));
    setItems((prev) => [...deIa, ...prev.filter((x) => !x.ia)]);
    setCajasIa(r.cajas ?? null);
    if (r.especiales?.length) setEspeciales((e) => Array.from(new Set([...e, ...r.especiales!])));
    setIa("hecho");
    setIaMsg(deIa.length ? `La IA ha encontrado ${deIa.length} tipos de objetos. Revisa la lista y corrige lo que haga falta.` : "No hemos visto muebles claros en las fotos. Añádelos a mano.");
  }

  const cambiar = (id: string, n: number) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, cantidad: n } : x)).filter((x) => x.cantidad > 0));
  const sumar = (cat: string, d: number) => setItems((xs) => {
    const i = xs.findIndex((x) => x.categoria === cat && !x.ia) >= 0 ? xs.findIndex((x) => x.categoria === cat && !x.ia) : xs.findIndex((x) => x.categoria === cat);
    if (i < 0) return d > 0 ? [...xs, { id: uid(), nombre: CATS[cat].nombre, categoria: cat, cantidad: d }] : xs;
    return xs.map((x, j) => (j === i ? { ...x, cantidad: Math.max(0, x.cantidad + d) } : x)).filter((x) => x.cantidad > 0);
  });
  const cuantos = (cat: string) => items.filter((x) => x.categoria === cat).reduce((a, x) => a + x.cantidad, 0);

  const L = ladoCamion === "origen" ? origen : destino;
  const setL = ladoCamion === "origen" ? setOrigen : setDestino;
  const distCamion = (l: Lado) => (l.puerta ? 0 : l.camion && l.lugar ? Math.round(metros(l.lugar, l.camion)) : null);

  function puedeSeguir(): string {
    if (paso === 0 && !tipo) return "Elige si es una casa completa o unas cosas.";
    if (paso === 0 && tipo === "casa" && !casa) return "Dinos el tamaño de la vivienda.";
    if (paso === 1 && tipo === "porte" && !items.length) return "Añade al menos una cosa que haya que llevar.";
    if (paso === 1 && ia === "analizando") return "Espera a que la IA termine de mirar las fotos.";
    if (paso === 2 && (!origen.lugar || !destino.lugar)) return "Busca y elige las dos direcciones (o toca en el mapa).";
    if (paso === 5) {
      if (c.nombre.trim().length < 2) return "Pon tu nombre.";
      if (c.telefono.replace(/\D/g, "").length < 9) return "Pon un teléfono (te mandamos el presupuesto por WhatsApp).";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(c.email.trim())) return "Pon un email válido para enviarte el estudio.";
      if (!acepto) return "Marca la casilla de privacidad.";
    }
    return "";
  }

  function siguiente() {
    const e = puedeSeguir();
    if (e) { setErr(e); return; }
    if (paso === 5) { enviar(); return; }
    irA(paso + 1);
  }

  async function enviar() {
    setEnviando(true); setErr("");
    const lado = (l: Lado) => ({
      calle: l.lugar?.calle, poblacion: l.lugar?.poblacion, lat: l.lugar?.lat, lng: l.lugar?.lng,
      piso: l.piso, ascensor: l.ascensor, camion_m: distCamion(l),
    });
    const r = await api<{ estudio?: Estudio }>("estimar", {
      ...c, consentimiento: acepto, t: Date.now() - t0.current, tipo, casa: tipo === "casa" ? casa : null,
      items: items.map(({ nombre, categoria, cantidad }) => ({ nombre, categoria, cantidad })),
      origen: lado(origen), destino: lado(destino), desmontaje, embalaje, especiales,
      cuando: cuando === "fecha" ? "" : cuando, fecha: cuando === "fecha" ? fecha : "",
      comentario: [comentario, cajasIa ? `La IA vio ${cajasIa} cajas ya hechas en las fotos.` : ""].filter(Boolean).join("\n"),
      fotos: fotos.map((f) => f.full),
    });
    setEnviando(false);
    if (!r.ok || !r.estudio) { setErr(r.error || "No se ha podido calcular. Escríbenos por WhatsApp."); return; }
    setEstudio(r.estudio);
    irA(6);
  }

  // ── Resultado ──
  if (paso === 6 && estudio) {
    const nombre = c.nombre.trim().split(" ")[0];
    const texto = estudio.sin_precio
      ? `Hola, soy ${c.nombre.trim()}. He hecho el estudio de mi mudanza en la web (${origen.lugar?.poblacion} → ${destino.lugar?.poblacion}). ¿Me preparáis el presupuesto?`
      : `Hola, soy ${c.nombre.trim()}. He hecho el estudio de mi mudanza en la web: me sale entre ${estudio.min} € y ${estudio.max} € (${origen.lugar?.poblacion} → ${destino.lugar?.poblacion}). ¿Me confirmáis el presupuesto?`;
    return (
      <div className="calc" ref={top}>
        <div className="calc-result card">
          <span className="kicker">Tu estudio de mudanza</span>
          {estudio.sin_precio ? (
            <>
              <h2 className="h2" style={{ margin: "14px 0 10px" }}>{nombre}, este lo calculamos <em>a mano.</em></h2>
              <p className="lead">Por la distancia ({estudio.km} km en total) preferimos prepararte el precio personalmente. Ya tenemos tus datos y tus fotos: te escribimos por WhatsApp.</p>
            </>
          ) : (
            <>
              <p className="muted" style={{ marginTop: 14 }}>{nombre}, tu mudanza saldría entre</p>
              <div className="precio"><span><Contador a={estudio.min!} /> €</span><i>y</i><span><Contador a={estudio.max!} /> €</span></div>
              <p className="muted small">Precio orientativo, sin compromiso. El precio final te lo confirmamos por WhatsApp después de revisar tus fotos.</p>
            </>
          )}
          <dl className="resumen">
            <div><dt>Volumen</dt><dd>≈ {estudio.m3.toLocaleString("es-ES")} m³</dd></div>
            <div><dt>Vehículo</dt><dd>{estudio.vehiculo}</dd></div>
            <div><dt>Equipo</dt><dd>{estudio.personas} personas</dd></div>
            <div><dt>Tiempo</dt><dd>≈ {estudio.horas.toLocaleString("es-ES")} h{estudio.dias > 1 ? ` (${estudio.dias} días)` : ""}</dd></div>
            <div><dt>Recorrido</dt><dd>{estudio.km} km</dd></div>
            <div><dt>Ruta</dt><dd>{origen.lugar?.poblacion || "Origen"} → {destino.lugar?.poblacion || "Destino"}</dd></div>
          </dl>
          {estudio.especiales.length > 0 && <p className="aviso">⚠️ {estudio.especiales.join(", ")}: lo presupuestamos aparte cuando veamos las fotos.</p>}
          <div className="calc-actions">
            <a className="btn btn-wa" href={wa(texto)} target="_blank" rel="noopener noreferrer"><IWhatsApp />Confirmar por WhatsApp</a>
            <Link href="/" className="btn btn-ghost">Volver al inicio</Link>
          </div>
          <p className="legal-note">Estimación orientativa calculada automáticamente con nuestras tarifas a partir de tus fotos y datos. No es un presupuesto cerrado: puede variar si el volumen o los accesos son distintos. Hemos guardado tu solicitud y te contactamos en breve.</p>
        </div>
      </div>
    );
  }

  const progreso = (paso / PASOS.length) * 100;

  return (
    <div className="calc" ref={top}>
      <div className="calc-top">
        <ol className="calc-steps" aria-label="Pasos">
          {PASOS.map((p, i) => (
            <li key={p} className={i === paso ? "on" : i < paso ? "ok" : ""}>
              <button type="button" disabled={i > paso} onClick={() => i < paso && irA(i)}><span>{i < paso ? "✓" : i + 1}</span><em>{p}</em></button>
            </li>
          ))}
        </ol>
        <div className="calc-bar"><i style={{ width: `${progreso}%` }} /></div>
      </div>

      <div className="calc-body card">
        {/* 0 · Qué mudas */}
        {paso === 0 && (
          <section>
            <h2 className="h3">¿Qué te mudas?</h2>
            <div className="opciones">
              <button type="button" className={`opcion${tipo === "casa" ? " on" : ""}`} onClick={() => setTipo("casa")} aria-pressed={tipo === "casa"}>
                <span className="opcion-ico">🏠</span><b>Una casa completa</b><small>Piso, casa o chalet</small>
              </button>
              <button type="button" className={`opcion${tipo === "porte" ? " on" : ""}`} onClick={() => setTipo("porte")} aria-pressed={tipo === "porte"}>
                <span className="opcion-ico">🛋</span><b>Unas cosas (porte)</b><small>Un sofá, un electrodoméstico…</small>
              </button>
            </div>
            {tipo === "casa" && (
              <div className="field" style={{ marginTop: 22 }}>
                <span className="lbl">¿De qué tamaño?</span>
                <div className="chips">{CASAS.map((x) => (
                  <button type="button" key={x.k} className={`chip${casa === x.k ? " chip-accent" : ""}`} aria-pressed={casa === x.k} onClick={() => setCasa(x.k)}>{x.t}</button>
                ))}</div>
              </div>
            )}
          </section>
        )}

        {/* 1 · Fotos e inventario */}
        {paso === 1 && (
          <section>
            <h2 className="h3">Haz fotos de lo que hay que llevar</h2>
            <p className="muted small">Una o dos fotos por habitación. La IA reconoce los muebles y hace la lista; tú la corriges.</p>
            <label className={`drop${fotos.length ? " con" : ""}`}>
              <input type="file" accept="image/*" multiple onChange={(e) => { anadirFotos(e.target.files); e.target.value = ""; }} />
              <span className="drop-ico"><ICamera /></span>
              <b>{fotos.length ? "Añadir más fotos" : "Subir o hacer fotos"}</b>
              <small>{fotos.length}/{MAX_FOTOS} fotos · JPG o PNG</small>
            </label>
            {fotos.length > 0 && (
              <div className={`thumbs${ia === "analizando" ? " scanning" : ""}`}>
                {fotos.map((f) => (
                  <div key={f.id} className="thumb">
                    <img src={f.small} alt="Foto subida" />
                    {ia !== "analizando" && <button type="button" aria-label="Quitar foto" onClick={() => setFotos((x) => x.filter((y) => y.id !== f.id))}>×</button>}
                  </div>
                ))}
              </div>
            )}
            {fotos.length > 0 && ia !== "hecho" && (
              <button type="button" className="btn btn-ink" style={{ marginTop: 14 }} onClick={analizar} disabled={ia === "analizando"}>
                <ISpark />{ia === "analizando" ? MSG_IA[iaTick % MSG_IA.length] : "Analizar mis fotos con IA"}
              </button>
            )}
            {iaMsg && <p className={ia === "error" ? "aviso" : "nota-ia"} role="status">{iaMsg}</p>}

            {items.length > 0 && (
              <div className="inventario">
                <div className="inv-head"><b>Tu lista</b><span className="m3">≈ {m3.toLocaleString("es-ES")} m³</span></div>
                <ul>
                  {items.map((it) => (
                    <li key={it.id}>
                      <span>{CATS[it.categoria]?.ico || "📦"} {it.nombre}{it.ia && <i className="tag-ia">IA</i>}</span>
                      <Stepper v={it.cantidad} on={(n) => cambiar(it.id, n)} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <details className="manual" open={!fotos.length || ia === "error"}>
              <summary>{items.length ? "Añadir o corregir a mano" : "No tengo fotos ahora: lo pongo a mano"}</summary>
              <div className="rapidos">
                {RAPIDOS.map((k) => (
                  <div key={k} className="rapido">
                    <span>{CATS[k].ico} {CATS[k].nombre}</span>
                    <Stepper v={cuantos(k)} on={(n) => sumar(k, n - cuantos(k))} />
                  </div>
                ))}
              </div>
              {tipo === "casa" && <p className="muted small" style={{ marginTop: 10 }}>Si no pones nada, calculamos con el tamaño de la vivienda.</p>}
            </details>
          </section>
        )}

        {/* 2 · Direcciones y ruta */}
        {paso === 2 && (
          <section>
            <h2 className="h3">¿De dónde a dónde?</h2>
            <div className="form-grid two" style={{ marginTop: 14 }}>
              {([["origen", "Recogida (carga)", origen, setOrigen], ["destino", "Entrega (descarga)", destino, setDestino]] as const).map(([k, t, l, set]) => (
                <div key={k} className="lado">
                  <div className="field">
                    <label htmlFor={`dir-${k}`}><span className={`badge-ab ${k}`}>{k === "origen" ? "A" : "B"}</span> {t}</label>
                    <Buscador id={`dir-${k}`} valor={l.lugar} placeholder="Calle y número, población" onElegir={(lg) => set({ ...l, lugar: lg, camion: null, puerta: false })} />
                  </div>
                  <div className="mini-grid">
                    <div className="field"><label htmlFor={`piso-${k}`}>Piso</label>
                      <select id={`piso-${k}`} className="select" value={l.piso} onChange={(e) => set({ ...l, piso: e.target.value })}>
                        {PISOS.map((p) => (<option key={p.k} value={p.k}>{p.t}</option>))}
                      </select></div>
                    <div className="field"><span className="lbl">Ascensor</span>
                      <div className="seg">{(["si", "no"] as const).map((v) => (
                        <button type="button" key={v} className={l.ascensor === v ? "on" : ""} aria-pressed={l.ascensor === v} onClick={() => set({ ...l, ascensor: v })}>{v === "si" ? "Sí" : "No"}</button>
                      ))}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <Mapa modo="ruta" origen={origen.lugar} destino={destino.lugar} ruta={ruta?.coords}
              onClick={(p) => {
                const lg = { label: "Punto marcado en el mapa", calle: "Punto marcado en el mapa", poblacion: "", ...p };
                if (!origen.lugar) setOrigen({ ...origen, lugar: lg }); else if (!destino.lugar) setDestino({ ...destino, lugar: lg });
              }} />
            <p className="map-info">{ruta ? <>🛣 <b>{ruta.km.toLocaleString("es-ES")} km</b> entre las dos direcciones{ruta.aprox ? " (aprox.)" : " por carretera"}</> : "Busca las direcciones o toca en el mapa para marcarlas."}</p>
          </section>
        )}

        {/* 3 · Dónde para el camión */}
        {paso === 3 && origen.lugar && destino.lugar && (
          <section>
            <h2 className="h3">¿Dónde puede parar el camión?</h2>
            <p className="muted small">Arrastra el camión (o toca en el mapa) hasta donde se pueda aparcar para cargar. Si hace falta, mueve también la casita hasta tu portal.</p>
            <div className="seg seg-wide" style={{ margin: "14px 0" }}>
              {(["origen", "destino"] as const).map((k) => (
                <button type="button" key={k} className={ladoCamion === k ? "on" : ""} onClick={() => setLadoCamion(k)}>
                  {k === "origen" ? "A · Recogida" : "B · Entrega"}{distCamion(k === "origen" ? origen : destino) !== null ? " ✓" : ""}
                </button>
              ))}
            </div>
            <Mapa key={ladoCamion} modo="camion" portal={L.lugar!} camion={L.puerta ? L.lugar : L.camion}
              onCamion={(p) => setL({ ...L, camion: { lat: p.lat, lng: p.lng }, puerta: false })}
              onPortal={(p) => setL({ ...L, lugar: { ...L.lugar!, lat: p.lat, lng: p.lng } })} />
            <div className="camion-info">
              <div className="dist">
                {distCamion(L) === null ? <span className="muted">Mueve el camión para medir</span> :
                  <><b>{distCamion(L)} m</b><span>del camión al portal</span></>}
              </div>
              <button type="button" className={`chip${L.puerta ? " chip-accent" : ""}`} onClick={() => setL({ ...L, puerta: !L.puerta })}>{L.puerta ? "✓ " : ""}Puede parar en la puerta</button>
            </div>
            {ladoCamion === "origen" && <button type="button" className="btn btn-ghost" onClick={() => setLadoCamion("destino")}>Ahora la entrega<IArrow className="arrow" /></button>}
          </section>
        )}

        {/* 4 · Detalles */}
        {paso === 4 && (
          <section className="form-grid">
            <h2 className="h3">Unos detalles más</h2>
            <div className="field"><span className="lbl">Desmontar y montar muebles (armarios, canapés, camas…)</span>
              <div className="chips">{[["si", "Sí, desmontar y montar"], ["desmontar", "Solo desmontar"], ["no", "No hace falta"], ["nose", "No lo sé"]].map(([k, t]) => (
                <button type="button" key={k} className={`chip${desmontaje === k ? " chip-accent" : ""}`} aria-pressed={desmontaje === k} onClick={() => setDesmontaje(k)}>{t}</button>
              ))}</div></div>
            <div className="field"><span className="lbl">Embalaje</span>
              <div className="chips">{[["yo", "Lo embalo yo"], ["fragil", "Vosotros solo lo frágil"], ["todo", "Vosotros todo"]].map(([k, t]) => (
                <button type="button" key={k} className={`chip${embalaje === k ? " chip-accent" : ""}`} aria-pressed={embalaje === k} onClick={() => setEmbalaje(k)}>{t}</button>
              ))}</div></div>
            <div className="field"><span className="lbl">¿Hay algo especial?</span>
              <div className="chips">{ESPECIALES.map((x) => {
                const on = especiales.includes(x.k);
                return <button type="button" key={x.k} className={`chip${on ? " chip-accent" : ""}`} aria-pressed={on} onClick={() => setEspeciales(on ? especiales.filter((y) => y !== x.k) : [...especiales, x.k])}>{on ? "✓ " : ""}{x.t}</button>;
              })}</div></div>
            <div className="field"><span className="lbl">¿Cuándo?</span>
              <div className="chips">{[["pronto", "Lo antes posible"], ["fecha", "Tengo fecha"], ["nosabe", "Aún no lo sé"]].map(([k, t]) => (
                <button type="button" key={k} className={`chip${cuando === k ? " chip-accent" : ""}`} aria-pressed={cuando === k} onClick={() => setCuando(k as typeof cuando)}>{t}</button>
              ))}</div>
              {cuando === "fecha" && <input type="date" className="input" style={{ maxWidth: 260, marginTop: 8 }} value={fecha} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setFecha(e.target.value)} />}
            </div>
            <div className="field"><label htmlFor="cm">¿Algo más que debamos saber? <span className="muted">(opcional)</span></label>
              <textarea id="cm" className="textarea" value={comentario} onChange={(e) => setComentario(e.target.value)} maxLength={1200} placeholder="Calle estrecha, ascensor pequeño, hay que dejar algo en un trastero…" /></div>
          </section>
        )}

        {/* 5 · Datos */}
        {paso === 5 && (
          <section className="form-grid">
            <div>
              <h2 className="h3">¿A quién le mandamos el estudio?</h2>
              <p className="muted small">Te enseñamos el precio orientativo al momento y te lo confirmamos por WhatsApp.</p>
            </div>
            <div className="field"><label htmlFor="n">Nombre</label><input id="n" className="input" autoComplete="name" value={c.nombre} onChange={(e) => setC({ ...c, nombre: e.target.value })} /></div>
            <div className="form-grid two">
              <div className="field"><label htmlFor="t">Teléfono / WhatsApp</label><input id="t" className="input" inputMode="tel" autoComplete="tel" placeholder="6XX XXX XXX" value={c.telefono} onChange={(e) => setC({ ...c, telefono: e.target.value })} /></div>
              <div className="field"><label htmlFor="e">Email</label><input id="e" className="input" type="email" autoComplete="email" value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} /></div>
            </div>
            <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={c.web} onChange={(e) => setC({ ...c, web: e.target.value })} />
            <label className="check"><input type="checkbox" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} />
              <span>Acepto que Mudanzas del Sur guarde estos datos y mis fotos para prepararme el presupuesto y contactarme. Las fotos las analiza la IA de Google solo para hacer la lista de muebles. <Link href="/privacidad/" target="_blank">Privacidad</Link>.</span></label>
          </section>
        )}

        {err && <p className="form-error" role="alert" style={{ marginTop: 16 }}>{err}</p>}

        <div className="calc-nav">
          {paso > 0 && <button type="button" className="btn btn-ghost" onClick={() => irA(paso - 1)}>Atrás</button>}
          <div className="calc-live">{tipo && paso > 0 && <span>≈ <b>{m3.toLocaleString("es-ES")} m³</b>{ruta ? <> · <b>{Math.round(ruta.km)} km</b></> : null}</span>}</div>
          <button type="button" className="btn btn-accent" onClick={siguiente} disabled={enviando || ia === "analizando"}>
            {paso === 5 ? (enviando ? "Calculando…" : <>Ver mi estudio<ISpark /></>) : paso === 1 && !items.length && !fotos.length && tipo === "casa" ? <>Seguir sin fotos<IArrow className="arrow" /></> : <>Siguiente<IArrow className="arrow" /></>}
          </button>
        </div>
      </div>
      <p className="calc-foot muted small">¿Prefieres hablar? <a href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp {TEL}</a> · Estimación orientativa, sin compromiso.</p>
    </div>
  );
}
