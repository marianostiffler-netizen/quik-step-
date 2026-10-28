"use client";

import { useSearchParams } from "next/navigation";
import CatalogoItems from "./CatalogoItems";
import type { Seleccion } from "./tipos";

type Props = Omit<React.ComponentProps<typeof CatalogoItems>, "seleccionInicial">;

// Lee ?uso= y ?tipo= como filtro inicial. Solo acepta valores que existen en los datos.
export default function CatalogoConstruccion(props: Props) {
  const params = useSearchParams();
  const inicial: Seleccion = {};
  for (const key of ["tipo", "uso"]) {
    const valor = params.get(key);
    const grupo = props.grupos?.find((g) => g.key === key);
    if (valor && grupo?.opciones.some((o) => o.value === valor)) inicial[key] = [valor];
  }
  // key: si cambia la query string, se reinicia la selección
  return <CatalogoItems key={JSON.stringify(inicial)} {...props} seleccionInicial={inicial} />;
}
