import { useQuery } from "@tanstack/react-query";
import { queries } from "~/queries";
import CategoryGroup from "./category-group";

export default function CategoryDialogContent() {
  const { data, isPending } = useQuery(queries.categories.all);

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid gap-8">
      {data?.map((item) => (
        <CategoryGroup
          key={item.parentCategory + "__dialog_header"}
          parentCategory={item.parentCategory}
          subCategories={item.subCategories}
        />
      ))}
    </div>
  );
}
