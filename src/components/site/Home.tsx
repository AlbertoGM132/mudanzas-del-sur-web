import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import { EMAIL, PUEBLOS, RESENAS_URL, TEL, TEL_HREF, wa } from "@/lib/site";
import { IArrow, ICamera, IClock, IEuro, IMail, IPhone, IPin, IShield, ISpark, ITools, ITruck, IWhatsApp } from "./Icons";

export const FAQS: { q: string; a: React.ReactNode; texto: string }[] = [
  {
    q: "¿Cómo calculáis el precio de una mudanza?",
    texto: "Depende sobre todo del volumen (cuántas cosas hay), de los kilómetros, de los pisos sin ascensor, de si el camión puede parar cerca del portal, del desmontaje y montaje de muebles y de si embalamos nosotros. Con la calculadora de la web tienes un precio orientativo al momento y te confirmamos el precio final por WhatsApp.",
    a: <>Depende sobre todo del <b>volumen</b> (cuántas cosas hay), de los <b>kilómetros</b>, de los <b>pisos sin ascensor</b>, de si el camión puede parar cerca del portal, del <b>desmontaje y montaje</b> y de si embalamos nosotros. Con la <Link href="/calculadora/">calculadora</Link> tienes un precio orientativo al momento y te confirmamos el precio final por WhatsApp.</>,
  },
  {
    q: "¿El presupuesto es gratis? ¿Puede cambiar el precio?",
    texto: "Sí, es gratis y sin compromiso. El precio que te confirmamos es el que pagas; solo cambiaría si el día de la mudanza hay bastante más volumen o los accesos son distintos de lo que nos contaste.",
    a: <>Sí, es gratis y sin compromiso. El precio que te confirmamos es el que pagas: solo cambiaría si el día de la mudanza hay bastante más volumen o los accesos son distintos de lo que nos contaste. Por eso pedimos fotos.</>,
  },
  {
    q: "¿Desmontáis y montáis los muebles?",
    texto: "Sí: armarios, canapés, camas, mesas y lo que haga falta. Lo desmontamos en tu casa, lo protegemos y lo volvemos a montar en la nueva.",
    a: <>Sí: armarios, canapés, camas, mesas y lo que haga falta. Lo desmontamos en tu casa, lo protegemos con mantas y film y lo volvemos a montar en la nueva.</>,
  },
  {
    q: "¿Embaláis vosotros las cajas?",
    texto: "Como prefieras: lo embalamos todo nosotros, solo lo frágil (vajilla, cristalería, cuadros) o lo embalas tú y nosotros lo transportamos. Llevamos cajas, film y material de protección.",
    a: <>Como prefieras: lo embalamos <b>todo</b> nosotros, solo lo <b>frágil</b> (vajilla, cristalería, cuadros) o lo embalas tú y nosotros lo transportamos. Llevamos cajas, film y material de protección.</>,
  },
  {
    q: "¿Con cuánta antelación tengo que reservar?",
    texto: "Lo ideal es de 1 a 3 semanas antes. Los fines de mes y el verano se llenan antes. Si es urgente, escríbenos por WhatsApp y miramos huecos.",
    a: <>Lo ideal es de 1 a 3 semanas antes; los fines de mes y el verano se llenan antes. Si es urgente, <a href={wa("Hola, tengo una mudanza urgente.")} target="_blank" rel="noopener noreferrer">escríbenos por WhatsApp</a> y miramos huecos.</>,
  },
  {
    q: "¿Trabajáis fuera de Huelva?",
    texto: "Sí. Trabajamos en Huelva capital y toda la provincia, en Sevilla y el resto de Andalucía, y hacemos mudanzas a cualquier punto de la península.",
    a: <>Sí. Huelva capital y toda la provincia, Sevilla y el resto de Andalucía, y mudanzas a cualquier punto de la península. Para trayectos muy largos el precio lo calculamos personalmente.</>,
  },
  {
    q: "¿Hacéis portes de una sola cosa?",
    texto: "Sí: un sofá, un electrodoméstico, recoger una compra o unas pocas cosas. En la calculadora elige 'Unas cosas (porte)'.",
    a: <>Sí: un sofá, un electrodoméstico, recoger una compra o unas pocas cosas. En la calculadora elige «Unas cosas (porte)».</>,
  },
  {
    q: "¿Qué pasa con mis fotos y mis datos de la calculadora?",
    texto: "Las fotos las analiza la IA de Google solo para hacer la lista de muebles. Tus datos y tu estudio nos llegan a nosotros para preparar tu presupuesto; no los vendemos ni los compartimos.",
    a: <>Las fotos las analiza la IA de Google solo para hacer la lista de muebles. Tus datos y tu estudio nos llegan a nosotros para preparar tu presupuesto; no los vendemos ni los compartimos. Más detalle en <Link href="/privacidad/">privacidad</Link>.</>,
  },
];

