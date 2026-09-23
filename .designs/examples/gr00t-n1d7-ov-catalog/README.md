---
title: "GR00T-N1.7"
subtitle: "Embodied AI foundation model for robot manipulation"
category: "Physical AI"
model_type:
  - "Vision Language Action"
primary_type: "Vision Language Action"
key_novelty: "Isaac-GR00T embodied AI foundation-model stack for robot manipulation and generalist control, with an end-to-end OpenVINO pipeline accelerating inference on Intel platforms."
thumbnail: assets/thumbnail.png
code: "https://github.com/open-edge-platform/edge-ai-suites/tree/main/robotics-ai-suite/pipelines/gr00t-n1d7-ov"
tags:
  - robotics-ai-suite
  - physical-ai
  - "category:action-policies-vla"
---

# GR00T-N1.7

Isaac-GR00T is an open embodied AI foundation-model stack for robot manipulation and generalist control, designed for workflows involving perception, reasoning, and action generation in robotics applications. This implementation accelerates GR00T-N1.7 inference on Intel platforms with the OpenVINO toolkit and provides a comprehensive end-to-end pipeline.

**References**

- OpenVINO pipeline source: <https://github.com/open-edge-platform/edge-ai-suites/tree/main/robotics-ai-suite/pipelines/gr00t-n1d7-ov>
- Upstream project: <https://github.com/NVIDIA/Isaac-GR00T>

# How to Use

This project extends the open-source [isaac-gr00t](https://github.com/NVIDIA/Isaac-GR00T) with OpenVINO acceleration on Intel compute platforms.

### 1. Install

Initialize and patch the submodule, then set up the environment:

```bash
git submodule update --init --recursive isaac-gr00t
cd isaac-gr00t
git am --whitespace=fix ../patches/*.patch

sudo apt install -y libegl1-mesa-dev libglu1-mesa ffmpeg
uv sync --all-extras
```

Alternatively, create a Python environment directly:

```bash
python3 -m venv gr00t_env
source gr00t_env/bin/activate
pip install -e . --extra-index https://download.pytorch.org/whl/cpu
```

### 2. Prepare the model

Running inference with OpenVINO requires converting the model to IR. You can download a finetuned checkpoint for a simulation task:

```bash
uv run hf download nvidia/GR00T-N1.7-LIBERO \
  --include "libero_10/config.json" "libero_10/embodiment_id.json" \
            "libero_10/model-*.safetensors" "libero_10/model.safetensors.index.json" \
            "libero_10/processor_config.json" "libero_10/statistics.json" \
  --local-dir checkpoints/GR00T-N1.7-LIBERO
```

> Using GR00T-N1.7 automatically downloads [nvidia/Cosmos-Reason2-2B](https://huggingface.co/nvidia/Cosmos-Reason2-2B); due to author restrictions this requires logging into your Hugging Face account.

### 3. Convert to OpenVINO IR

Single merged IR:

```bash
uv run python scripts/deployment/export_ov_n1d7_single_ov.py \
  --model-path checkpoints/GR00T-N1.7-LIBERO/libero_10/ \
  --dataset-path demo_data/libero_demo/ \
  --embodiment-tag LIBERO_PANDA \
  --output-dir ~/openvino_models/libero_single_direct_ov_optimal \
  --precision fp16 \
  --llm-lang-tokens 64
```

Split-component IR (ViT + LLM + VL self-attention + action head):

```bash
uv run python scripts/deployment/export_ov_n1d7.py \
  --model-path checkpoints/GR00T-N1.7-LIBERO/libero_10/ \
  --dataset-path demo_data/libero_demo/ \
  --embodiment-tag LIBERO_PANDA \
  --output-dir ~/openvino_models/libero_full_direct_optimal \
  --export-mode full_pipeline \
  --use-fused-dit \
  --precision fp16 \
  --llm-lang-tokens 64
```

### 4. Run inference

```bash
uv run python scripts/deployment/run_base_single_ov_inference.py \
  --ov-model-dir ~/openvino_models/libero_single_direct_ov_optimal \
  --embodiment-tag LIBERO_PANDA \
  --num-samples 10 \
  --device GPU \
  --static-shape
```
