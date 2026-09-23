# Model catalogue bundles — OpenVINO models (draft)

Ready-to-publish Hugging Face repo bundles converted from the Sphinx "OpenVINO
Model Guidance" pages (`docs/user-guide/ai_resources/openvino/models/`) to the
convention in [../model-catalogue-convention.md](../model-catalogue-convention.md).

Each folder maps 1:1 to a Hugging Face repo. To appear in the `/models/`
catalogue, publish a folder as a repo under the configured org (`hfOrg`, default
`modelapi`) — the site lists repos tagged `robotics-ai-suite` at runtime; nothing
here renders locally.

**[act-fp16-ov-catalog](./act-fp16-ov-catalog/) is the reference template.** It is
the only fully-populated bundle: verified taxonomy, both architecture diagrams
(Architecture tab lit up), and a complete Quick Start. Model the others on it.

## Contents

Every field below is taken from the source page or verified data — no invented
values. Fields that could not be verified are omitted (the UI hides them).

| Bundle | Domain / category | Thumbnail | Quick Start | Chipset |
| --- | --- | --- | --- | --- |
| act-fp16-ov-catalog | physical-ai / action-policies-vla | yes | yes | nvl, ptl |
| bc-rnn-ov-catalog | physical-ai / action-policies-vla | — | — | — |
| cns-ov-catalog | physical-ai / (uncategorised) | — | yes | — |
| depth-anything-v2-ov-catalog | vision-ai / spatial-perception | yes | yes | — |
| diffusion-policy-ov-catalog | physical-ai / action-policies-vla | yes | yes | — |
| fast-bev-ov-catalog | vision-ai / spatial-perception | yes | yes | — |
| gr00t-n1d7-ov-catalog | physical-ai / action-policies-vla | yes | yes | — |
| graspnet-ov-catalog | physical-ai / (uncategorised) | yes | — | — |
| idp3-ov-catalog | physical-ai / action-policies-vla | — | yes | — |
| lightglue-ov-catalog | vision-ai / spatial-perception | yes | yes | — |
| pi0-ov-catalog | physical-ai / action-policies-vla | yes | — | — |
| rdt-1b-ov-catalog | physical-ai / action-policies-vla | — | yes | — |
| superpoint-ov-catalog | vision-ai / spatial-perception | yes | yes | — |

## Open items (require owner-supplied facts before publishing)

These are gaps I did not fill with guesses:

- **Chipset** — only ACT has benchmark-verified chipsets (`nvl`, `ptl`). Every other
  bundle omits the `chipset:<alias>` tag because no source states validated silicon.
  Add the tag once a chipset is confirmed; without it the model still lists under its
  domain but shows no chipset badge and is not chipset-filterable.
- **Missing thumbnail** — `bc-rnn`, `cns`, `idp3`, `rdt-1b` have no image in the source
  (cns's was commented out; rdt-1b's reference is broken/missing). They fall back to the
  default catalogue icon until a real image is added.
- **Empty Quick Start** — `bc-rnn`, `graspnet`, `pi0` have an empty "Model Conversion"
  section in the source, so no `# How to Use` was authored (none invented).
- **Uncategorised** — `cns` (visual servoing) and `graspnet` (grasp detection) do not map
  cleanly to a fixed domain category, so the `category:<name>` tag is omitted rather than
  forced.
- **Architecture tab** — only ACT provides both `image_overview` and `image_detailed`. The
  others would each need two diagrams (source pages have at most one raster image).
- **Licenses / size / datasets / order** — not stated in the sources, so these optional
  fields are omitted everywhere.
