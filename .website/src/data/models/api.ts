// Data-access layer for AI Models. Fetches model content at runtime directly
// from a Hugging Face organization (see .designs/hugging-face-model-api.md).
// The `Model` shape is the stable contract the UI renders; only the fetch/parse
// internals here know about Hugging Face.

import { stripFrontMatter } from "@site/src/utils/markdown";
import { getHardware } from "./hardware";

export type Domain = { label: string; tag: string };
export type Chipset = { label: string; alias: string };

// Runtime configuration sourced from docusaurus `customFields`. `token` is only
// set to reach a private staging org during testing; production is public and
// tokenless.
export type HfConfig = {
  org: string;
  token: string | null;
  catalogTag: string;
  domains: Domain[];
  chipsets: Chipset[];
};

const HF = "https://huggingface.co";
const PAGE_SIZE = 24;
const CHIPSET_PREFIX = "chipset:";

export type RelatedModel = {
  slug: string;
  label?: string;
  reason?: string;
};

export type ModelLinks = {
  huggingface?: string;
  github?: string;
  paper?: string;
};

export type BenchmarkMetric = {
  name: string;
  value: number;
  unit: string;
};

export type BenchmarkEntry = {
  domain: string;
  category: string[];
  task: string;
  model: string;
  slug: string;
  hardware: string;
  metrics: BenchmarkMetric[];
};

export type Model = {
  slug: string;
  name: string;
  subtitle?: string;
  category: string;
  order?: number;
  chipsets: string[];
  primaryType?: string;
  secondaryTypes: string[];
  license?: string;
  size?: string;
  releaseDate?: string;
  datasets?: string;
  keyNovelty: string;
  description: string;
  quickStart: string;
  relatedModels: string[];
  overviewSvg?: string;
  detailedSvg?: string;
  taskImage?: string;
  thumbnail: string;
  hasDiagrams: boolean;
  links: ModelLinks;
};

// Card metadata carried inline on the models list/detail responses. Keys mirror
// the model-card YAML front matter pushed to each Hugging Face repo.
type CardData = {
  title?: string;
  subtitle?: string;
  category?: string;
  order?: number;
  primary_type?: string;
  secondary_types?: string[];
  license?: string;
  size?: string;
  release_date?: string;
  datasets?: string;
  key_novelty?: string;
  image_overview?: string;
  image_detailed?: string;
  task_image?: string;
  thumbnail?: string;
  related_models?: RelatedModel[];
  paper?: string;
  code?: string;
};

type HfModel = {
  id: string;
  tags?: string[];
  cardData?: CardData;
};

const DEFAULT_CATEGORY = "Physical AI";
const DEFAULT_THUMBNAIL = "/img/icon/inference-chip.svg";

function slugOf(id: string): string {
  const parts = id.split("/");
  return parts[parts.length - 1] ?? id;
}

function authHeaders(cfg: HfConfig): HeadersInit | undefined {
  return cfg.token ? { Authorization: `Bearer ${cfg.token}` } : undefined;
}

function resolveUrl(cfg: HfConfig, slug: string, filePath: string): string {
  return `${HF}/${cfg.org}/${slug}/resolve/main/${filePath}`;
}

const MIME_BY_EXT: Record<string, string> = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};

function mimeForPath(filePath: string): string | undefined {
  const ext = filePath.split(".").pop()?.toLowerCase();
  return ext ? MIME_BY_EXT[ext] : undefined;
}

