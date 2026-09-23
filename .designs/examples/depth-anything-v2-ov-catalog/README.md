---
title: "Depth Anything V2"
subtitle: "Foundation model for robust monocular depth estimation"
category: "Vision AI"
model_type:
  - "Depth Estimation"
key_novelty: "A foundation model for monocular depth that delivers robust, fine-grained depth prediction and scales across model sizes from 25M to 1.3B parameters."
thumbnail: assets/thumbnail.png
code: "https://github.com/DepthAnything/Depth-Anything-V2"
paper: "https://arxiv.org/html/2406.09414v1"
tags:
  - robotics-ai-suite
  - vision-ai
  - "category:spatial-perception"
---

# Depth Anything V2

Monocular depth estimation predicts depth information from a single image — a challenging task due to the inherent ambiguity and lack of explicit 3D cues in 2D images. Depth Anything V2 is a powerful foundation model for monocular depth estimation. It is capable of:

- providing robust and fine-grained depth prediction,
- supporting extensive applications with varied model sizes (from 25M to 1.3B parameters),
- being easily fine-tuned to downstream tasks as a promising model initialization.

**Model architecture**

- Train a reliable teacher model based on DINOv2-G purely on high-quality synthetic images.
- Produce precise pseudo depth on large-scale unlabeled real images.
- Train final student models on pseudo-labeled real images for robust generalization.

**References**

- Paper: <https://arxiv.org/html/2406.09414v1>
- Source: <https://github.com/DepthAnything/Depth-Anything-V2>

# How to Use

Depth Anything V2 is trained with PyTorch and reaches optimized inference on Intel devices via OpenVINO. Convert the PyTorch model to OpenVINO IR by first exporting to ONNX.

### 1. Export to ONNX

The [Depth-Anything-ONNX](https://github.com/fabio-sim/Depth-Anything-ONNX) repository provides a `dynamo.py` command-line tool for this conversion (Python 3.11+).

```bash
pip install -r requirements.txt
python dynamo.py export --encoder vitb --output weights/vitb.onnx --use-dynamo -h 518 -w 518
```

- `--encoder vitb` — encoder type (e.g. `vitb` for Vision Transformer-B).
- `--output weights/vitb.onnx` — output path for the ONNX model.
- `--use-dynamo` — enables `torch.compile` via Dynamo for optimized tracing.
- `-h 518 -w 518` — height and width of the input images.

### 2. Convert ONNX to OpenVINO IR

Install OpenVINO ([install via pip](https://docs.openvino.ai/2026/get-started/install-openvino/install-openvino-pip.html)), then convert with `ovc`:

```bash
ovc vitb.onnx
```

By default this produces FP16 IR (`vitb.xml` topology, `vitb.bin` weights). For FP32:

```bash
ovc vitb.onnx --compress_to_fp16=False
```
