import { useSuspenseQuery } from "@tanstack/react-query";

import { queries } from "~/queries";

import CategoryGroup from "./category-group";

export default function CategoryDialogContent() {
	const { data } = useSuspenseQuery(queries.categories.all);

	return (
		<div className="grid gap-8">
			{data.map((item) => (
				<CategoryGroup
					key={item.parentCategory + "__dialog_header"}
					parentCategory={item.parentCategory}
					subCategories={item.subCategories}
				/>
			))}
		</div>
	);
}
