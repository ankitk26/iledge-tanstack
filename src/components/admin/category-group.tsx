import { Category } from "@/db/schema";

import { Separator } from "../ui/separator";

import CategoryItem from "./category-item";

type Props = {
	parentCategory: string;
	subCategories: Category[];
};

export default function CategoryGroup({
	parentCategory,
	subCategories,
}: Props) {
	return (
		<div key={parentCategory} className="space-y-4">
			<h3 className="font-medium text-muted-foreground">
				{parentCategory}
			</h3>
			<div className="mb-6 flex flex-col gap-4 lg:flex-row lg:flex-wrap">
				{subCategories.map((category) => (
					<CategoryItem
						key={category.id + "__category_dialog"}
						category={category}
					/>
				))}
			</div>
			<Separator />
		</div>
	);
}
