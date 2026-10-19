"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/site";
import { ISend } from "./Icons";

const SERV = [
  { k: "mudanza", t: "Mudanza completa" }, { k: "porte", t: "Porte" },
  { k: "montaje", t: "Desmontaje y montaje" }, { k: "embalaje", t: "Embalaje" },
];

export default function ContactForm() {
  const t0 = useRef(Date.now());
  const [f, setF] = useState({ nombre: "", telefono: "", email: "", ruta: "", mensaje: "", web: "" });
  const [serv, setServ] = useState<string[]>([]);
  const [ok, setOk] = useState(false);
  const [acepto, setAcepto] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!acepto) { setErr("Marca la casilla de privacidad para poder contestarte."); return; }
    setBusy(true); setErr("");
    const r = await api("contacto", { ...f, servicios: serv, t: Date.now() - t0.current });
    setBusy(false);
    if (r.ok) setOk(true); else setErr(r.error || "No se ha podido enviar.");
  }

  if (ok) return (
    <div className="card form-ok" role="status">
      <svg className="tick" viewBox="0 0 52 52" fill="none" strokeWidth="2.5" strokeLinecap="round"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-15" /></svg>
      <h3 className="h3">¡Recibido, {f.nombre.split(" ")[0] || "gracias"}!</h3>
      <p className="muted">Te escribimos por WhatsApp en cuanto lo veamos. Si nos mandas fotos de lo que hay que llevar, te damos el precio antes.</p>
    </div>
  );

  return (
    <form className="card form-grid" onSubmit={enviar} noValidate>
      <div>
        <h3 className="h3">Cuéntanos tu mudanza</h3>
        <p className="muted small" style={{ marginTop: 6 }}>Te contestamos por WhatsApp. Gratis y sin compromiso.</p>
      </div>
      <div className="form-grid two">
        <div className="field"><label htmlFor="c-nombre">Nombre</label><input id="c-nombre" className="input" required value={f.nombre} onChange={set("nombre")} autoComplete="name" /></div>
        <div className="field"><label htmlFor="c-tel">Teléfono / WhatsApp</label><input id="c-tel" className="input" required inputMode="tel" value={f.telefono} onChange={set("telefono")} autoComplete="tel" placeholder="6XX XXX XXX" /></div>
      </div>
      <div className="form-grid two">
        <div className="field"><label htmlFor="c-email">Email <span className="muted">(opcional)</span></label><input id="c-email" className="input" type="email" value={f.email} onChange={set("email")} autoComplete="email" /></div>
        <div className="field"><label htmlFor="c-ruta">De dónde a dónde</label><input id="c-ruta" className="input" value={f.ruta} onChange={set("ruta")} placeholder="Ej.: Huelva → Aljaraque" /></div>
      </div>
      <div className="field">
        <span className="lbl">¿Qué necesitas?</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SERV.map((s) => {
            const on = serv.includes(s.k);
            return (
              <button type="button" key={s.k} className={`chip${on ? " chip-accent" : ""}`} aria-pressed={on}
                onClick={() => setServ(on ? serv.filter((x) => x !== s.k) : [...serv, s.k])}>{on ? "✓ " : ""}{s.t}</button>
            );
          })}
        </div>
      </div>
      <div className="field"><label htmlFor="c-msg">Mensaje</label><textarea id="c-msg" className="textarea" value={f.mensaje} onChange={set("mensaje")} placeholder="Piso, ascensor, muebles grandes, fecha que te viene bien…" /></div>
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.web} onChange={set("web")} name="web" />
      <label className="check"><input type="checkbox" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} />
        <span>Acepto que Mudanzas del Sur use estos datos para contestarme y preparar mi presupuesto (<Link href="/privacidad/">privacidad</Link>).</span></label>
      {err && <p className="form-error" role="alert">{err}</p>}
      <button className="btn btn-accent" disabled={busy}>{busy ? "Enviando…" : <>Enviar <ISend /></>}</button>
    </form>
  );
}
