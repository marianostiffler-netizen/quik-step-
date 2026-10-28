import PaginaInfo, { metadataInfo } from "@/components/PaginaInfo";

export const metadata = metadataInfo("/nosotros");

export default function Page() {
  return <PaginaInfo ruta="/nosotros" />;
}