// Turns a repo-relative asset path into a URL usable in an <img src>. Private
// repos require an auth header, which <img> cannot send, so under a token we
// fetch the bytes and hand back an object URL. Public/prod repos use the direct
// URL. Returns undefined when the asset cannot be loaded.
async function resolveAsset(
  cfg: HfConfig,
  slug: string,
  filePath?: string,
): Promise<string | undefined> {
  if (!filePath) {
    return undefined;
  }
  const url = resolveUrl(cfg, slug, filePath);
  if (!cfg.token) {
    return url;
  }
  try {
    const res = await fetch(url, { headers: authHeaders(cfg) });
    if (!res.ok) {
      return undefined;
    }
    // HF's resolve endpoint may serve assets (notably SVG) with a non-image
    // content-type, which makes the resulting object URL unrenderable in an
    // <img>. Re-type the blob from the file extension so the browser treats it
    // as an image.
    const blob = await res.blob();
    const mime = mimeForPath(filePath);
    const typed =
      mime && blob.type !== mime ? blob.slice(0, blob.size, mime) : blob;
    return URL.createObjectURL(typed);
  } catch {
    return undefined;
  }
}

function chipsetsFromTags(tags: string[]): string[] {
  return tags
    .filter((t) => t.startsWith(CHIPSET_PREFIX))
    .map((t) => t.slice(CHIPSET_PREFIX.length))
    .filter((alias) => getHardware(alias) !== undefined);
}

function linksFor(cfg: HfConfig, slug: string, card: CardData): ModelLinks {
  return {
    huggingface: `${HF}/${cfg.org}/${slug}`,
    github: card.code || undefined,
    paper: card.paper || undefined,
  };
}

// Maps a raw Hugging Face model to the UI `Model`. The grid only needs the
// thumbnail; `withDiagrams` additionally resolves the architecture SVGs.
async function mapModel(
  cfg: HfConfig,
  raw: HfModel,
  opts: { withDiagrams: boolean; description?: string; quickStart?: string },
): Promise<Model> {
  const slug = slugOf(raw.id);
  const card = raw.cardData ?? {};
  const tags = raw.tags ?? [];

  const [thumbnailAsset, taskImage, overviewSvg, detailedSvg] =
    await Promise.all([
      resolveAsset(cfg, slug, card.thumbnail),
      resolveAsset(cfg, slug, card.task_image),
      opts.withDiagrams
        ? resolveAsset(cfg, slug, card.image_overview)
        : Promise.resolve(undefined),
      opts.withDiagrams
        ? resolveAsset(cfg, slug, card.image_detailed)
        : Promise.resolve(undefined),
    ]);

  const thumbnail =
    thumbnailAsset ?? taskImage ?? overviewSvg ?? DEFAULT_THUMBNAIL;

  return {
    slug,
    name: card.title ?? slug,
    subtitle: card.subtitle,
    category: card.category ?? DEFAULT_CATEGORY,
    order: typeof card.order === "number" ? card.order : undefined,
    chipsets: chipsetsFromTags(tags),
    primaryType: card.primary_type,
    secondaryTypes: card.secondary_types ?? [],
    license: card.license,
    size: card.size,
    releaseDate: card.release_date,
    datasets: card.datasets,
    keyNovelty: card.key_novelty ?? "",
    description: opts.description ?? "",
    quickStart: opts.quickStart ?? "",
    relatedModels: card.related_models ?? [],
    overviewSvg,
    detailedSvg,
    taskImage,
    thumbnail,
    hasDiagrams: Boolean(overviewSvg && detailedSvg),
    links: linksFor(cfg, slug, card),
  };
}

// Section headings the catalog understands. Only these known sections are
// surfaced; any other README section (e.g. Legal information, Disclaimer) is
// ignored so unexpected content never leaks onto the page.
const QUICK_START_HEADINGS = ["how to use"];

type Section = { heading: string; key: string; body: string };

