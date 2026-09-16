# Model Architecture Browser

## Problem

The model catalogue currently displays overview and detailed architecture SVGs
as static images. A diagram can include reusable components such as an encoder, language
model, or decoder, but a user cannot open the architecture of those reusable components.

## Proposal

The `models_gallery` GitHub repository stores the architecture diagrams and
their metadata. Its CI workflow publishes these files to S3, and CloudFront
exposes them over HTTP.

When a model card declares a Model Gallery id, the catalogue adds a Model
Architecture tab. The tab hosts a model diagram browser: it displays the model's
architecture diagram and lets the user open the diagram of nested components, then step back to the parent.

## Responsibilities

### Models Gallery

The Model Gallery owns the architecture diagrams and their metadata. Each model
entry, identified by `model_family/model_id`, provides an overview and a
detailed architecture SVG. Inside a diagram, a component that maps to another
entry carries that entry's `svg://model_family/model_id` link.

See the [Model Gallery convention](https://github.com/intel-innersource/applications.ai.geti.models-gallery/blob/main/README.md#metadata-conventions)
for the layout and diagram authoring rules.

### Model catalogue

The Hugging Face model card carries an optional `model_gallery_id` field in the
form `model_family/model_id`. When present, the catalogue renders the Model
Architecture tab and hands the id to the Model Architecture Browser. If the
field is absent, the model has no Architecture tab.

```yaml
model_gallery_id: smolvla/smolvla-libero-fp16-ov
```

### Model Architecture Browser

The Model Architecture Browser renders in the Architecture tab and receives the
root `model_gallery_id`. It:

- computes the overview and detailed diagram URLs from the id;
- fetches the selected diagram and displays it inline;
- highlights the clickable components — the elements wrapped in an
  `svg://model_family/model_id` link;
- reads each link's `model_family/model_id` and computes its diagram URL the
  same way as for the root model; and
- opens the nested model on selection and returns to the previous one via Back.

The browser keeps the current detail level when opening a nested model: a simple
diagram links to the nested simple diagram, a detailed diagram to the nested
detailed one, falling back to whichever level the nested model provides.
