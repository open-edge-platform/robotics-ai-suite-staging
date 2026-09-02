# Model Architecture Overlays

## Context

The model catalogue displays first-party models published in the OpenVINO
toolkit Hugging Face organization.

A first-party model can contain other models as components. An encoder or a
decoder is one example. A component can be another first-party model or a model
published by a third party.

We own the first-party model repositories and their catalogue metadata. We do
not own third-party model repositories or publish their weights. Third-party
models must not appear as models in our Hugging Face organization or in the
catalogue grid.

We create architecture diagrams for some third-party models. These diagrams
allow the catalogue to show the architecture of components nested inside a
first-party model. The diagrams are metadata added by us to an existing
third-party model.

The metadata and diagrams for third-party models are maintained in the
`models_gallery` repository. Multiple first-party models can reference the same
third-party model and reuse its diagrams.

## Developer Experience

1. Publish the first-party model to the OpenVINO toolkit Hugging Face
   organization.
2. Add its catalogue metadata to the model card.
3. The model appears in the catalogue.
4. Add first-party architecture diagrams to the model repository when they are
   ready.
5. The catalogue displays the Architecture tab for the first-party model.
6. Add diagrams for a third-party component to `models_gallery`.
7. Publish the `models_gallery` metadata and diagrams to S3.
8. Add the third-party component reference to the first-party model card.
9. The catalogue finds the component in the published `models_gallery`
   metadata.
10. The catalogue displays the component diagrams inside the first-party
    model's architecture view.

## Implementation

### `models_gallery`

`models_gallery` is the source of the architecture metadata created for
third-party models. It stores a mapping between an upstream model and its
diagram files.

```yaml
upstream:
  provider: huggingface
  repository: meta-llama/Llama-3.2-1B
  revision: <commit-sha>

diagrams:
  overview: architecture-overview.svg
  detailed: architecture-detailed.svg
```

The publication workflow validates the metadata and diagram files. It publishes
them to S3. The published metadata provides an index for model lookup. Diagram
paths include the upstream revision so that each diagram remains associated
with the model version it describes.

### First-Party Model Metadata

The first-party model card lists the external models used as components.

```yaml
components:
  - role: encoder
    upstream:
      provider: huggingface
      repository: meta-llama/Llama-3.2-1B
      revision: <commit-sha>
```

The component reference contains the same upstream identity used by
`models_gallery`. It does not contain an S3 diagram path.

### Catalogue Resolution

The catalogue loads the first-party model card from Hugging Face. It reads the
component references. It looks up each component in the published
`models_gallery` metadata. When diagrams are available, it loads them from S3
and displays them in the first-party model's architecture view.

Third-party components do not appear in the catalogue grid. They do not receive
standalone catalogue model pages.