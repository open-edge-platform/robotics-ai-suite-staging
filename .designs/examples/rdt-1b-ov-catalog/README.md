---
title: "Robotics Diffusion Transformer (RDT-1B)"
subtitle: "1.2B-parameter diffusion foundation model for bimanual manipulation"
category: "Physical AI"
model_type:
  - "Vision Language Action"
primary_type: "Vision Language Action"
key_novelty: "A 1.2B-parameter diffusion foundation model pre-trained on 46 datasets (1M+ episodes) and fine-tuned on 6K+ ALOHA dual-arm episodes, supporting control of almost all modern manipulators."
code: "https://huggingface.co/robotics-diffusion-transformer/rdt-1b"
paper: "https://arxiv.org/pdf/2410.07864"
tags:
  - robotics-ai-suite
  - physical-ai
  - "category:action-policies-vla"
---

# Robotics Diffusion Transformer (RDT-1B)

Robotics Diffusion Transformer with 1.2B parameters (RDT-1B) is a diffusion-based foundation model for robotic manipulation. It is pre-trained on a multi-robot collection of 46 datasets with 1M+ episodes, and fine-tuned on 6K+ episodes collected on the ALOHA dual-arm robot to boost bimanual capability. It sets a new benchmark in dexterity, zero-shot generalizability, and few-shot learning, supports control of almost all modern manipulators (dual-arm, joints, EEFs, and even wheeled locomotion), and is ready for the community to fine-tune with their robots.

**Model architecture**

- **Vision encoder (SigLIP)** — processes visual input to understand the environment and objects.
- **Language encoder (T5-XXL)** — interprets natural language instructions to determine task goals.
- **Action encoder (MLP)** — encodes low-dimensional physical quantities of the robot, including proprioception, the action chunk, and the control frequency.
- **Action module (Diffusion Transformer)** — generates and executes robotic actions based on the integrated understanding of vision and language.

**References**

- Paper: <https://arxiv.org/pdf/2410.07864>
- Homepage: <https://rdt-robotics.github.io/rdt-robotics/>
- Weights: <https://huggingface.co/robotics-diffusion-transformer/rdt-1b>

# How to Use

RDT-1B consists of several components; conversion exports each to OpenVINO IR. A conversion script and Jupyter notebook are provided — refer to the Sample Pipeline (RDT installation) to prepare the environment. Download the [pre-trained RDT-1B weights](https://huggingface.co/robotics-diffusion-transformer/rdt-1b) from the Hugging Face Hub.

### Convert by script

Recommended for quickly producing OpenVINO IR. Run at the project directory:

```bash
python -m scripts.convert.ov_convert --pretrained <pretrained_rdt_model_path> --output_dir <output_dir>
```

- `<pretrained_rdt_model_path>` — path to the pre-trained RDT-1B model.
- `<output_dir>` — (optional) directory for the converted IR files (default `ov_ir`).

### Convert by Jupyter notebook

Recommended to follow the conversion step by step or modify parameters. The notebook is in the same directory as the conversion script.

```bash
pip install notebook ipywidgets
python -m ipykernel install --user --name <your_env_name> --display-name <name_displayed_in_jupyter>
jupyter notebook --notebook-dir <path_to_your_project>/scripts/convert --ip <your_ip_address> --port <your_port>
```

Open the notebook and follow the instructions to load the pre-trained model and convert its components to OpenVINO IR.
