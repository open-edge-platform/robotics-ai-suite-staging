# Model Architecture Browser

## Problem

The model catalogue currently displays overview and detailed architecture SVGs
as static images. A diagram can include reusable components such as an encoder, language
model, or decoder, but a user cannot open the architecture of those components.

## Proposal

The `models_gallery` GitHub repository would store the architecture descriptors
and SVG diagrams. Its CI workflow would publish these files to S3, and
CloudFront would expose them over HTTP.

The Hugging Face model card would contain a single URL to the model's
descriptor. The UI would fetch the descriptor, build a `Model` object from the
available diagrams and nested models container in the descriptor, and display it as an SVG browser.

When a user selects a component in a diagram, the browser would open that
component's diagrams. A Back button would restore the previously displayed
model diagram.

## Responsibilities

### Models Gallery

`models_gallery` repository would organize the files by model:

```text
models_gallery/
└── smolvla-libero-fp16-ov/
  ├── model.yaml
  ├── architecture-overview.svg
  └── architecture-detailed.svg
```

Each model would have one descriptor. The descriptor would contain the data
model that defines the model architecture, its SVG files, and nested
components.

### Model catalogue

The `descriptor_url` field in the Hugging Face model card would be optional.
Models without an entry in `models_gallery` would omit this field and would not
have an Architecture tab in the model catalogue.

```yaml
descriptor_url: <models-gallery-url>/smolvla-libero-fp16-ov/model.yaml
```

### Model Architecture Browser

The UI would add a Model Architecture Browser component to the Architecture
tab. The component would receive the root descriptor URL and:

- fetch the root descriptor and nested model descriptors;
- create a `Model` object containing the available diagrams and nested models;
- load and display the selected SVG inline;
- match component IDs in the descriptor to element IDs in the SVG;
- make components with nested model descriptors clickable; and
- open nested models and return to the previously displayed model.

## Descriptor and SVG

A descriptor would define a model and its components:

```yaml
upstream:
  provider: huggingface
  repository: smolvla-libero-fp16-ov
  revision: <commit-sha>

diagrams:
  overview: architecture-overview.svg
  detailed: architecture-detailed.svg

components:
  - id: vision-encoder
    descriptor: ../clip-vit-large/model.yaml
```

The component ID would match an element in each SVG that shows the component:

```html
<g id="vision-encoder">
  <!-- CLIP ViT Large visual block -->
</g>
```

The descriptor would contain the model structure and file references. The SVG
would contain the diagram and component IDs.

## Loading flow

1. The catalogue reads `descriptor_url` from the model card when it is defined.
2. The UI fetches the root descriptor from `models_gallery`.
3. The UI resolves the diagram files and nested model descriptors into a
   `Model` object.
4. The Architecture tab displays the selected SVG.
5. Selecting a component with a nested descriptor opens that model.
6. The Back action returns to the parent model.
