import { CATEGORIES } from "@/mocks/categories";

export const getCategoryName = (categoryId?: string | number | null) => {
  if (!categoryId) return "N/A";

  const found = CATEGORIES.find((cat) => String(cat.id) === String(categoryId));

  return found ? found.name : "N/A";
};
