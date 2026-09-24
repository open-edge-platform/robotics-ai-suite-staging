# Model Benchmark Convention

Each model repository stores its performance results in `benchmarks.yaml` at the
repository root. The Hugging Face model card renders that file directly. A
crawler reads `benchmarks.yaml` from every catalogue repository and aggregates
the results into a single dataset, stored in S3 and served over HTTP to the
catalogue UI. The storage format is not yet decided.

## Document structure

Each entry is one result for a single `(task, hardware)` pair. A model evaluated
on three chipsets produces three entries per task.

```yaml
schema_version: "1.0"

benchmarks:
  - name: OpenVINO inference
    task: detection
    hardware: ptl
    dataset: COCO val2017

    metrics:
      - name: throughput
        value: 104.4
        unit: fps
        higher_is_better: true
      - name: inference-latency
        value: 9.6
        unit: ms
        higher_is_better: false

    context:
      precision: FP16
      runtime: OpenVINO
      batch_size: 1
```

## Fields

### Root fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `schema_version` | string | Yes | Contract version. Version 1 documents must use `"1.0"`. |
| `benchmarks` | array | Yes | One or more benchmark result entries. |

### Benchmark fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Benchmark or evaluation name. |
| `task` | string | Yes | Evaluated task. See recommended values below. |
| `hardware` | string | Yes | Chipset alias the result was measured on. See recommended values below. |
| `dataset` | string | No | Evaluation dataset and, when relevant, its version or split. |
| `metrics` | array | Yes | Measurements produced by the benchmark. Must not be empty. |
| `context` | object | No | Additional benchmark, workload, model, or environment information. |

Recommended `task` values (not enforced):

| Domain | Tasks |
| --- | --- |
| `physical-ai` | `pick-and-place` |
| `vision-ai` | `detection`, `classification`, `segmentation` |
| `gen-ai` | `image-generation`, `speech-to-text`, `text-generation` |

Recommended `hardware` values match the catalogue chipset aliases (`chipset:<alias>`):

| Alias | Chipset |
| --- | --- |
| `ptl` | Panther Lake |
| `wcl` | WildCat Lake |

### Metric fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Stable machine-readable metric identifier. Use `kebab-case`. |
| `value` | number | Yes | Numeric metric value. |
| `unit` | string | Yes | Unit associated with the value. |
| `higher_is_better` | boolean | No | Whether larger values represent better results. |

## Context

`context` is an open object for information needed to interpret a result, such as
precision, runtime, or batch size. The crawler preserves it as-is.

```yaml
context:
  precision: FP16
  runtime: OpenVINO
  batch_size: 1
```

## Validation rules

Beyond the required fields above:

1. Metric names use `kebab-case`.
2. Metric values are finite numbers. `NaN` and infinity are not allowed.
3. Unknown root, benchmark, and metric fields are rejected. Unknown fields inside
   `context` are accepted.


## Versioning

`schema_version` selects parsing and validation. Optional fields may be added
within version 1; incompatible changes require a new major version.

## Aggregated dataset

The crawler flattens every repository's `benchmarks.yaml` into a single JSON
array served to the catalogue UI at `benchmarks/benchmarks.json`. Each element is
one result for a single `(model, task, hardware)` combination.

```json
{
  "domain": "physical-ai",
  "category": ["action-policies-vla"],
  "task": "pick-and-place",
  "model": "PI0.5",
  "slug": "pi05-libero-fp16-ov-catalog",
  "hardware": "ptl",
  "precision": "fp16",
  "metrics": [
    { "name": "inference-latency", "value": 62, "unit": "ms" }
  ]
}
```

| Field | Type | Description |
| --- | --- | --- |
| `domain` | string | Model domain. One of `gen-ai`, `physical-ai`, `vision-ai`, matching the catalogue domain tag. |
| `category` | string[] | Model categories, matching the catalogue `category:<name>` tags (without the `category:` prefix). |
| `task` | string | Evaluated task. See recommended `task` values above. |
| `model` | string | Display name of the model. |
| `slug` | string | Catalogue repository name, used to link the result to its model. |
| `hardware` | string | Chipset alias the result was measured on, matching `chipset:<alias>`. |
| `precision` | string | Numeric precision of the evaluated model, e.g. `fp16`. |
| `metrics` | array | Measurements, each with `name`, `value`, and `unit`. |

`domain` and `category` carry the same values as the model's catalogue tags so a
result can be filtered by the same taxonomy as the model grid.
