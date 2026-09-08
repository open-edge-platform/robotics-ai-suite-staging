// Canonical hardware alias metadata for the AI Models catalog.
// Chipset codenames and tiers follow .designs/model-catalogue-convention.md;
// keep entries here in sync with that document.

export type HardwareAlias = "nvl" | "ptl" | "wcl";

export type HardwareInfo = {
  alias: HardwareAlias;
  chipset: string;
  tier: string;
  color: string;
};

export const HARDWARE: Record<HardwareAlias, HardwareInfo> = {
  nvl: {
    alias: "nvl",
    chipset: "Nova Lake",
    tier: "Core Ultra 2",
    color: "#c8f000",
  },
  ptl: {
    alias: "ptl",
    chipset: "Panther Lake",
    tier: "Core Ultra 3",
    color: "#63b3ed",
  },
  wcl: {
    alias: "wcl",
    chipset: "WildCat Lake",
    tier: "Core Series 3",
    color: "#ff8a3d",
  },
};

const HARDWARE_ALIASES = Object.keys(HARDWARE) as HardwareAlias[];

const HARDWARE_COLOR_FALLBACKS = ["#a78bfa", "#34d399", "#f472b6"];
const DEFAULT_HARDWARE_COLOR = "#c8f000";

const isKnownAlias = (alias: string): alias is HardwareAlias =>
  Object.prototype.hasOwnProperty.call(HARDWARE, alias);

export const getHardware = (alias: string): HardwareInfo | undefined =>
  isKnownAlias(alias) ? HARDWARE[alias] : undefined;

export const listHardware = (): HardwareInfo[] =>
  HARDWARE_ALIASES.map((alias) => HARDWARE[alias]);

export const getChipsetLabel = (alias: string): string =>
  getHardware(alias)?.chipset ?? alias.toUpperCase();

export const getTierLabel = (alias: string): string =>
  getHardware(alias)?.tier ?? "";

export const getHardwareLabel = (alias: string): string => {
  const info = getHardware(alias);
  return info ? `${info.tier} ${info.chipset}` : alias.toUpperCase();
};

export const getHardwareColor = (alias: string, index = 0): string =>
  getHardware(alias)?.color ??
  HARDWARE_COLOR_FALLBACKS[index % HARDWARE_COLOR_FALLBACKS.length] ??
  DEFAULT_HARDWARE_COLOR;
