import React from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container-main py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div className="flex flex-col gap-3">
            <AppImage src="/assets/images/logo.png" alt="Mudanzas del Sur logo" width={140} height={100} className="h-16 w-auto object-contain brightness-0 invert" />
            <p className="text-sm text-white/50 max-w-xs leading-relaxed font-body">Servicios de mudanzas y portes profesionales en Huelva y toda España.</p>
          </div>
          <div className="flex flex-col gap-2">
            <a href="tel:+34659715271" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-semibold font-heading">
              <Icon name="PhoneIcon" size={16} variant="solid" className="text-primary" />
              +34 659 71 52 71
            </a>
            <a href="mailto:contactomudanzasdelasur@gmail.com" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-body">
              <Icon name="EnvelopeIcon" size={16} variant="outline" className="text-primary" />
              contactomudanzasdelasur@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/mudanzasdelsur_" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="Instagram">
              <Icon name="CameraIcon" size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="Facebook">
              <Icon name="GlobeAltIcon" size={16} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="TikTok">
              <Icon name="MusicalNoteIcon" size={16} />
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-white/40 text-sm font-body">© 2025 Mudanzas del Sur. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white/40 hover:text-white/80 transition-colors text-sm font-body">Privacidad</Link>
            <Link href="#" className="text-white/40 hover:text-white/80 transition-colors text-sm font-body">Aviso Legal</Link>
            <Link href="/contacto" className="text-white/40 hover:text-white/80 transition-colors text-sm font-body">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
