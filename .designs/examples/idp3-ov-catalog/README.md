---
title: "Improved 3D Diffusion Policy (iDP3)"
subtitle: "3D point-cloud diffusion policy for manipulation"
category: "Physical AI"
model_type:
  - "Visuomotor Policy"
primary_type: "Action Policy"
key_novelty: "Extends Diffusion Policy to 3D manipulation with a more sophisticated 3D visual encoder over point clouds, improving spatial reasoning about the environment's 3D structure."
code: "https://github.com/YanjieZe/Improved-3D-Diffusion-Policy"
paper: "https://arxiv.org/abs/2410.10803"
tags:
  - robotics-ai-suite
  - physical-ai
  - "category:action-policies-vla"
---

# Improved 3D Diffusion Policy (iDP3)

Improved 3D Diffusion Policy (iDP3) builds upon the original Diffusion Policy framework, enhancing it for 3D robotic manipulation tasks. Whereas the original framework was effective for 2D tasks but faced challenges scaling to 3D, iDP3 uses a more sophisticated 3D visual encoder over point clouds, enabling the policy to better understand the 3D structure of the environment.

**Model architecture**

- A 3D visual encoder to process point clouds.
- A diffusion model that generates actions conditioned on the encoded visual features.
- A temporal module that incorporates past observations and actions for smoother trajectory generation.
- The diffusion model iteratively denoises actions, starting from random noise and refining them into precise, task-relevant actions.

**References**

- Paper: <https://arxiv.org/abs/2410.10803>
- Source: <https://github.com/YanjieZe/Improved-3D-Diffusion-Policy>

# How to Use

iDP3 is trained with PyTorch and reaches optimized inference on Intel devices via OpenVINO. Conversion wraps the observation encoder and diffusion model, exports them to ONNX, and converts to IR with `ovc`.

### 1. Load the trained checkpoint

```python
import hydra
import torch
import dill
import os

ckpt = "latest.ckpt"
ckpt_name = ckpt.split("/")[-1].split(".ckpt")[0]
output_dir = "onnx_ckpt"
os.makedirs(output_dir, exist_ok=True)

payload = torch.load(open(ckpt, 'rb'), pickle_module=dill)
cfg = payload['cfg']
cfg._target_ = "diffusion_policy_3d.workspace.idp3_workspace.iDP3Workspace"

cls = hydra.utils.get_class(cfg._target_)
workspace = cls(cfg, output_dir=output_dir)
workspace.load_checkpoint(ckpt)
policy = workspace.model
```

### 2. Prepare model wrappers for export

```python
import torch.nn as nn

class ConvertModel(nn.Module):
    def __init__(self, policy):
        super().__init__()
        self.policy = policy
        self.policy.model.eval()
        self.policy.obs_encoder.eval()

        class ConvertObsEncoder(nn.Module):
            def __init__(self, policy):
                super().__init__()
                self.policy = policy

            def forward(self, agent_pos, point_cloud):
                with torch.no_grad():
                    obs_dict = {"agent_pos": agent_pos, "point_cloud": point_cloud}
                    return self.policy.obs_encoder.forward(obs_dict)

        class ConvertUnetModel(nn.Module):
            def __init__(self, policy):
                super().__init__()
                self.policy = policy
                self.forward = self.forward_cnn

            def forward_cnn(self, trajectory, t, global_cond, local_cond):
                with torch.no_grad():
                    return self.policy.diffusion_unet_forward(trajectory, t, global_cond, local_cond)

        self.convert_obs_encoder = ConvertObsEncoder(self.policy)
        self.convert_diffusion_unet = ConvertUnetModel(self.policy)
```

### 3. Export to ONNX

```python
@torch.no_grad()
def export_onnx(self, output_dir, ckpt_name):
    agent_pos = torch.rand(1, 32)
    point_cloud = torch.rand(1, 4096, 3)
    local_cond = None

    torch.onnx.export(
        self.convert_obs_encoder,
        (agent_pos, point_cloud),
        os.path.join(output_dir, f"{ckpt_name}_obs_encoder.onnx"),
        input_names=['agent_pos', 'point_cloud'],
        export_params=True, opset_version=13, do_constant_folding=True,
    )

    trajectory = torch.randn(1, 16, 25)
    t = torch.randint(100, size=(1,)).float()
    global_cond = torch.randn(1, 384)

    torch.onnx.export(
        self.convert_diffusion_unet,
        (trajectory, t, global_cond, local_cond),
        os.path.join(output_dir, f"{ckpt_name}_unet.onnx"),
        input_names=['trajectory', 't', 'global_cond', 'local_cond'],
        export_params=True, opset_version=13, do_constant_folding=True,
    )
```

### 4. Convert ONNX to OpenVINO IR

Install OpenVINO ([install via pip](https://docs.openvino.ai/2026/get-started/install-openvino/install-openvino-pip.html)), then convert:

```bash
ovc latest_obs_encoder.onnx
ovc latest_unet.onnx
```

A prebuilt package is also available via `sudo apt install idp3-ov`; the source is then installed under `/opt/idp3-ov/`.
