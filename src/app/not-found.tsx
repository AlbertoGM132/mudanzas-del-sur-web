import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center text-center px-6">
      <div>
        <p className="eyebrow mb-4">Error 404</p>
        <h1 className="section-title text-foreground mb-4">Página no encontrada</h1>
        <p className="text-muted font-body mb-8">La página que buscas no existe o ha sido movida.</p>
        <Link href="/" className="btn-primary">Volver al inicio</Link>
      </div>
    </div>
  );
}
