"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api, TEL, wa } from "@/lib/site";
import { ISend, ISur, IWhatsApp } from "./Icons";

type Msg = { role: "user" | "model"; text: string };

const SALUDO = "¡Hola! Soy Sur, el asistente de Mudanzas del Sur. Pregúntame lo que quieras sobre tu mudanza: embalaje, desmontaje, plazos, zonas… Y si quieres precio, te llevo a la calculadora.";
const SUGERENCIAS = ["¿Cómo se calcula el precio?", "¿Desmontáis y montáis muebles?", "¿Cómo embalo la vajilla?", "¿Trabajáis fuera de Huelva?"];

/** Enlaza la calculadora, el teléfono y las webs sin usar HTML del servidor. */
function Texto({ t }: { t: string }) {
  const partes = t.split(/(\/calculadora\/?|659 ?71 ?52 ?71|https?:\/\/[^\s)]+)/g);
  return (
    <>
      {partes.map((p, i) => {
        if (/^\/calculadora\/?$/.test(p)) return <Link key={i} href="/calculadora/">la calculadora</Link>;
        if (/^659 ?71 ?52 ?71$/.test(p)) return <a key={i} href={wa()} target="_blank" rel="noopener noreferrer">{TEL}</a>;
        if (/^https?:\/\//.test(p)) return <a key={i} href={p} target="_blank" rel="noopener noreferrer">{p}</a>;
        return <React.Fragment key={i}>{p.replace(/\*\*/g, "")}</React.Fragment>;
      })}
    </>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "model", text: SALUDO }]);
  const [txt, setTxt] = useState("");
  const [busy, setBusy] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const enCalc = (usePathname() || "").startsWith("/calculadora");

  useEffect(() => { body.current?.scrollTo({ top: body.current.scrollHeight, behavior: "smooth" }); }, [msgs, busy]);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => input.current?.focus(), 250);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { clearTimeout(t); window.removeEventListener("keydown", esc); };
  }, [open]);
  useEffect(() => {
    const abrir = () => setOpen(true);
    window.addEventListener("abrir-chat", abrir);
    return () => window.removeEventListener("abrir-chat", abrir);
  }, []);

  async function enviar(texto: string) {
    const q = texto.trim();
    if (!q || busy) return;
    const historia = msgs.slice(1).slice(-8);
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setTxt("");
    setBusy(true);
    const r = await api<{ reply?: string }>("chat", { message: q, history: historia });
    setBusy(false);
    setMsgs((m) => [...m, { role: "model", text: r.reply || r.error || `Ahora mismo no puedo responder. Escríbenos por WhatsApp al ${TEL}.` }]);
  }

  return (
    <>
      {!open && (
        <div className={`fab-stack${enCalc ? " en-calc" : ""}`}>
          <a className="fab fab-wa" href={wa()} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"><IWhatsApp /></a>
          <button className="fab fab-chat" onClick={() => setOpen(true)} aria-label="Abrir el asistente">
            <span className="face"><ISur /></span><span className="txt">¿Dudas? Pregúntale a Sur</span>
          </button>
        </div>
      )}
      {open && (
        <section className="chat-panel" role="dialog" aria-label="Asistente de Mudanzas del Sur">
          <div className="chat-head">
            <span className="face"><ISur /></span>
            <div><b>Sur</b><small><i />Asistente con IA · responde al momento</small></div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Cerrar">×</button>
          </div>
          <div className="chat-body" ref={body} aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`msg ${m.role === "user" ? "me" : "bot"}`}><Texto t={m.text} /></div>
            ))}
            {busy && <div className="msg bot typing" aria-label="Escribiendo"><i /><i /><i /></div>}
          </div>
          {msgs.length <= 1 && (
            <div className="chat-sugs">
              {SUGERENCIAS.map((s) => (<button key={s} onClick={() => enviar(s)}>{s}</button>))}
            </div>
          )}
          <div className="chat-cta">
            <Link href="/calculadora/" className="btn btn-accent" onClick={() => setOpen(false)}>Calcular mi mudanza</Link>
            <a href={wa()} className="btn btn-wa" target="_blank" rel="noopener noreferrer"><IWhatsApp />WhatsApp</a>
          </div>
          <form className="chat-form" onSubmit={(e) => { e.preventDefault(); enviar(txt); }}>
            <input ref={input} name="pregunta" autoComplete="off" value={txt} onChange={(e) => setTxt(e.target.value)} maxLength={600}
              placeholder="Escribe tu pregunta…" aria-label="Tu pregunta" />
            <button type="submit" aria-label="Enviar" disabled={busy}><ISend /></button>
          </form>
          <p className="chat-note">Asistente con IA: puede equivocarse. No compartas datos personales en el chat.</p>
        </section>
      )}
    </>
  );
}
