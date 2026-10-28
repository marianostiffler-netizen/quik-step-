import PaginaInfo, { metadataInfo } from "@/components/PaginaInfo";

export const metadata = metadataInfo("/preguntas-frecuentes");

export default function Page() {
  return <PaginaInfo ruta="/preguntas-frecuentes" />;
}
