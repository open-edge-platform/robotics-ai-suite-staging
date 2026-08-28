# Hugging Face model catalog

## Context

The model catalog has three views:

- **Model grid:** lists models and supports filtering by domain. Each card shows metadata and a thumbnail.
- **Model page:** shows the complete model card and, when available, model architecture diagrams.
- **Model benchmarks:** renders benchmark results on a shared scale for visual model comparison.

The catalog must reflect model updates without duplicating model metadata and assets in this repository.

## Solution

Use Hugging Face as the catalog backend and single source of truth. Each model and its catalog content are stored in a Hugging Face model repository. Hugging Face collections define model membership for each domain. Each model duplicates its collection name as a tag so the models API can filter by domain. The browser retrieves model metadata and repository files through the Hugging Face API.

Each model repository follows the layout and YAML header schema defined in [Model Catalogue Metadata Convention](./model-catalogue.md).

## Grid pagination

The grid fetches models in pages and appends the next page as the user scrolls. The UI contains a predefined set of domains and sends the corresponding collection-name tag when requesting a page. Model metadata and thumbnails are cached after loading.

## Model grid API

Fetch one page of models from an organization:

```http
GET https://huggingface.co/api/models?author={organization}&filter={collection-name}&filter=chipset:{chipset-name}&limit={page-size}&full=true&cardData=true
```

Example response:

```http
HTTP/2 200
content-type: application/json; charset=utf-8
link: <https://huggingface.co/api/models?author={organization}&filter={collection-name}&filter=chipset:{chipset-name}&limit={page-size}&full=true&cardData=true&cursor={cursor}>; rel="next"

[
  {
    "id": "{organization}/{model}",
    "sha": "{revision}",
    "tags": [
      "{collection-name}",
      "chipset:{chipset-name}"
    ],
    "cardData": {
      "title": "{model-name}",
      "key_novelty": "{model-novelty}",
      "thumbnail": "assets/thumbnail.webp"
    }
  }
]
```

Follow the URL from the `Link` header to fetch the next page. Omit filters that are not selected.

For each model, construct the thumbnail URL from the model ID and `cardData.thumbnail`:

```http
GET https://huggingface.co/{organization}/{model}/resolve/main/{thumbnail-path}
```

A page containing $N$ models requires one list request and up to $N$ thumbnail requests on its first uncached load. See [ADR-1](#adr-1-fetch-directly-from-hugging-face).

## Model page API

Fetch the selected model metadata and repository file list:

```http
GET https://huggingface.co/api/models/{organization}/{model}?full=true&cardData=true&blobs=true
```

Fetch the model-card content:

```http
GET https://huggingface.co/{organization}/{model}/resolve/main/README.md
```

Fetch each available architecture diagram using its repository-relative path:

```http
GET https://huggingface.co/{organization}/{model}/resolve/main/{architecture-path}
```

## References

- [Hugging Face Hub API](https://huggingface.co/docs/hub/api)
- [Hugging Face collections](https://huggingface.co/docs/hub/collections)
- [Hugging Face evaluation results](https://huggingface.co/docs/hub/eval-results)
- [Hugging Face Hub API rate limits](https://huggingface.co/docs/hub/rate-limits)

## Appendices

### ADR-1: Fetch directly from Hugging Face

**Status:** Accepted

#### Context

The Hugging Face models endpoint returns model metadata and thumbnail paths, but not the thumbnail files. For a page of $N$ models, the browser therefore makes one model-list request and up to $N$ thumbnail requests: $N+1$ requests on the first uncached load.

Two solutions were considered:

1. **Direct Hugging Face access:** the browser fetches model metadata and thumbnails from Hugging Face.
2. **Custom backend:** the browser fetches an aggregated catalog response from a proxy that retrieves and caches Hugging Face metadata and thumbnails. This can reduce requests from the browser, but requires another service and concentrates Hugging Face API usage behind the service, increasing the likelihood of throttling as traffic grows.

#### Decision

Use direct Hugging Face access. The browser loads models in paginated chunks, loads thumbnails separately, and caches both metadata and thumbnails. The additional cacheable thumbnail requests are accepted to avoid a custom backend and keep the integration simple.
