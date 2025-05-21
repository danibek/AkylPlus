"use client";

import { Category } from "@prisma/client";
import {
  FcEditImage,
  FcCommandLine,
  FcVoicePresentation,
  FcTimeline,
  FcSalesPerformance,
  FcSelfie,
} from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<string, IconType> = {
  "Тілдер ұйрену": FcVoicePresentation,
  "Басқалары": FcTimeline,
  "Маркетинг": FcSelfie,
  "Қаржы": FcSalesPerformance,
  "Бағдарламашы": FcCommandLine,
  "Дизайнер": FcEditImage,
};

// 👉 Упорядочим вручную по нужной последовательности:
const orderedCategoryNames = [
  "Бағдарламашы",
  "Дизайнер",
  "Қаржы",
  "Маркетинг",
  "Тілдер ұйрену",
  "Басқалары",
];

export const Categories = ({ items }: CategoriesProps) => {
  const orderedItems = orderedCategoryNames
    .map((name) => items.find((item) => item.name === name))
    .filter((item): item is Category => Boolean(item)); // Убираем undefined

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {orderedItems.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
