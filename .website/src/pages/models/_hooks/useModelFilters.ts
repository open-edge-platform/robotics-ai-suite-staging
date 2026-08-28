import { type HfConfig } from "@site/src/data/models/api";
import { useUrlQueryParam } from "@site/src/hooks/useUrlQueryParam.hook";
import { useMemo } from "react";

const ALL_DOMAINS = "__all__";
const CHIPSETS_NONE = "__none__";

type DomainOption = {
  label: string;
  value: string;
};

export type UseModelFiltersResult = {
  searchQuery: string;
  selectedDomain: string;
  selectedDomainTag: string | undefined;
  selectedCategory: string | undefined;
  selectedChipsets: string[];
  allSelected: boolean;
  setSearchQuery: (query: string) => void;
  setSelectedDomain: (domain: string | undefined) => void;
  setSelectedCategory: (category: string | undefined) => void;
  toggleChipset: (chipset: string) => void;
  handleToggleSelected: () => void;
};

export const useModelFilters = (cfg: HfConfig): UseModelFiltersResult => {
  const { value: searchQueryParam, setValue: setSearchQueryParam } =
    useUrlQueryParam("search");

  const { value: selectedDomainParam, setValue: setSelectedDomainParam } =
    useUrlQueryParam("domain");

  const { value: selectedChipsetsParam, setValue: setSelectedChipsetsParam } =
    useUrlQueryParam("chipsets");

  const { value: selectedCategoryParam, setValue: setSelectedCategoryParam } =
    useUrlQueryParam("category");

  const searchQuery = searchQueryParam ?? "";
  const allChipsetAliases = cfg.chipsets.map(({ alias }) => alias);
  const allChipsetAliasSet = new Set(allChipsetAliases);

  const selectedDomain =
    selectedDomainParam && selectedDomainParam !== ALL_DOMAINS
      ? selectedDomainParam
      : ALL_DOMAINS;

  const selectedChipsets = useMemo(() => {
    if (!selectedChipsetsParam) {
      return allChipsetAliases;
    }
    if (selectedChipsetsParam === CHIPSETS_NONE) {
      return [];
    }
    const fromParam = selectedChipsetsParam
      .split(",")
      .filter((alias) => allChipsetAliasSet.has(alias));
    return Array.from(new Set(fromParam));
  }, [selectedChipsetsParam, allChipsetAliases, allChipsetAliasSet]);

  const allChipsetsSelected =
    selectedChipsets.length === allChipsetAliases.length &&
    allChipsetAliases.every((chipset) => selectedChipsets.includes(chipset));

  const allSelected =
    selectedDomain === ALL_DOMAINS &&
    allChipsetsSelected &&
    !searchQuery.trim();

  const encodeChipsets = (chipsets: string[]): string | undefined => {
    if (chipsets.length === 0) {
      return CHIPSETS_NONE;
    }
    const isAll =
      chipsets.length === allChipsetAliases.length &&
      allChipsetAliases.every((alias) => chipsets.includes(alias));
    if (isAll) {
      return undefined;
    }
    return allChipsetAliases
      .filter((alias) => chipsets.includes(alias))
      .join(",");
  };

  const selectedCategory = selectedCategoryParam ?? undefined;

  const setSelectedCategory = (category: string | undefined) => {
    setSelectedCategoryParam(category ?? undefined);
  };

  const setSearchQuery = (query: string) => {
    setSearchQueryParam(query.trim() ? query : undefined);
  };

  const setSelectedDomain = (domain: string | undefined) => {
    setSelectedDomainParam(domain === ALL_DOMAINS ? undefined : domain);
  };

  const toggleChipset = (chipset: string) => {
    const next = selectedChipsets.includes(chipset)
      ? selectedChipsets.filter((v) => v !== chipset)
      : [...selectedChipsets, chipset];
    setSelectedChipsetsParam(encodeChipsets(next));
  };

  const clearAll = () => {
    setSelectedDomainParam(undefined);
    setSelectedChipsetsParam(CHIPSETS_NONE);
    setSelectedCategoryParam(undefined);
    setSearchQueryParam(undefined);
  };

  const selectAll = () => {
    setSelectedDomainParam(undefined);
    setSelectedChipsetsParam(undefined);
    setSelectedCategoryParam(undefined);
    setSearchQueryParam(undefined);
  };

  const handleToggleSelected = () => {
    if (allSelected) {
      clearAll();
      return;
    }
    selectAll();
  };

  return {
    searchQuery,
    selectedDomain,
    selectedDomainTag:
      selectedDomain === ALL_DOMAINS ? undefined : selectedDomain,
    selectedCategory,
    selectedChipsets,
    allSelected,
    setSearchQuery,
    setSelectedDomain,
    setSelectedCategory,
    toggleChipset,
    handleToggleSelected,
  };
};
