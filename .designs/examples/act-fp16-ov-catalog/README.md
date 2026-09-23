---
title: "Action Chunking with Transformers (ACT)"
subtitle: "End-to-end imitation learning for fine bimanual manipulation"
category: "Physical AI"
model_type:
  - "Imitation Learning"
primary_type: "Action Policy"
key_novelty: "Predicts actions in chunks to shorten the effective horizon, reducing compounding errors and achieving 80–90% success on fine manipulation from only ~10 minutes of demonstrations."
thumbnail: assets/thumbnail.png
image_overview: assets/architecture-overview.svg
image_detailed: assets/architecture-detailed.png
code: "https://github.com/tonyzhaozh/aloha"
paper: "https://arxiv.org/pdf/2304.13705"
tags:
  - robotics-ai-suite
  - physical-ai
  - "category:action-policies-vla"
  - "chipset:nvl"
  - "chipset:ptl"
---

# Action Chunking with Transformers (ACT)

Action Chunking with Transformers (ACT) is an **end-to-end imitation learning** model designed for fine manipulation tasks in robotics, learned directly from real demonstrations. ACT aims to overcome the limitations of imitation learning, where policy errors can compound over time and lead to drifting out of the training distribution. By predicting actions in chunks, ACT effectively reduces the horizon, enabling the system to perform complex tasks such as opening a translucent condiment cup and slotting a battery with high success rates (80-90%) using only 10 minutes of demonstration data. ACT is proposed as an algorithm component of a system focused on learning fine-grained bimanual manipulation with low-cost hardware.

**Model architecture**

- **Observation encoder** — processes high-dimensional observations (images, sensor data) into a compact representation using convolutional feature extraction.
- **Transformer network** — models temporal dependencies between action chunks, taking the encoded observations and predicting a sequence of action chunks.
- **Action decoder** — converts the predicted action chunks into low-level control commands (joint torques, gripper actions).

**References**

- Paper: <https://arxiv.org/pdf/2304.13705>
- Homepage: <https://tonyzhaozh.github.io/aloha/>
- Source: <https://github.com/tonyzhaozh/aloha>

# How to Use

ACT is trained with PyTorch and reaches optimized inference performance on Intel devices via the OpenVINO toolkit. The PyTorch checkpoint is converted to OpenVINO IR format in three steps.

> A pretrained checkpoint and a conversion script are provided on the Imitation Learning sample pipeline page (Install ACT package).

### 1. Load the trained checkpoint

Checkpoint files (`.ckpt`) hold the parameter state saved after training. Rebuild the model structure and load the parameter state before conversion.

> Ensure the model configuration — especially `kl_weight`, `chunk_size`, `hidden_dim`, `dim_feedforward` and `camera_names` — is identical to the configuration used during training. A mismatch produces a shape error between the checkpoint and the structure.

```python
# Build the torch model. ACTPolicy definition can be found in policy.py.
# ACT_args is the model configuration dictionary, dumped from imitate_episodes.py.
# Keep the configuration identical to the one used for training.
from policy import ACTPolicy

policy = ACTPolicy(ACT_args)
policy.eval()

# Load checkpoint weights.
ckpt_path = "./policy_best.ckpt"
state_dict = torch.load(ckpt_path, weights_only=True, map_location=torch.device('cpu'))
policy.load_state_dict(state_dict)
```

### 2. Convert to a PyTorch JIT trace

To avoid conversion failures on the transformer structure, first convert the PyTorch model to a JIT trace.

```python
# Construct example input tensors.
H = 480
W = 640
CAMERA_NUMS = len(ACT_args.camera_names)
qpos = torch.rand((1, 14))
image = torch.rand((1, CAMERA_NUMS, 3, H, W))

# Convert to JIT trace.
traced_policy = torch.jit.trace(policy, example_inputs=(qpos, image))

# Get output tensor names for OpenVINO conversion (here: ['qpos', 'tensor.1']).
graph = traced_policy.graph
input_names = [inp.debugName() for inp in graph.inputs() if inp.debugName() != 'self.1']
print("Input tensor names:", input_names)
```

### 3. Convert the JIT trace to OpenVINO IR and save

```python
# Save the converted model (input tensor names are required).
ov_policy = ov.convert_model(
    traced_policy,
    input={'qpos': (1, 14), 'tensor.1': (1, CAMERA_NUMS, 3, H, W)},
)  # Specify static input shape for best performance, or use (1, CAMERA_NUMS, 3, -1, -1) for dynamic sizes.
ov.save_model(ov_policy, "output_model.xml")
```

The second input tensor is the stacked image of all cameras; its shape can be static or dynamic. When the shape is fixed in your use case, prefer a static shape for better inference performance.
