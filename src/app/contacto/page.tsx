"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface FormData {
  nombre: string; email: string; telefono: string; ruta: string; servicio: string; fecha: string;
}

export default function ContactoPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({ nombre: "", email: "", telefono: "", ruta: "", servicio: "", fecha: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".reveal-item");
    if (!elements) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });
    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(32px)";
      (el as HTMLElement).style.transition = "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Envio de Formulario a Formspree
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xkopvbry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) { setSubmitted(true); }
      else { setError("Hubo un error al enviar. Por favor inténtalo de nuevo o llámanos."); }
    } catch {
      setError("Hubo un error al enviar. Por favor inténtalo de nuevo o llámanos.");
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";
  const labelClass = "block text-sm font-heading font-700 text-foreground mb-2";

  return (
    <main className="min-h-screen bg-background" ref={sectionRef}>
      <Header />

      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-secondary pt-20">
        <div className="absolute inset-0 z-0">
          <AppImage src="/assets/images/contacto.jpg" alt="Equipo de Mudanzas del Sur" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(17,24,32,0.88) 0%, rgba(17,24,32,0.65) 55%, rgba(17,24,32,0.25) 100%)" }} />
        </div>
        <div className="container-main relative z-10 py-20 md:py-28">
          <div className="max-w-2xl reveal-item">
            <nav className="flex items-center gap-2 mb-6 text-white/50 text-sm font-body">
              <Link href="/home-page" className="hover:text-white transition-colors">Inicio</Link>
              <Icon name="ChevronRightIcon" size={14} className="text-white/30" />
              <span className="text-white/80">Contacto</span>
            </nav>
            <span className="eyebrow block mb-4 text-accent">Contacta con Nosotros</span>
            <h1 className="hero-headline text-white mb-6">Pide tu <span className="italic" style={{ color: "#F5C842" }}>presupuesto</span> gratis</h1>
            <p className="hero-sub text-white/80 max-w-xl leading-relaxed">Estamos aquí para ayudarte con tus mudanzas y traslados en Huelva. Rellena el formulario y te contactamos sin compromiso.</p>
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 reveal-item">
              <div className="bg-muted-bg rounded-3xl p-8 md:p-10 border border-border shadow-sm">
                <span className="eyebrow block mb-3">Formulario de Contacto</span>
                <h2 className="section-title-sm text-foreground mb-2">Cuéntanos tu <span className="text-gradient-orange italic">mudanza</span></h2>
                <p className="text-muted font-body mb-8">Completa los datos y te enviaremos un presupuesto personalizado.</p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="CheckCircleIcon" size={36} className="text-primary" variant="solid" />
                    </div>
                    <h3 className="font-heading font-800 text-2xl text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>¡Consulta enviada!</h3>
                    <p className="text-muted font-body">Nos pondremos en contacto contigo lo antes posible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div><label htmlFor="nombre" className={labelClass}>Nombre del contacto</label><input id="nombre" name="nombre" type="text" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre completo" className={inputClass} /></div>
                    <div><label htmlFor="email" className={labelClass}>Correo electrónico <span className="text-primary">*</span></label><input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Ingresa tu correo electrónico aquí" className={inputClass} /></div>
                    <div><label htmlFor="telefono" className={labelClass}>Teléfono</label><input id="telefono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} placeholder="Tu número de teléfono" className={inputClass} /></div>
                    <div><label htmlFor="ruta" className={labelClass}>Ciudad origen - Ciudad destino</label><input id="ruta" name="ruta" type="text" value={formData.ruta} onChange={handleChange} placeholder="Ej: Huelva - Sevilla" className={inputClass} /></div>
                    <div><label htmlFor="servicio" className={labelClass}>Detállanos el servicio que necesitas <span className="text-primary">*</span></label><textarea id="servicio" name="servicio" required rows={5} value={formData.servicio} onChange={handleChange} placeholder="Describe tu mudanza: tipo de inmueble, número de habitaciones, objetos especiales, etc." className={`${inputClass} resize-none`} /></div>
                    <div><label htmlFor="fecha" className={labelClass}>Fecha estimada</label><input id="fecha" name="fecha" type="text" value={formData.fecha} onChange={handleChange} placeholder="Ej: Marzo 2025, lo antes posible..." className={inputClass} /></div>
                    {error && <p className="text-red-500 text-sm font-body">{error}</p>}
                    <button type="submit" disabled={sending} className="btn-primary text-base py-4 px-8 mt-2 shadow-orange justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                      <Icon name="PaperAirplaneIcon" size={18} variant="solid" />
                      {sending ? "Enviando..." : "Enviar consulta ahora"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="reveal-item bg-secondary rounded-3xl p-8 text-white" style={{ transitionDelay: "80ms" }}>
                <span className="eyebrow block mb-4 text-accent">Información de Contacto</span>
                <h3 className="font-heading font-800 text-2xl text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>Estamos aquí para ayudarte</h3>
                {[
                  { icon: "PhoneIcon", label: "Teléfono", value: "+34 659 71 52 71", href: "tel:+34659715271" },
                  { icon: "EnvelopeIcon", label: "Email", value: "contactomudanzasdelasur@gmail.com", href: "mailto:contactomudanzasdelasur@gmail.com" },
                  { icon: "MapPinIcon", label: "Dirección", value: "Polígono Polirrosa, Huelva", href: null },
                  { icon: "ClockIcon", label: "Horario", value: "Disponibles todos los días las 24h", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon as "PhoneIcon"} size={18} className="text-accent" variant="solid" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-body uppercase tracking-wider mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white font-heading font-700 text-lg hover:text-accent transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>{item.value}</a>
                      ) : (
                        <p className="text-white font-body text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/70 text-sm font-body mb-4">O envíanos un WhatsApp directamente:</p>
                  <a href="https://wa.me/34659715271?text=Hola%2C%20me%20gustar%C3%ADa%20pedir%20un%20presupuesto." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white font-heading font-700 text-sm py-3 px-6 rounded-full transition-all hover:-translate-y-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, backgroundColor: "#25D366" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="reveal-item rounded-3xl overflow-hidden relative h-52" style={{ transitionDelay: "160ms" }}>
                <AppImage src="/assets/images/whatsapp.jpg" alt="Contacta con Mudanzas del Sur por WhatsApp" fill className="object-cover" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-6">
                  <p className="text-white font-heading font-700 text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>Respuesta rápida garantizada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py bg-primary">
        <div className="container-main text-center reveal-item">
          <span className="eyebrow block mb-4 text-white/70">¿Listo para empezar?</span>
          <h2 className="section-title text-white mb-6">Solicita tu <span className="italic" style={{ color: "#F5C842" }}>presupuesto gratis</span></h2>
          <p className="text-white/80 font-body text-lg max-w-xl mx-auto mb-8">Sin compromiso. Te respondemos en menos de 24 horas.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+34659715271" className="btn-white text-base py-4 px-8">
              <Icon name="PhoneIcon" size={18} variant="solid" />¡Llama Ahora!
            </a>
            <a href="https://wa.me/34659715271" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-heading font-700 text-base py-4 px-8 rounded-full transition-all hover:-translate-y-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, backgroundColor: "#25D366" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
