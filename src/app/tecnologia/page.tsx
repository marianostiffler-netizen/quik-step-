import type { Metadata } from "next";
import { Droplets, MousePointerClick, Award } from "lucide-react";
import { technologySection } from "@/data/site-data";

export const metadata: Metadata = {
  title: "Tecnología | Quick-Step Argentina",
  description:
    "Conocé las tecnologías Quick-Step: Hydroseal, Uniclic y clasificación AC. Innovación europea en cada piso laminado.",
};

const sectionIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  hydroseal: Droplets,
  uniclic: MousePointerClick,
  "clasificacion-ac": Award,
};

export default function TecnologiaPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-qs-blue via-blue-900 to-blue-950 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold">
            {technologySection.title}
          </h1>
          <p className="mt-4 text-xl text-blue-200 max-w-2xl">
            {technologySection.subtitle}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
          {technologySection.features.map((feature, index) => {
            const Icon = sectionIcons[feature.id] || Award;
            return (
              <div
                key={feature.id}
                className={`flex flex-col md:flex-row gap-10 items-start ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Icon block */}
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="w-32 h-32 rounded-3xl bg-qs-blue-light flex items-center justify-center">
                    <Icon size={56} className="text-qs-blue" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {feature.title}
                  </h2>
                  <p className="mt-4 text-lg text-qs-gray leading-relaxed">
                    {feature.description}
                  </p>

                  {"detail" in feature && feature.detail && (
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {feature.detail}
                    </p>
                  )}

                  {"levels" in feature && feature.levels && (
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      {feature.levels.map(
                        (level: {
                          level: string;
                          label: string;
                          description: string;
                        }) => (
                          <div
                            key={level.level}
                            className="p-5 rounded-xl border border-gray-200 bg-white"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xl font-bold text-qs-blue">
                                {level.level}
                              </span>
                              <span className="text-sm font-semibold text-gray-900">
                                {level.label}
                              </span>
                            </div>
                            <p className="text-sm text-qs-gray">
                              {level.description}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
