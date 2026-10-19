import React from "react";
import Link from "next/link";
import { EMAIL, INSTAGRAM, TEL, TEL_HREF, wa } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img src="/assets/img/logo-claro.webp" alt="Mudanzas del Sur" width={150} height={72} style={{ height: 64, width: "auto" }} />
            <p style={{ marginTop: 18, color: "rgba(243,234,219,.7)", maxWidth: "26em" }}>
              Mudanzas y portes en Huelva, Sevilla y toda Andalucía. Los dos socios, Alberto y Cristian, van en persona a cada trabajo.
            </p>
          </div>
          <div>
            <h4>Servicios</h4>
            <ul>
              <li><Link href="/servicios/">Mudanzas completas</Link></li>
              <li><Link href="/servicios/">Portes</Link></li>
              <li><Link href="/servicios/">Desmontaje y montaje</Link></li>
              <li><Link href="/servicios/">Embalaje</Link></li>
            </ul>
          </div>
          <div>
            <h4>Herramientas</h4>
            <ul>
              <li><Link href="/calculadora/">Calculadora con IA</Link></li>
              <li><Link href="/blog/">Consejos de mudanza</Link></li>
              <li><Link href="/#preguntas">Preguntas frecuentes</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href={TEL_HREF}>{TEL}</a></li>
              <li><a href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram @mudanzasdelsur_</a></li>
            </ul>
          </div>
        </div>
        <p className="footer-big" aria-hidden="true">Cambia de casa, <em>no de humor.</em></p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mudanzas del Sur · Huelva</span>
          <span style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link href="/privacidad/">Privacidad</Link>
            <Link href="/privacidad/#aviso-legal">Aviso legal</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
