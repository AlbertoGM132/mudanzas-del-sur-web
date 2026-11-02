"use client";

// Aviso de cookies: aceptar o rechazar con el mismo esfuerzo. Hasta que se acepta no se carga nada de Google.
import { useEffect, useState } from "react";
import Link from "next/link";
import { cargar, eleccion, guardarEleccion, EVENTO_COOKIES, type Eleccion } from "@/lib/googleAds";
import { ev } from "@/lib/analitica";

export default function AvisoCookies() {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (eleccion() === null) setAbierto(true);
    else cargar();
    const reabrir = () => setAbierto(true);
    window.addEventListener(EVENTO_COOKIES, reabrir);
    return () => window.removeEventListener(EVENTO_COOKIES, reabrir);
  }, []);

  if (!abierto) return null;

  const elegir = (v: Eleccion) => {
    guardarEleccion(v);
    ev("cookies", { eleccion: v });
    setAbierto(false);
  };

  return (
    <div className="aviso-cookies" role="dialog" aria-modal="false" aria-labelledby="aviso-cookies-t">
      <p id="aviso-cookies-t">
        Usamos cookies de Google Ads solo para saber qué anuncios nos traen clientes. Nada más.{" "}
        <Link href="/privacidad/#cookies">Más información</Link>
      </p>
      <div className="aviso-cookies-botones">
        <button type="button" className="btn btn-ghost" onClick={() => elegir("no")}>Rechazar</button>
        <button type="button" className="btn btn-accent" onClick={() => elegir("si")}>Aceptar</button>
      </div>
    </div>
  );
}

/** Enlace del pie para cambiar la elección. */
export function CambiarCookies() {
  return (
    <button type="button" className="link-cookies" onClick={() => window.dispatchEvent(new Event(EVENTO_COOKIES))}>
      Cookies
    </button>
  );
}
