import { createServerFn } from "@tanstack/react-start";
import { db } from "~/db";
import { Category, category } from "~/db/schema";

export const getCategories = createServerFn({ method: "GET" }).handler(
  async () => {
    const allCategories = await db
      .select()
      .from(category)
      .orderBy(category.parent_category, category.description);

    const groupedCategories = {} as { [key: string]: Category[] };
    allCategories.forEach((category) => {
      if (!groupedCategories[category.parent_category]) {
        groupedCategories[category.parent_category] = [];
      }
      groupedCategories[category.parent_category].push(category);
    });

    const categoryList = Object.keys(groupedCategories).map(
      (parentCategory) => ({
        parentCategory,
        subCategories: groupedCategories[parentCategory],
      })
    );

    return categoryList;
  }
);
