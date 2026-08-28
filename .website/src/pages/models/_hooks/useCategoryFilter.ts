import { benchmarksQueryOptions } from "@site/src/data/models/queryOptions";
import { useHfConfig } from "@site/src/data/models/useHfConfig";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { filterModels } from "../_util/filterModels";
import { useModelFilters } from "./useModelFilters";
import { useModelsInfiniteList } from "./useModelsInfiniteList";

interface UseCategoryFilterOptions {
  alwaysFetchBenchmarks?: boolean;
}

export const useCategoryFilter = (options: UseCategoryFilterOptions = {}) => {
  const { alwaysFetchBenchmarks = false } = options;
  const cfg = useHfConfig();

  const { searchQuery, selectedDomainTag, selectedChipsets, selectedCategory } =
    useModelFilters(cfg);

  const {
    models,
    isLoading: isModelsLoading,
    isFetchingNextPage,
    sentinelRef,
  } = useModelsInfiniteList(cfg, selectedDomainTag);

  const { data: allBenchmarks = [], isLoading: isBenchmarksLoading } = useQuery(
    {
      ...benchmarksQueryOptions(),
      enabled: Boolean(selectedCategory) || alwaysFetchBenchmarks,
    },
  );

  const filteredByModel = useMemo(
    () => filterModels(models, searchQuery, selectedChipsets),
    [models, searchQuery, selectedChipsets],
  );

  const relevantBenchmarks = useMemo(
    () =>
      selectedCategory
        ? allBenchmarks.filter(({ category }) =>
            category?.includes(selectedCategory),
          )
        : allBenchmarks,
    [allBenchmarks, selectedCategory],
  );

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return filteredByModel;

    const benchmarkSlugs = new Set(relevantBenchmarks.map((b) => b.slug));
    return filteredByModel.filter((model) => benchmarkSlugs.has(model.slug));
  }, [filteredByModel, relevantBenchmarks, selectedCategory]);

  return {
    items: filteredItems,
    sentinelRef,
    isFetchingNextPage,
    relevantBenchmarks,
    isLoading: isModelsLoading || isBenchmarksLoading,
  };
};
