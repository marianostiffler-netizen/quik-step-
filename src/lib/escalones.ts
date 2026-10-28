// Descuentos por cantidad definidos SOLO por cantidad mínima ("desde N unidades").
// Cada escalón vale desde su mínimo hasta el mínimo del siguiente menos 1, así que no
// puede haber huecos ni superposiciones. Sin imports con alias para que corra con `node --test`.

export type Escalon = {
  desde: number; // cantidad mínima (entero >= 1)
  descuentoPct: number; // entero, 0 = precio de lista
  label: string;
};

// Error si no empiezan en 1 o no son enteros estrictamente crecientes
export function validarEscalones(escalones: readonly Escalon[]): void {
  if (escalones.length === 0 || escalones[0].desde !== 1) {
    throw new Error("El primer escalón tiene que empezar en 1 unidad");
  }
  escalones.forEach((e, i) => {
    if (!Number.isInteger(e.desde) || !Number.isInteger(e.descuentoPct)) {
      throw new Error(`Escalón ${i}: desde y descuentoPct tienen que ser enteros`);
    }
    if (i > 0 && e.desde <= escalones[i - 1].desde) {
      throw new Error(`Escalón ${i}: los mínimos tienen que ser crecientes`);
    }
  });
}

// Rango que cubre el escalón i: hasta = mínimo del siguiente - 1, o null si es el último
export function rangoEscalon(escalones: readonly Escalon[], i: number): { desde: number; hasta: number | null } {
  const siguiente = escalones[i + 1];
  return { desde: escalones[i].desde, hasta: siguiente ? siguiente.desde - 1 : null };
}

// Escalón que corresponde a una cantidad: el de mayor mínimo que no la supere
export function escalonPara(escalones: readonly Escalon[], cantidad: number): Escalon {
  if (!Number.isInteger(cantidad) || cantidad < 1) throw new Error("La cantidad tiene que ser un entero >= 1");
  validarEscalones(escalones);
  let elegido = escalones[0];
  for (const e of escalones) if (e.desde <= cantidad) elegido = e;
  return elegido;
}
