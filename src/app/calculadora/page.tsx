import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Calculadora from "@/components/calc/Calculadora";

export const metadata = {
  title: "Calculadora de mudanzas con IA",
  description: "Sube fotos de tus muebles, marca las direcciones en el mapa y obtén al momento un precio orientativo para tu mudanza en Huelva, Sevilla o Andalucía.",
  alternates: { canonical: "/calculadora/" },
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero calc-hero">
          <div className="wrap">
            <span className="kicker">Calculadora con IA · gratis</span>
            <h1 className="display h1">Calcula tu mudanza <em>en dos minutos.</em></h1>
            <p className="lead">Fotos de tus cosas, las dos direcciones y dónde puede parar el camión. Te enseñamos un precio orientativo con nuestras tarifas reales y te lo confirmamos por WhatsApp.</p>
          </div>
        </section>
        <section style={{ paddingBottom: 96 }}>
          <div className="wrap"><Calculadora /></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
