import TopBar from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { grupos, conteoPorCategoria } from "@/data/catalogo";

// Servidor: arma el menú con los conteos del catálogo y se los pasa al Navbar (cliente).
export default function Header() {
  return (
    <>
      <TopBar />
      <Navbar grupos={grupos} conteos={conteoPorCategoria()} />
    </>
  );
}
