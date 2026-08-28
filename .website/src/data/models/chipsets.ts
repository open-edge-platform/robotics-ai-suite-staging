import type { Chipset } from "./api";

// Chipset filter options for the AI Models catalog. `label` is shown in the UI;
// `alias` is matched against each model's `chipset:<alias>` tags. Aliases must
// stay in sync with .designs/model-catalogue-convention.md.
const chipsets: Chipset[] = [
  { label: "Nova Lake", alias: "nvl" },
  { label: "Panther Lake", alias: "ptl" },
  { label: "WildCat Lake", alias: "wcl" },
];

export default chipsets;
