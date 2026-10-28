import PaginaInfo, { metadataInfo } from "@/components/PaginaInfo";

export const metadata = metadataInfo("/medios-de-pago");

export default function Page() {
  return <PaginaInfo ruta="/medios-de-pago" />;
}
