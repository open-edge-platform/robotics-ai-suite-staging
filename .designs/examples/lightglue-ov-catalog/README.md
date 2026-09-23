---
title: "LightGlue"
subtitle: "Lightweight, adaptive local feature matching"
category: "Vision AI"
model_type:
  - "Feature Matching"
key_novelty: "An adaptive-depth-and-width transformer matcher that reduces layers for easy image pairs and prunes confidently rejected points early, enabling efficient real-time feature matching."
thumbnail: assets/thumbnail.png
code: "https://github.com/cvg/LightGlue"
paper: "https://arxiv.org/pdf/2306.13643"
tags:
  - robotics-ai-suite
  - vision-ai
  - "category:spatial-perception"
---

# LightGlue

LightGlue is a model designed for efficient and accurate feature matching, which is crucial for applications like image stitching, 3D reconstruction, and visual localization. It provides a lightweight, high-performance solution that leverages deep learning to improve the robustness and accuracy of feature matching while being optimized for real-time performance.

**Model architecture**

- **Transformer backbone** — each layer is a succession of one self-attention unit and one cross-attention unit.
- **Correspondence prediction** — a lightweight head predicts an assignment given the updated state at any layer.
- **Adaptive depth and width** — reduces the number of layers depending on the difficulty of the input image pair and prunes points that are confidently rejected early.
- **Supervised training in two stages** — first trained to predict correspondences, then the confidence classifier, so the latter does not affect final-layer accuracy or convergence.

**References**

- Paper: <https://arxiv.org/pdf/2306.13643>
- Source: <https://github.com/cvg/LightGlue>

# How to Use

LightGlue is trained with PyTorch and reaches optimized inference on Intel devices via OpenVINO. Convert the PyTorch model to OpenVINO IR by first exporting to ONNX.

### 1. Export to ONNX

The [LightGlue-ONNX](https://github.com/fabio-sim/LightGlue-ONNX) repository provides a `dynamo.py` command-line tool (Python 3.11+).

```bash
pip install opencv-python==4.11.0.86 torch==2.6.0 typer==0.15.2 onnx==1.17.0 onnxruntime==1.21.0
python dynamo.py export --output weights/superpoint_lightglue_pipeline_static.onnx --batch-size 2 --height 1280 --width 720
```

- `--batch-size 2` — batch size for inference.
- `--output weights/superpoint_lightglue_pipeline_static.onnx` — output path for the ONNX model.
- `--height 1280 --width 720` — height and width of the input images.

### 2. Convert ONNX to OpenVINO IR

Install OpenVINO ([install via pip](https://docs.openvino.ai/2026/get-started/install-openvino/install-openvino-pip.html)), then convert with `ovc`:

```bash
ovc superpoint_lightglue_pipeline_static.onnx
```

By default this produces FP16 IR (`.xml` topology, `.bin` weights). For FP32:

```bash
ovc superpoint_lightglue_pipeline_static.onnx --compress_to_fp16=False
```
