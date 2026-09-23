---
title: "Pi0"
subtitle: "Vision-language-action model for general-purpose robotics"
category: "Physical AI"
model_type:
  - "Vision Language Action"
primary_type: "Vision Language Action"
key_novelty: "Integrates vision, language, and action for general-purpose robotic tasks, combining a PaliGemma-initialized VLM backbone with a diffusion-transformer action expert."
thumbnail: assets/thumbnail.png
code: "https://github.com/Physical-Intelligence/openpi"
paper: "https://www.pi.website/download/pi0.pdf"
tags:
  - robotics-ai-suite
  - physical-ai
  - "category:action-policies-vla"
---

# Pi0

Pi0, created by Physical Intelligence, is a robotic model designed to integrate vision, language, and action (VLA) for general-purpose robotic tasks.

**Model architecture**

- A larger VLM backbone with weights initialized from PaliGemma, pre-trained on large-scale Internet data.
- A smaller action expert (Diffusion Transformer) that addresses robot states and generates actions.

**References**

- Paper: <https://www.pi.website/download/pi0.pdf>
- Homepage: <https://www.pi.website/blog/pi0>
- Source: <https://github.com/Physical-Intelligence/openpi>
