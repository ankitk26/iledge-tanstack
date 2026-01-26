import { BanknoteArrowDownIcon, icons, LucideIcon } from "lucide-react";
import { ComponentProps } from "react";

export default function CategoryIcon({
	iconName,
	...props
}: ComponentProps<"svg"> & { iconName: string }) {
	const Icon = icons[iconName as keyof typeof icons] as
		| LucideIcon
		| undefined;

	if (!Icon) {
		return <BanknoteArrowDownIcon {...props} />;
	}

	return <Icon {...props} />;
}
