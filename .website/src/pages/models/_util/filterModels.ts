import type { Model } from "@site/src/data/models/api";

export const filterModels = (
  models: Model[],
  searchQuery: string,
  selectedChipsets: string[],
): Model[] => {
  const query = searchQuery.trim().toLowerCase();

  return models.filter((model) => {
    const chipsetMismatch =
      selectedChipsets.length > 0 &&
      model.chipsets.length > 0 &&
      !model.chipsets.some((chip) => selectedChipsets.includes(chip));

    if (chipsetMismatch) return false;
    if (!query) return true;

    const haystack =
      `${model.name} ${model.subtitle ?? ""} ${model.primaryType ?? ""} ${model.category}`.toLowerCase();

    return haystack.includes(query);
  });
};
