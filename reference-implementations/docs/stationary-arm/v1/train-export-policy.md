---
sidebar_position: 7
---

# Step 7 — Train and export the policy

Record demonstrations, fine-tune a policy by imitation learning, and export it to OpenVINO IR so it
can run on the kit's iGPU in [Step 8](./run-application.md). This build uses
[Physical AI Studio](https://github.com/open-edge-platform/physical-ai-studio) and a
**Pi0.5** vision-language-action (VLA) policy — a pretrained foundation model fine-tuned on
OpenArm demonstrations, rather than trained from scratch.

## In this blueprint

- **Policy** — Pi0.5 (VLA), fine-tuned on OpenArm demonstrations
- **Export** — OpenVINO IR, to run on the iGPU
- **Training hardware** — Intel XPU path (`--xpu` / `--extra xpu`)
- **Base checkpoint** — pulled from the Hugging Face Hub, so set `HF_TOKEN` before training

## Steps

- **Follow** — [Physical AI Studio](https://github.com/open-edge-platform/physical-ai-studio) to
  record demonstrations, fine-tune a Pi0.5 policy, and export it to OpenVINO IR (GUI or the
  `physicalai-train` CLI/API).
- **Done when** — you have an exported OpenVINO IR policy directory that `physicalai`'s
  `InferenceModel` can load.

:::note[TODO]
Build-specific training details to be supplied:
- the OpenArm demonstration-recording setup (teleoperation, number of episodes, camera views)
- Pi0.5 fine-tuning hyperparameters and dataset layout for this task
- whether a second (wrist) camera view is required
:::
