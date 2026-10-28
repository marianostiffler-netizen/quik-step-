import PaginaInfo, { metadataInfo } from "@/components/PaginaInfo";

export const metadata = metadataInfo("/cambios-y-devoluciones");

export default function Page() {
  return <PaginaInfo ruta="/cambios-y-devoluciones" />;
}