// Parses the README body into an intro (text before the first top-level
// heading) and a list of top-level (`#`) sections. The leading H1 duplicates
// the page title and is dropped.
function parseSections(body: string): { intro: string; sections: Section[] } {
  const withoutTitle = body.replace(/^#\s+.*\r?\n+/, "").trim();
  const re = /^#\s+(.+?)\s*$/gm;
  const matches = [...withoutTitle.matchAll(re)];

  if (matches.length === 0) {
    return { intro: withoutTitle, sections: [] };
  }

  const intro = withoutTitle.slice(0, matches[0].index).trim();
  const sections: Section[] = matches.map((m, i) => {
    const start = m.index ?? 0;
    const end = matches[i + 1]?.index ?? withoutTitle.length;
    return {
      heading: m[1].trim(),
      key: m[1].trim().toLowerCase(),
      body: withoutTitle.slice(start, end).trim(),
    };
  });

  return { intro, sections };
}

// Assembles the main-page description and the Quick Start guide from known
// sections only. The intro (text before the first heading) stays on the main
// page; recognized sections route to their surface; everything else is dropped.
function splitReadme(body: string): {
  description: string;
  quickStart: string;
} {
  const { intro, sections } = parseSections(body);

  const pick = (keys: string[]): string =>
    sections
      .filter((s) => keys.includes(s.key))
      .map((s) => s.body)
      .join("\n\n");

  return { description: intro, quickStart: pick(QUICK_START_HEADINGS) };
}

// Extracts the `cursor=...` value from the RFC 5988 Link header's rel="next".
function nextCursorFromLink(link: string | null): string | null {
  if (!link) {
    return null;
  }
  const next = link.split(",").find((part) => /rel="next"/.test(part));
  if (!next) {
    return null;
  }
  const url = next.match(/<([^>]+)>/)?.[1];
  if (!url) {
    return null;
  }
  return new URL(url).searchParams.get("cursor");
}

export type ModelPage = {
  models: Model[];
  nextCursor: string | null;
};

// Fetches one page of grid models. `domainTag` scopes the query to a single
// Hugging Face collection tag (repeated `filter` values AND on the server, so
// only one domain can be pushed down); undefined lists the whole org.
export async function listModelsPage(
  cfg: HfConfig,
  opts: { domainTag?: string; cursor?: string | null } = {},
): Promise<ModelPage> {
  const params = new URLSearchParams({
    author: cfg.org,
    limit: String(PAGE_SIZE),
    full: "true",
    cardData: "true",
  });
  // The catalog marker is always ANDed in so only catalog repos are listed,
  // excluding experimental repos in the same org.
  if (cfg.catalogTag) {
    params.append("filter", cfg.catalogTag);
  }
  if (opts.domainTag) {
    params.append("filter", opts.domainTag);
  }
  if (opts.cursor) {
    params.append("cursor", opts.cursor);
  }

  const res = await fetch(`${HF}/api/models?${params.toString()}`, {
    headers: authHeaders(cfg),
  });
  if (!res.ok) {
    throw new Error(`Failed to list models: ${res.status}`);
  }

  const raw = (await res.json()) as HfModel[];
  const models = await Promise.all(
    raw.map((m) => mapModel(cfg, m, { withDiagrams: false })),
  );

  return {
    models,
    nextCursor: nextCursorFromLink(res.headers.get("link")),
  };
}

// Fetches a single model with full detail (diagrams + README body) for the
// model page.
export async function getModel(cfg: HfConfig, slug: string): Promise<Model> {
  const params = new URLSearchParams({ full: "true", cardData: "true" });
  const [metaRes, readmeRes] = await Promise.all([
    fetch(`${HF}/api/models/${cfg.org}/${slug}?${params.toString()}`, {
      headers: authHeaders(cfg),
    }),
    fetch(resolveUrl(cfg, slug, "README.md"), { headers: authHeaders(cfg) }),
  ]);

  if (!metaRes.ok) {
    throw new Error(`Failed to fetch model ${slug}: ${metaRes.status}`);
  }

  const raw = (await metaRes.json()) as HfModel;
  const body = readmeRes.ok
    ? stripFrontMatter(await readmeRes.text()).trim()
    : "";
  const { description, quickStart } = splitReadme(body);

  return mapModel(cfg, raw, { withDiagrams: true, description, quickStart });
}

export async function getBenchmarks(): Promise<BenchmarkEntry[]> {
  const res = await fetch("/benchmarks/benchmarks.json");
  if (!res.ok) {
    throw new Error(
      `Failed to fetch benchmarks: ${res.status} ${res.statusText}`,
    );
  }
  return res.json() as Promise<BenchmarkEntry[]>;
}
