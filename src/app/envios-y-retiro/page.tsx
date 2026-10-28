import PaginaInfo, { metadataInfo } from "@/components/PaginaInfo";

export const metadata = metadataInfo("/envios-y-retiro");

export default function Page() {
  return <PaginaInfo ruta="/envios-y-retiro" />;
}
