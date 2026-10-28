import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Miga = { label: string; href?: string };

// Migas de pan: Inicio › … › actual. La última es la página actual (sin link).
export default function Migas({ migas }: { migas: Miga[] }) {
  return (
    <nav aria-label="Migas de pan" className="flex flex-wrap items-center text-sm text-nogal-suave">
      {migas.map((m, i) => {
        const ultima = i === migas.length - 1;
        return (
          <span key={`${i}-${m.label}`} className="inline-flex items-center">
            {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {ultima || !m.href ? (
              <span className="tap inline-flex items-center px-1 text-nogal" aria-current={ultima ? "page" : undefined}>
                {m.label}
              </span>
            ) : (
              <Link href={m.href} className="tap inline-flex items-center hover:text-algarrobo">
                {m.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
