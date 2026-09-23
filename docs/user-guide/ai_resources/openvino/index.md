---
orphan: true
---

# OpenVINO

[OpenVINO](https://docs.openvino.ai/) is the primary toolkit for optimizing and
deploying deep-learning inference in Robotics AI Suite applications. It supports
models from common frameworks and can target available Intel compute devices.

Use the current [OpenVINO installation documentation](https://docs.openvino.ai/latest/get-started/install-openvino.html) for the selected environment.

## Reference Applications

OpenVINO reference applications for object detection, segmentation, and
RealSense camera workflows are available in
[Demos & Blogs](../../resources/demos_and_blogs/index.md).


::::{grid} 2

:::{grid-item-card} **OpenVINO Model Guidance**
:link: models/index
:link-type: doc
:link-alt: clickable cards

Optimize and deploy perception, manipulation, and vision-language-action models with OpenVINO.
:::

:::{grid-item-card} **Pi0.5 Model Optimization**
:link: pi05-optimization
:link-type: doc
:link-alt: clickable cards

Convert, compress, benchmark, and validate the Pi0.5 vision-language-action model.
:::
::::



:::{toctree}
:hidden:

pi05-optimization
OpenVINO Physical AI Runtime <https://github.com/openvinotoolkit/physicalai>
:::


## Additional Guidance

- [OpenVINO model guidance](models/index.md) includes reusable perception,
  manipulation, and foundation-model guidance. The workflows require the
    [platform getting-started guide](../../platform_foundation/getting_started.md)
    when used with the Humanoid Toolkit.

## Benchmarking

Use the upstream [OpenVINO Benchmark Tool](https://docs.openvino.ai/2026/get-started/learn-openvino/openvino-samples/benchmark-tool.html)
to estimate deep-learning inference throughput and latency on supported Intel®
devices. Install OpenVINO and its samples with the [OpenVINO sample guidance](https://docs.openvino.ai/2026/get-started/learn-openvino/openvino-samples/get-started-demos.html)
before benchmarking.

Use the same OpenVINO version to convert a model and to run inference unless the
model's documentation explicitly supports a different compatibility path.
