import { BanknoteArrowDown, icons, LucideIcon } from "lucide-react";

export default function CategoryIcon({ iconName }: { iconName: string }) {
  const Icon = icons[iconName as keyof typeof icons] as LucideIcon | undefined;

  if (!Icon) {
    return <BanknoteArrowDown className="size-6 text-muted-foreground" />;
  }

  return <Icon className="size-6 text-muted-foreground" />;
}
