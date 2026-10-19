// Dirección antigua de la portada (enlaces y anuncios antiguos): misma página, con la canónica en "/".
import Home from "@/components/site/Home";

export const metadata = { alternates: { canonical: "/" } };

export default function Page() {
  return <Home />;
}
