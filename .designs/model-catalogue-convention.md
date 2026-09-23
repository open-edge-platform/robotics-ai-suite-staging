# Model Catalogue Metadata Convention

The model catalogue is backed by Hugging Face repositories. To show up in
the catalogue, a repository should implement the convention described in this
document.

## Repository layout

```text
README.md
benchmarks.yaml                 # optional
assets/
├── thumbnail.png
├── architecture-overview.svg   # optional
└── architecture-detailed.svg   # optional
```

`README.md` should start with a YAML header followed by the page body. The
following sections describe the structure of that YAML header.

## Tags

Declared in the `tags` list of the YAML header.

| Tag | Required | Purpose |
| --- | --- | --- |
| `robotics-ai-suite` | Yes | Catalogue membership marker. Repos without it are excluded from listing. |
| `physical-ai` \| `vision-ai` \| `gen-ai` | Yes | Domain. Determines the domain filter the model is listed under. |
| `category:<name>` | Yes | Category within the domain, one tag per category. A model may carry multiple category tags. Selectable via the `filter=category:<name>` parameter on the models API. `<name>` is one of the values below. |
| `chipset:<alias>` | Yes | Supported chipset, one tag per chipset. Rendered as a badge and selectable via the `filter=chipset:<alias>` parameter on the models API. `<alias>` is one of the aliases below. |

Categories are scoped to a domain:

| Domain | Category names |
| --- | --- |
| `gen-ai` | `text-reasoning`, `vision-language`, `speech-audio`, `image-video-generation` |
| `physical-ai` | `world-action-models`, `action-policies-vla` |
| `vision-ai` | `detection`, `segmentation`, `classification`, `spatial-perception` |

Chipset aliases:

| Alias | Chipset |
| --- | --- |
| `ptl` | Core Ultra 3 Panther Lake |

## YAML header

### Required

| Field | Type | Description |
| --- | --- | --- |
| `title` | string | Model name, shown on the card and page. |
| `thumbnail` | path | Repo-relative path to the card image, e.g. `assets/thumbnail.png`. |

### Optional

Omitted fields are handled gracefully; the corresponding UI element is hidden.

| Field | Type | Description |
| --- | --- | --- |
| `subtitle` | string | One-line tagline under the title. |
| `category` | string | Display label for the domain, e.g. `"Physical AI"`. |
| `model_type` | string[] | Subcategories within the domain, e.g. `["Imitation Learning"]` or `["Segmentation", "Classification"]`.  |
| `order` | integer | Sort weight within a domain. |
| `primary_type` | string | Primary type badge, e.g. `"Vision Language Action"`. |
| `secondary_types` | string[] | Secondary type badges. |
| `key_novelty` | string | Summary sentence shown near the top of the page. |
| `license` | string | SPDX license identifier. |
| `size` | string | Model size. |
| `release_date` | string | Release date. |
| `datasets` | string[] | Training/evaluation datasets. |
| `image_overview` | path | Architecture overview SVG (see [Architecture diagrams](#architecture-diagrams)). |
| `image_detailed` | path | Detailed architecture SVG (see [Architecture diagrams](#architecture-diagrams)). |
| `task_image` | path | Task illustration image. |
| `related_models` | string[] | Related model slugs (repo names), e.g. `act-fp16-ov-catalog`. MUST reference other models in this catalogue only. |
| `code` | url | Source code URL. |
| `paper` | url | Paper URL. |

## Architecture diagrams

The architecture tab renders only if the repo provides **both**
`image_overview` and `image_detailed`. If only one or neither is set, the tab
is omitted.

## README body

Only two parts of the Markdown body are parsed; everything else is dropped.

| Body part | Rendered as |
| --- | --- |
| Text before the first `#` heading | Model description |
| `# How to Use` section | Quick Start tab |

The leading `#` title line is redundant with `title` and is ignored. Any
other section (e.g. legal notices) is not rendered.

## Benchmarks

Performance results live in a `benchmarks.yaml` file at the repository root,
separate from `README.md`. Hugging Face renders it on the model card, and a
crawler aggregates it into the catalogue benchmark feed. Its structure is
defined in the [Model Benchmark Convention](./benchmarks-convention.md).

## Minimal example

```markdown
---
title: "My Model"
subtitle: "One-line tagline"
category: "Physical AI"
model_type:
  - "Imitation Learning"
primary_type: "Vision Language Action"
secondary_types:
  - Robotics
key_novelty: "What makes this model distinct, in one sentence."
thumbnail: assets/thumbnail.png
image_overview: assets/architecture-overview.svg
image_detailed: assets/architecture-detailed.svg
related_models:
  - act-fp16-ov-catalog
  - pi05-libero-fp16-ov-catalog
license: apache-2.0
code: "https://github.com/org/repo"
tags:
  - robotics-ai-suite
  - physical-ai
  - "category:action-policies-vla"
  - "chipset:ptl"
---

# My Model

Description shown on the model page. Everything before the first `#` heading
becomes the description.

# How to Use

Usage example shown in the Quick Start tab.
```
