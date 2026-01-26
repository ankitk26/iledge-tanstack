import { Category } from "@/db/schema";
import { useAdminStore } from "@/store/use-admin-store";

import CategoryIcon from "../shared/category-icon";
import { Button } from "../ui/button";

type Props = {
	category: Category;
};

export default function CategoryItem({ category }: Props) {
	const selectedCategoryId = useAdminStore(
		(store) => store.selectedCategoryId,
	);
	const setSelectedCategoryId = useAdminStore(
		(store) => store.setSelectedCategoryId,
	);

	return (
		<Button
			variant={
				selectedCategoryId === category.id ? "default" : "secondary"
			}
			onClick={() => setSelectedCategoryId(category.id)}
			className="flex w-full items-center justify-start gap-2 lg:w-fit"
		>
			<CategoryIcon iconName={category.icon_name} className="size-4" />
			<span className="text-sm" title={category.description}>
				{category.description}
			</span>
		</Button>
	);
}
