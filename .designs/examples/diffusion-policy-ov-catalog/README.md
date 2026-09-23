---
title: "Diffusion Policy"
subtitle: "Visuomotor policy via conditional denoising diffusion"
category: "Physical AI"
model_type:
  - "Visuomotor Policy"
primary_type: "Action Policy"
key_novelty: "Represents visuomotor policies as conditional denoising diffusion processes, effectively handling multimodal action distributions in high-dimensional action spaces."
thumbnail: assets/thumbnail.png
code: "https://github.com/real-stanford/diffusion_policy"
paper: "https://arxiv.org/abs/2303.04137v5"
tags:
  - robotics-ai-suite
  - physical-ai
  - "category:action-policies-vla"
---

# Diffusion Policy

Similar to the Action Chunking Transformer (ACT), Diffusion Policy is an advancement in robotic visuomotor policy learning that represents policies as conditional denoising diffusion processes. This allows effective handling of multimodal action distributions and is well adapted to the high-dimensional action spaces common in robotic tasks. By learning the gradient of the action distribution score function and optimizing via stochastic Langevin dynamics steps during inference, it provides a stable and efficient way to find optimal actions.

**Model architecture**

- A visual encoder (e.g., ResNet18 or ViT) processes visual observations.
- A diffusion model (e.g., FiLM-conditioned U-Net or Transformer) is trained to predict the noise added to actions at each diffusion step, conditioned on the visual observations.

**References**

- Paper: <https://arxiv.org/abs/2303.04137v5>
- Source: <https://github.com/real-stanford/diffusion_policy>

# How to Use

Diffusion Policy models are trained with PyTorch and reach optimized inference on Intel devices via OpenVINO. Conversion first exports to ONNX, then uses `ovc` to produce IR. The steps below use the `low_dim transformer` and `image transformer` checkpoints as examples ([low-dim checkpoint](https://diffusion-policy.cs.columbia.edu/data/experiments/low_dim/pusht/diffusion_policy_transformer/train_0/checkpoints/epoch%3D0850-test_mean_score%3D0.967.ckpt), [image checkpoint](https://diffusion-policy.cs.columbia.edu/data/experiments/image/pusht/diffusion_policy_transformer/train_0/checkpoints/epoch%3D0100-test_mean_score%3D0.748.ckpt)).

### 1. Load the trained checkpoint

```python
ckpt = "data/new_data/lowdim_t967.ckpt"  # transformer
payload = torch.load(open(ckpt, 'rb'), pickle_module=dill)

cfg = payload['cfg']
cls = hydra.utils.get_class(cfg._target_)

workspace = cls(cfg, output_dir=output_dir)
workspace.load_payload(payload, exclude_keys=None, include_keys=None)

policy = workspace.model
```

### 2. Prepare a model wrapper for export

```python
class ConvertModel(torch.nn.Module):
    def __init__(self, policy):
        super(ConvertModel, self).__init__()
        self.policy = policy
        self.policy.model.eval()

        class ConvertUnetModel(torch.nn.Module):
            def __init__(self, policy):
                super(ConvertUnetModel, self).__init__()
                self.policy = policy
                self.forward = self.forward_transformer

            def forward_transformer(self, trajectory, t, cond):
                with torch.no_grad():
                    return self.policy.diffusion_unet_forward(trajectory, t, cond)

        self.convert_diffusion_unet = ConvertUnetModel(self.policy)
```

### 3. Export to ONNX

```python
def export_onnx(self, output_dir, ckpt_name):
    obs_dict = {"obs": torch.rand(1, 2, 20), "obs_mask": torch.rand(1, 2, 20)}
    self.policy.predict_action(obs_dict)

    trajectory = torch.randn(1, 10, 2)
    t = torch.tensor([10], dtype=torch.float32)
    cond = torch.randn(1, 2, 20)

    export_name_unet = os.path.join(output_dir, f"{ckpt_name}_unet.onnx")
    torch.onnx.export(
        self.convert_diffusion_unet,
        (trajectory, t, cond.detach()),
        export_name_unet,
        input_names=['trajectory', 't', 'cond'],
        export_params=True,
        opset_version=13,
        do_constant_folding=False,
    )
```

For the **image transformer** model, wrap and export both the observation encoder and the diffusion U-Net (using inputs `agent_pos = torch.rand(2, 2)`, `image = torch.rand(2, 3, 96, 96)`), following the same `torch.onnx.export` pattern.

### 4. Convert ONNX to OpenVINO IR

Install OpenVINO ([install via pip](https://docs.openvino.ai/2026/get-started/install-openvino/install-openvino-pip.html)), then convert each exported ONNX file to FP16 IR:

```bash
ovc lowdim_t967_unet.onnx
# image transformer:
ovc image_t748_obs_encoder_onepass.onnx
ovc image_t748_unet_onepass.onnx
```

Each conversion produces a `.xml` (topology) and `.bin` (weights).
