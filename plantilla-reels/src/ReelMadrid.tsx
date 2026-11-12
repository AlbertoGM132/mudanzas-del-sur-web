import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/fonts";

// Sistema de diseño «Mudanzas del Sur»: navy, lima solo sobre navy, Archivo condensada 800, Kaushan para la frase de cierre
const N = { navy: "#141a33", navy2: "#1d2547", lima: "#d6e02e", acento: "#e8590c", crema: "#eef0f7", gris: "#c7c9d4" };
const ARCHIVO = "Archivo";
const KAUSHAN = "Kaushan Script";
loadFont({ family: ARCHIVO, url: staticFile("Archivo.ttf"), weight: "100 900" });
loadFont({ family: KAUSHAN, url: staticFile("Kaushan.ttf") });

const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const condensada = (w = 80): React.CSSProperties => ({ fontFamily: ARCHIVO, fontWeight: 800, fontVariationSettings: `'wdth' ${w}` });

type Toma = { src: string; dur: number; foto?: boolean };
const TOMAS: Toma[] = [
  { src: "madrid/a_bernabeu.mp4", dur: 78 },
  { src: "madrid/c_cartel.jpg", dur: 36, foto: true },
  { src: "madrid/b_conductor.mp4", dur: 45 },
  { src: "madrid/e_furgo.mp4", dur: 84 },
  { src: "madrid/d_descarga.mp4", dur: 90 },
  { src: "madrid/h_calle.mp4", dur: 69 },
  { src: "madrid/g_silla.mp4", dur: 66 },
  { src: "madrid/f_escaleras.mp4", dur: 90 },
  { src: "madrid/i_portal.mp4", dur: 90 },
];
const INI = TOMAS.reduce<number[]>((a, t, i) => [...a, i === 0 ? 0 : a[i - 1] + TOMAS[i - 1].dur], []);
const CIERRE = 105;
const FIN = INI[INI.length - 1] + TOMAS[TOMAS.length - 1].dur;
export const DURACION_MADRID = FIN + CIERRE;
const en = (src: string) => INI[TOMAS.findIndex((t) => t.src.endsWith(src))];

/** Cada toma entra con un leve acercamiento para que no se quede plana. */
const Plano: React.FC<{ t: Toma }> = ({ t }) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, t.dur], t.foto ? [1.04, 1.22] : [1.0, 1.05], clamp);
  const st: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", scale: String(z) };
  return t.foto ? (
    <Img src={staticFile(t.src)} style={{ ...st, objectPosition: "38% 50%", transformOrigin: "42% 26%" }} />
  ) : (
    <Video src={staticFile(t.src)} muted style={st} />
  );
};

/** Gancho de arriba: dos líneas grandes en caja navy con la parte de arriba en arco. */
const Gancho: React.FC<{ desde: number; hasta: number }> = ({ desde, hasta }) => {
  const f = useCurrentFrame();
  if (f < desde || f >= hasta) return null;
  const a = interpolate(f, [desde, desde + 10], [0, 1], { ...clamp, easing: EASE });
  const b = interpolate(f, [desde + 6, desde + 16], [0, 1], { ...clamp, easing: EASE });
  const sale = interpolate(f, [hasta - 5, hasta], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 250, opacity: sale }}>
      <div style={{ background: N.navy, borderRadius: "260px 260px 28px 28px", padding: "70px 64px 40px", textAlign: "center", boxShadow: "0 24px 60px rgba(0,0,0,.35)", translate: `0 ${interpolate(a, [0, 1], [-40, 0])}px`, opacity: a }}>
        <div style={{ ...condensada(78), fontSize: 46, letterSpacing: ".14em", color: N.lima, marginBottom: 8 }}>MUDANZA</div>
        <div style={{ ...condensada(76), fontSize: 124, lineHeight: 0.95, color: "#fff", letterSpacing: "-.01em" }}>DE EL PORTIL</div>
        <div style={{ ...condensada(76), fontSize: 124, lineHeight: 0.95, color: "#fff", letterSpacing: "-.01em", opacity: b, translate: `0 ${interpolate(b, [0, 1], [24, 0])}px` }}>AL BERNABÉU</div>
      </div>
    </AbsoluteFill>
  );
};

