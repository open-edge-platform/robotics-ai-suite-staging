---
title: "Fast-BEV"
subtitle: "Fast multi-camera bird's-eye-view perception"
category: "Vision AI"
model_type:
  - "BEV Perception"
key_novelty: "Speeds up bird's-eye-view perception with a Fast-Ray transformation (precomputed image-to-voxel look-up-table, multi-view to one-voxel), a multi-scale image encoder, and temporal fusion."
thumbnail: assets/thumbnail.png
code: "https://github.com/Sense-GVT/Fast-BEV"
paper: "https://arxiv.org/pdf/2301.12511"
tags:
  - robotics-ai-suite
  - vision-ai
  - "category:spatial-perception"
---

# Fast-BEV

Bird's eye view (BEV) perception views a scene from directly above, giving a comprehensive understanding of the spatial layout and relationships between objects. It is widely used for obstacle avoidance, path planning, localization and mapping. Fast-BEV is a representative BEV algorithm optimized for speed.

**Model architecture**

- **Fast-Ray transformation** — precomputes the image-to-voxel index (look-up-table) and projects all cameras to the same dense voxel (multi-view to one-voxel) to speed up projection.
- **Multi-scale image encoder** with multi-scale projection to obtain multi-scale features.
- **Efficient BEV encoder** designed to speed up inference time.
- **Data augmentation** on image and BEV domains to reduce over-fitting.
- **Temporal fusion module** in the BEV encoder stage to leverage multi-frame information.

**References**

- Paper: <https://arxiv.org/pdf/2301.12511>
- Source: <https://github.com/Sense-GVT/Fast-BEV>

# How to Use

Fast-BEV is trained with PyTorch and reaches optimized inference on Intel devices via OpenVINO. The pretrained models (`model.zip`) can be downloaded from [Google Drive](https://drive.google.com/file/d/1wwwckM0vux5ub3U4R_zS9pm01QFmMPru/view); the archive contains the FastBEV ONNX and PyTorch models plus ResNet18 INT8 ONNX/PTQ models.

### ONNX model directory structure

```text
├── resnet18
│   ├── fastbev-det.pth
│   ├── fastbev_post_trt_decode.onnx
│   ├── fastbev_post_trt.onnx
│   ├── fastbev_pre_trt.onnx
├── resnet18int8
│   ├── fastbev_post_trt_decode.onnx
│   ├── fastbev_pre_trt.onnx
│   └── fastbev_ptq.pth
└── resnet18int8head
    ├── bev_ptq_head.pth
    ├── fastbev_post_trt_decode.onnx
    └── fastbev_pre_trt.onnx
```

### Convert ONNX to OpenVINO IR with `ovc`

Install OpenVINO ([install via pip](https://docs.openvino.ai/2026/get-started/install-openvino/install-openvino-pip.html)), then convert each ONNX model:

```bash
cd resnet18
ovc fastbev_post_trt_decode.onnx
ovc fastbev_post_trt.onnx
ovc fastbev_pre_trt.onnx
```

By default this produces FP16 IR, generating a `.xml` (topology) and `.bin` (weights) for each model, ready for OpenVINO inference on Intel hardware.