const PILARES = [
  { ico: <IEuro />, t: "Precio cerrado", p: "El presupuesto que aceptas es el que pagas. Sin extras escondidos ni letra pequeña." },
  { ico: <IShield />, t: "Tus muebles, protegidos", p: "Mantas, film y esquineros en cada mueble antes de que salga por la puerta." },
  { ico: <ITools />, t: "Desmontamos y montamos", p: "Armarios, canapés y camas: los desmontamos y te los dejamos montados en la casa nueva." },
  { ico: <IClock />, t: "Puntuales, siempre", p: "Llegamos a la hora acordada y terminamos en el tiempo que te dijimos. Tu día de mudanza ya es bastante largo." },
];

const PASOS = [
  { t: "Haz fotos de tus cosas", p: "Sube unas fotos de cada habitación. La IA reconoce los muebles y calcula los metros cúbicos.", tag: "IA de visión" },
  { t: "Marca el camino", p: "Pon de dónde a dónde, el piso y el ascensor, y señala en el mapa dónde puede parar el camión.", tag: "Mapa interactivo" },
  { t: "Precio orientativo al momento", p: "Te enseñamos un rango con nuestras tarifas reales: vehículo, personas y horas.", tag: "Estudio personalizado" },
  { t: "Te lo confirmamos y a mudarse", p: "Revisamos tus fotos, te confirmamos el precio por WhatsApp y fijamos el día.", tag: "Trato humano" },
];