/** Rótulo del tercio inferior: barra lima a la izquierda y texto blanco sobre navy. */
const Rotulo: React.FC<{ texto: string; sub?: string; desde: number; hasta: number; y?: number }> = ({ texto, sub, desde, hasta, y = 1230 }) => {
  const f = useCurrentFrame();
  if (f < desde || f >= hasta) return null;
  const a = interpolate(f, [desde, desde + 9], [0, 1], { ...clamp, easing: EASE });
  const sale = interpolate(f, [hasta - 5, hasta], [1, 0], clamp);
  return (
    <div style={{ position: "absolute", left: 70, top: y, opacity: a * sale, translate: `${interpolate(a, [0, 1], [-50, 0])}px 0`, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "stretch", background: N.navy, borderRadius: 18, overflow: "hidden", boxShadow: "0 14px 40px rgba(0,0,0,.4)" }}>
        <div style={{ width: 14, background: N.lima }} />
        <div style={{ ...condensada(80), fontSize: 82, lineHeight: 1, color: "#fff", padding: "20px 34px 24px 28px", letterSpacing: "-.005em" }}>{texto}</div>
      </div>
      {sub ? (
        <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 40, color: N.navy, background: N.lima, padding: "8px 20px 10px", borderRadius: 12 }}>{sub}</div>
      ) : null}
    </div>
  );
};

const Cierre: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = (d: number) => interpolate(f, [d, d + 0.45 * fps], [0, 1], { ...clamp, easing: EASE });
  const sube = (d: number) => ({ opacity: a(d), translate: `0 ${interpolate(a(d), [0, 1], [36, 0])}px` });
  return (
    <AbsoluteFill style={{ background: N.navy, alignItems: "center", justifyContent: "center" }}>
      {/* arco de fondo, el motivo de la marca */}
      <div style={{ position: "absolute", left: 110, right: 110, top: 330, bottom: 300, background: N.navy2, borderRadius: "430px 430px 40px 40px", opacity: a(0) }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 40, padding: "0 140px", textAlign: "center" }}>
        <Img src={staticFile("logo-claro.webp")} style={{ width: 520, ...sube(0) }} />
        <div style={{ fontFamily: KAUSHAN, fontSize: 108, lineHeight: 1.05, color: N.lima, ...sube(7) }}>¿Te mudas lejos?</div>
        <div style={{ ...condensada(84), fontSize: 58, lineHeight: 1.1, color: "#fff", ...sube(13) }}>Precio cerrado en 2 minutos, sin visitas para empezar.</div>
        <div style={{ ...condensada(84), fontSize: 60, color: N.navy, background: N.lima, padding: "20px 48px 24px", borderRadius: 999, ...sube(19) }}>WhatsApp 659 71 52 71</div>
        <div style={{ fontFamily: ARCHIVO, fontWeight: 600, fontSize: 38, color: N.gris, ...sube(24) }}>@mudanzasdelsur_</div>
      </div>
    </AbsoluteFill>
  );
};

export const ReelMadrid: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {TOMAS.map((t, i) => (
      <Sequence key={t.src} from={INI[i]} durationInFrames={t.dur}>
        <Plano t={t} />
      </Sequence>
    ))}
    {/* degradado suave arriba y abajo para que los textos se lean sobre la noche */}
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.28) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 58%, rgba(0,0,0,.35) 100%)" }} />
    <Gancho desde={0} hasta={INI[1]} />
    <Rotulo texto="600 KM DESPUÉS" desde={en("b_conductor.mp4")} hasta={en("e_furgo.mp4")} y={1180} />
    <Rotulo texto="Llegamos de noche." desde={en("e_furgo.mp4")} hasta={en("d_descarga.mp4")} />
    <Rotulo texto="Se descarga igual." desde={en("d_descarga.mp4")} hasta={en("h_calle.mp4")} />
    <Rotulo texto="Mueble a mueble." desde={en("h_calle.mp4")} hasta={en("f_escaleras.mp4")} />
    <Rotulo texto="Hasta arriba." desde={en("f_escaleras.mp4")} hasta={en("i_portal.mp4")} />
    <Rotulo texto="Todo dentro." sub="Cada mueble envuelto en film" desde={en("i_portal.mp4")} hasta={FIN} />
    <Sequence from={FIN} durationInFrames={CIERRE}>
      <Cierre />
    </Sequence>
  </AbsoluteFill>
);
