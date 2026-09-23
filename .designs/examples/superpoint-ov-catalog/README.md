---
title: "SuperPoint"
subtitle: "Self-supervised interest point detection and description"
category: "Vision AI"
model_type:
  - "Feature Extraction"
key_novelty: "A fully-convolutional, self-supervised model that jointly computes pixel-level interest points and descriptors in a single forward pass, using Homographic Adaptation to boost detection repeatability and cross-domain adaptation."
thumbnail: assets/thumbnail.png
code: "https://github.com/rpautrat/SuperPoint"
paper: "https://arxiv.org/pdf/1712.07629"
tags:
  - robotics-ai-suite
  - vision-ai
  - "category:spatial-perception"
---

# SuperPoint

SuperPoint is a self-supervised framework for interest point detection and description in images, suitable for many multiple-view geometry problems. As a fully-convolutional model it operates on full-sized images and jointly computes pixel-level interest point locations and associated descriptors in one forward pass. It introduces Homographic Adaptation — a multi-scale, multi-homography approach for boosting interest point detection repeatability and performing cross-domain adaptation (e.g., synthetic-to-real) — and gives state-of-the-art homography estimation compared with traditional algorithms such as LIFT, SIFT and ORB.

**Model architecture**

- **Shared encoder** — a shared CNN encoder processes the input image and extracts feature maps used for both keypoint detection and descriptor generation.
- **Detector head** — predicts keypoint locations as a probability heatmap.
- **Descriptor head** — generates dense, typically 256-dimensional descriptors for each pixel.

**References**

- Paper: <https://arxiv.org/pdf/1712.07629>
- Source: <https://github.com/rpautrat/SuperPoint>

# How to Use

SuperPoint is trained with TensorFlow and can be converted directly to OpenVINO IR for optimized inference on Intel devices.

### 1. Download the pretrained model

Download **sp_v6.tgz** from [SuperPoint Pretrained Models](https://github.com/rpautrat/SuperPoint/tree/master/pretrained_models) and extract it:

```bash
tar -xvzf sp_v6.tgz
```

### 2. Convert the TensorFlow model to OpenVINO IR

Install OpenVINO ([install via pip](https://docs.openvino.ai/2026/get-started/install-openvino/install-openvino-pip.html)), then convert with `ovc`:

```bash
cd sp_v6
ovc ./ --input [1,1280,720,1]
```

`--input [1,1280,720,1]` specifies the input dimensions: batch size `1`, height `1280`, width `720`, and `1` channel (grayscale; use `3` for color). By default this produces FP16 IR (`sp_v6.xml` topology, `sp_v6.bin` weights). For FP32:

```bash
ovc ./ --input [1,1280,720,1] --compress_to_fp16=False
```