const OPINIONES = [
  { q: "Nos desmontaron los armarios y el canapé, lo protegieron todo y en la casa nueva lo dejaron montado. Ni un rasguño.", n: "Marta G.", l: "Huelva → Aljaraque" },
  { q: "Pedí precio por la web un domingo y el lunes ya tenía la confirmación por WhatsApp. Puntuales y muy cuidadosos con la vajilla.", n: "José Manuel R.", l: "Punta Umbría" },
  { q: "Un porte de un sofá y una lavadora a Sevilla. Rápidos, buen precio y con buen humor, que también se agradece.", n: "Lucía P.", l: "Huelva → Sevilla" },
];

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.texto } })),
  };

  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="chip chip-accent"><span className="dot live" />−15 % en tu primera mudanza con nosotros</span>
              <h1 className="display h1">
                <span className="line"><span>Cambia de casa,</span></span>
                <span className="line"><span><em>no de humor.</em></span></span>
              </h1>
              <p className="lead">
                Mudanzas y portes en Huelva, Sevilla y toda Andalucía. Haz unas fotos de tus muebles y nuestra calculadora con IA te da un precio orientativo en dos minutos.
              </p>
              <div className="hero-actions">
                <Link href="/calculadora/" className="btn btn-accent"><ISpark />Calcula tu mudanza<IArrow className="arrow" /></Link>
                <a href={wa()} className="btn btn-ghost" target="_blank" rel="noopener noreferrer"><IWhatsApp />{TEL}</a>
              </div>
              <div className="hero-trust">
                <span><IEuro />Presupuesto gratis</span>
                <span><IShield />Precio cerrado</span>
                <span><IWhatsApp />Respuesta rápida por WhatsApp</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="arch">
                <img src="/assets/img/hero.webp" srcSet="/assets/img/hero-1200.webp 1200w, /assets/img/hero.webp 2400w" sizes="(min-width: 980px) 560px, 92vw"
                  alt="Dos operarios sacando un sofá protegido con mantas de un edificio blanco andaluz" width={560} height={658} fetchPriority="high" />
              </div>
              <div className="float-card fc-1"><span className="ico"><ICamera /></span><span><strong>Fotos → presupuesto</strong>la IA hace la lista</span></div>
              <div className="float-card fc-2"><span className="ico"><ITruck /></span><span><strong>Camión de 20 m³</strong>y furgoneta grande</span></div>
              <div className="hero-stamp" aria-hidden="true">
                <svg viewBox="0 0 104 104"><defs><path id="circ" d="M52 52m-40 0a40 40 0 1 1 80 0a40 40 0 1 1-80 0" /></defs>
                  <text fill="#f3eadb" fontSize="9.4" letterSpacing="2.6" fontFamily="Inter, sans-serif" fontWeight="600"><textPath href="#circ">HUELVA · ANDALUCÍA · PENÍNSULA ·</textPath></text></svg>
                <b>MdS</b>
              </div>
            </div>
          </div>
        </section>

        {/* ── CINTA DE PUEBLOS ── */}
        <div className="ticker-wrap"><div className="ticker" aria-label="Zonas donde trabajamos">
          <div className="ticker-track">
            {[...PUEBLOS, ...PUEBLOS].map((p, i) => (<span key={i} aria-hidden={i >= PUEBLOS.length}>{p}</span>))}
          </div>
        </div></div>

        {/* ── VENTAJAS ── */}
        <section className="section" id="ventajas">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="kicker">Por qué nosotros</span>
              <h2 className="h2">Una mudanza bien hecha se nota <em>en los detalles.</em></h2>
              <p className="lead">Llevamos más de 500 trabajos en Huelva y alrededores. Esto es lo que no cambiamos nunca.</p>
            </div>
            <div className="pillars">
              {PILARES.map((x, i) => (
                <article className="pillar reveal" style={{ ["--d" as string]: `${i * 0.08}s` }} key={x.t}>
                  <span className="num">0{i + 1}</span>
                  <span className="ico">{x.ico}</span>
                  <h3 className="h3">{x.t}</h3>
                  <p>{x.p}</p>
                </article>
              ))}
            </div>
            <div className="stats">
              <div className="stat reveal"><b>+<span data-count="500">500</span></b><span>trabajos hechos en Huelva y alrededores</span></div>
              <div className="stat reveal" style={{ ["--d" as string]: ".08s" }}><b><span data-count="20">20</span><sup>m³</sup></b><span>de camión carrozado para hacerlo en un solo viaje</span></div>
              <div className="stat reveal" style={{ ["--d" as string]: ".16s" }}><b><span data-count="15">15</span><sup>%</sup></b><span>de descuento en tu primera mudanza con nosotros</span></div>
              <div className="stat reveal" style={{ ["--d" as string]: ".24s" }}><b><span data-count="0">0</span><sup>€</sup></b><span>cuesta pedir presupuesto, sin compromiso</span></div>
            </div>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ── */}
        <section className="section paper" id="como-funciona" data-route>
          <div className="wrap how">
            <div className="how-sticky">
              <div className="section-head reveal" style={{ marginBottom: 28 }}>
                <span className="kicker">Cómo funciona</span>
                <h2 className="h2">De tu salón a tu casa nueva, <em>en cuatro pasos.</em></h2>
              </div>
              <div className="route-card reveal" aria-hidden="true">
                <svg className="route" viewBox="0 0 400 300" fill="none">
                  <path className="route-bg" d="M30 250 C 90 250, 90 160, 160 155 S 225 82, 290 82 L 342 82" strokeWidth="10" strokeLinecap="round" strokeDasharray="2 14" />
                  <path className="route-fg" d="M30 250 C 90 250, 90 160, 160 155 S 225 82, 290 82 L 342 82" strokeWidth="4" strokeLinecap="round" />
                  <g><circle cx="30" cy="250" r="9" fill="#f3eadb" /><circle cx="30" cy="250" r="4" fill="#141a33" /></g>
                  <g transform="translate(0 18)"><path d="M370 26c-9 0-15 7-15 14 0 10 15 24 15 24s15-14 15-24c0-7-6-14-15-14z" fill="#e8590c" /><circle cx="370" cy="40" r="5" fill="#141a33" /></g>
                  <g className="route-truck" transform="translate(30 250)">
                    {/* Camión de Mudanzas del Sur (vista lateral) con el logo; las ruedas apoyan en la ruta */}
                    <g transform="translate(-41 -44) scale(1.1)">
                      <ellipse cx="38" cy="40" rx="35" ry="2.6" fill="#000" opacity=".28" />
                      <rect x="0" y="0" width="50" height="31" rx="2.5" fill="#fffdf8" stroke="#d8d0c2" strokeWidth=".6" />
                      <rect x="0" y="27" width="50" height="4" fill="#e8590c" />
                      <image href="/assets/img/logo.webp" x="3.5" y="3.5" width="43" height="21" preserveAspectRatio="xMidYMid meet" />
                      <path d="M51 9h13l8.5 9.5V31H51z" fill="#fffdf8" stroke="#d8d0c2" strokeWidth=".6" />
                      <path d="M54 11.5h8.6l6 6.8H54z" fill="#1d2547" />
                      <rect x="54" y="21" width="5" height="1.2" rx=".6" fill="#b9b2a5" />
                      <rect x="0" y="31" width="74" height="3" rx="1" fill="#2a3152" />
                      <rect x="71.5" y="24" width="2.5" height="3" rx=".8" fill="#f2b544" />
                      <g className="rueda"><circle cx="13" cy="35" r="5" fill="#141a33" stroke="#f3eadb" strokeWidth="1.2" /><path d="M13 31.6v6.8M9.6 35h6.8" stroke="#9aa0b4" strokeWidth=".9" /></g>
                      <g className="rueda"><circle cx="60" cy="35" r="5" fill="#141a33" stroke="#f3eadb" strokeWidth="1.2" /><path d="M60 31.6v6.8M56.6 35h6.8" stroke="#9aa0b4" strokeWidth=".9" /></g>
                    </g>
                  </g>
                  <text x="22" y="282" fill="#f3eadb" opacity=".7" fontSize="12" fontFamily="Inter">Tu casa</text>
                  <text x="385" y="30" fill="#f3eadb" opacity=".7" fontSize="12" fontFamily="Inter" textAnchor="end">Tu casa nueva</text>
                </svg>
                <div className="route-meta">
                  <span>Progreso<b><span data-km>0</span> %</b></span>
                  <span style={{ textAlign: "right" }}>Sin sorpresas<b>Precio cerrado</b></span>
                </div>
              </div>
            </div>
            <ol className="steps">
              {PASOS.map((s, i) => (
                <li className="step reveal" key={s.t}>
                  <span className="n">{i + 1}</span>
                  <div><h3 className="h3">{s.t}</h3><p>{s.p}</p><span className="tag">{s.tag}</span></div>
                </li>
              ))}
              <li className="reveal" style={{ listStyle: "none", paddingTop: 10 }}>
                <Link href="/calculadora/" className="btn btn-ink">Empezar con mis fotos<IArrow className="arrow" /></Link>
              </li>
            </ol>
          </div>
        </section>

        {/* ── SERVICIOS ── */}
        <section className="section" id="servicios">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="kicker">Servicios</span>
              <h2 className="h2">Lo que necesites mover, <em>lo movemos.</em></h2>
            </div>
            <div className="bento">
              <Link href="/servicios/" className="tile tile-a reveal">
                <img src="/assets/img/casa-nueva.webp" srcSet="/assets/img/casa-nueva-1000.webp 1000w, /assets/img/casa-nueva.webp 2000w" sizes="(min-width: 760px) 66vw, 100vw" alt="Salón luminoso con cajas de mudanza apiladas y un sofá protegido con plástico" loading="lazy" />
                <span className="label"><span className="chip">Lo más pedido</span></span>
                <span className="go"><IArrow /></span>
                <div className="tile-body"><h3 className="h3">Mudanzas completas</h3><p>Pisos, casas y chalets. Lo normal es hacerlo todo en un solo viaje con el camión de 20 m³ y, si hace falta, con dos vehículos.</p></div>
              </Link>
              <Link href="/servicios/" className="tile tile-b reveal" style={{ ["--d" as string]: ".08s" }}>
                <img src="/assets/img/montaje.webp" alt="Manos de un operario desmontando la puerta de un armario con un atornillador" loading="lazy" />
                <span className="go"><IArrow /></span>
                <div className="tile-body"><h3 className="h3">Desmontaje y montaje</h3><p>Armarios, canapés y camas, desmontados y montados de nuevo.</p></div>
              </Link>
              <Link href="/servicios/" className="tile tile-c reveal">
                <img src="/assets/img/embalaje.webp" alt="Manos envolviendo platos de porcelana en papel de embalaje" loading="lazy" />
                <span className="go"><IArrow /></span>
                <div className="tile-body"><h3 className="h3">Embalaje y frágil</h3><p>Todo, solo lo frágil o nada: tú eliges.</p></div>
              </Link>
              <Link href="/servicios/" className="tile tile-d reveal" style={{ ["--d" as string]: ".08s" }}>
                <img src="/assets/img/real-team-photo.webp" alt="El camión y la furgoneta de Mudanzas del Sur aparcados en una calle de Huelva" loading="lazy" style={{ objectPosition: "50% 70%" }} />
                <span className="go"><IArrow /></span>
                <div className="tile-body"><h3 className="h3">Portes</h3><p>Un sofá, una lavadora o unas pocas cosas.</p></div>
              </Link>
              <Link href="/servicios/" className="tile tile-e reveal" style={{ ["--d" as string]: ".16s" }}>
                <img src="/assets/img/oficina.webp" alt="Sillas de oficina envueltas en film sobre una carretilla" loading="lazy" />
                <span className="go"><IArrow /></span>
                <div className="tile-body"><h3 className="h3">Oficinas y negocios</h3><p>Organizado para que pares lo mínimo.</p></div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CALCULADORA (escaparate) ── */}
        <section className="section on-dark" id="calculadora">
          <div className="wrap calc-promo">
            <div className="reveal">
              <span className="kicker">Nuevo · calculadora con IA</span>
              <h2 className="h2" style={{ marginTop: 18 }}>Tu presupuesto empieza <em>con una foto.</em></h2>
              <ul className="checks">
                <li><i>1</i><span><b>La IA mira tus fotos</b> y hace la lista de muebles y los metros cúbicos. Tú la corriges si hace falta.</span></li>
                <li><i>2</i><span><b>Marcas en el mapa</b> las dos direcciones y dónde puede parar el camión. Calculamos los metros hasta tu portal.</span></li>
                <li><i>3</i><span><b>Te sale un precio orientativo</b> con nuestras tarifas reales, y te lo confirmamos por WhatsApp.</span></li>
              </ul>
              <div className="btn-row-inline" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link href="/calculadora/" className="btn btn-accent">Calcular mi mudanza<IArrow className="arrow" /></Link>
                <span className="muted small" style={{ alignSelf: "center" }}>Gratis · 2 minutos · sin compromiso</span>
              </div>
            </div>
            <div className="reveal" style={{ ["--d" as string]: ".1s" }}>
              <div className="phone" aria-hidden="true">
                <div className="phone-screen">
                  <img src="/assets/img/fotos.webp" alt="" loading="lazy" />
                  <div className="scanline" />
                  <div className="phone-ui">
                    <div className="row"><span>🛋 Sofá 3 plazas</span><b>×1</b></div>
                    <div className="row"><span>🛏 Canapé</span><b>×2</b></div>
                    <div className="row"><span>🚪 Armario 4 puertas</span><b>×2</b></div>
                    <div className="row"><span>🧊 Frigorífico</span><b>×1</b></div>
                    <div className="total row">Volumen estimado<b>≈ 22 m³ · camión</b></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SOMOS DE AQUÍ ── */}
        <section className="section" id="nosotros">
          <div className="wrap local">
            <div className="reveal" style={{ position: "relative", justifySelf: "center", width: "100%", maxWidth: 520 }}>
              <div className="arch">
                <img src="/assets/img/real-team-photo.webp" alt="Camión y furgoneta de Mudanzas del Sur en una calle de Huelva" loading="lazy" style={{ aspectRatio: "4 / 4.4", objectPosition: "50% 60%" }} />
              </div>
              <span className="chip photo-note">📍 Foto real · Huelva</span>
            </div>
            <div className="reveal" style={{ ["--d" as string]: ".1s" }}>
              <span className="kicker">Nuestra historia</span>
              <h2 className="h2" style={{ margin: "18px 0 20px" }}>Más que transportar muebles, <em>acompañamos nuevos comienzos.</em></h2>
              <p className="lead">Detrás de cada camión de Mudanzas del Sur y frente a cada edificio, hay una historia que cambia. Una familia que crece, una pareja que empieza su convivencia o alguien que emprende una nueva aventura en otro lugar.</p>
              <p className="lead" style={{ marginTop: 14 }}>Nos encanta nuestro trabajo porque no solo transportamos objetos: transportamos vuestros recuerdos y vuestras ilusiones.</p>
              <p className="sign">— El equipo de Mudanzas del Sur</p>
            </div>
          </div>
        </section>

        {/* ── OPINIONES (de ejemplo) ── */}
        <section className="section paper" id="opiniones">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="kicker">Opiniones</span>
              <h2 className="h2">Lo que se llevan nuestros clientes, <em>además de sus muebles.</em></h2>
              <p className="muted small">Textos de ejemplo mientras incorporamos las reseñas reales de Google.</p>
            </div>
            <div className="quotes">
              {OPINIONES.map((o, i) => (
                <figure className="quote reveal" key={o.n} style={{ ["--d" as string]: `${i * 0.08}s` }}>
                  <span className="demo-badge">Ejemplo</span>
                  <div className="stars" aria-label="5 de 5">★★★★★</div>
                  <blockquote>{o.q}</blockquote>
                  <figcaption><span className="avatar">{o.n[0]}</span><span><b>{o.n}</b><br /><span className="muted">{o.l}</span></span></figcaption>
                </figure>
              ))}
            </div>
            <div className="reveal" style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <a href={RESENAS_URL} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">¿Te mudaste con nosotros? Déjanos tu reseña<IArrow className="arrow" /></a>
            </div>
          </div>
        </section>

        {/* ── PREGUNTAS FRECUENTES ── */}
        <section className="section" id="preguntas">
          <div className="wrap faq">
            <div className="reveal">
              <span className="kicker">Preguntas frecuentes</span>
              <h2 className="h2" style={{ margin: "18px 0 20px" }}>Lo que todo el mundo <em>nos pregunta.</em></h2>
              <p className="lead">¿No está tu duda? Pregúntale a <b>Sur</b>, nuestro asistente, abajo a la derecha. O escríbenos por WhatsApp.</p>
            </div>
            <div className="faq-list reveal">
              {FAQS.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}<span className="pm" aria-hidden="true" /></summary>
                  <div className="ans">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        </section>

        {/* ── CONTACTO ── */}
        <section className="section on-dark" id="contacto">
          <div className="wrap contact">
            <div className="reveal">
              <span className="kicker">Contacto</span>
              <h2 className="h2" style={{ margin: "18px 0 18px" }}>¿Hablamos de <em>tu mudanza?</em></h2>
              <p className="lead">Lo más rápido es WhatsApp: mándanos fotos y direcciones y te contestamos con el precio.</p>
              <div className="contact-lines">
                <a className="contact-line" href={wa()} target="_blank" rel="noopener noreferrer"><span className="ico"><IWhatsApp /></span><span><small>WhatsApp</small><b>{TEL}</b></span></a>
                <a className="contact-line" href={TEL_HREF}><span className="ico"><IPhone /></span><span><small>Teléfono</small><b>{TEL}</b></span></a>
                <a className="contact-line" href={`mailto:${EMAIL}`}><span className="ico"><IMail /></span><span><small>Email</small><b>{EMAIL}</b></span></a>
                <div className="contact-line"><span className="ico"><IPin /></span><span><small>Base</small><b>Polígono Polirrosa, Huelva</b></span></div>
              </div>
            </div>
            <div className="reveal" style={{ ["--d" as string]: ".1s" }}><ContactForm /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

