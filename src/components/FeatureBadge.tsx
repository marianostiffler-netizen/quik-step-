import { TreePine, Droplets, Shield, MousePointerClick } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "wood-grain": TreePine,
  "water-drop": Droplets,
  shield: Shield,
  click: MousePointerClick,
};

interface FeatureBadgeProps {
  icon: string;
  title: string;
  description: string;
  badge: string;
  compact?: boolean;
}

export function FeatureBadge({
  icon,
  title,
  description,
  badge,
  compact = false,
}: FeatureBadgeProps) {
  const Icon = iconMap[icon] || Shield;

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-qs-blue">
        <div className="w-8 h-8 rounded-full bg-qs-blue-light flex items-center justify-center shrink-0">
          <Icon size={14} className="text-qs-blue" />
        </div>
        <span className="text-xs font-medium text-gray-700">{badge}</span>
      </div>
    );
  }

  return (
    <div className="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mx-auto w-14 h-14 rounded-full bg-qs-blue-light flex items-center justify-center mb-4">
        <Icon size={24} className="text-qs-blue" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-qs-gray leading-relaxed">{description}</p>
      <span className="inline-block mt-3 text-xs font-semibold text-qs-blue bg-qs-blue-light px-3 py-1 rounded-full">
        {badge}
      </span>
    </div>
  );
}
