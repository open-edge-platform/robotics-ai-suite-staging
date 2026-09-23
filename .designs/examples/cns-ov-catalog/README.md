---
title: "Visual Servoing - CNS"
subtitle: "Correspondence-encoded neural image servo policy"
category: "Physical AI"
model_type:
  - "Visual Servoing"
key_novelty: "A graph-neural-network image servo policy that uses explicit keypoint correspondence from feature matching, achieving sub-degree and sub-millimeter precision in real time (~40 fps with an ORB front-end)."
code: "https://github.com/hhcaz/CNS"
paper: "https://arxiv.org/abs/2309.09047"
tags:
  - robotics-ai-suite
  - physical-ai
---

# Visual Servoing - CNS

Visual servoing (vision-based robot control, VS) uses feedback extracted from a vision sensor to control the motion of a robot. Techniques are broadly classified as image-based (IBVS), position/pose-based (PBVS), and hybrid. CNS is an IBVS-based approach.

Correspondence encoded Neural image Servo policy (CNS) presents a graph neural network based solution for image servo, utilizing explicit keypoint correspondence obtained from any detector-based feature matching method (such as SIFT, AKAZE, ORB, or SuperGlue). It achieves \<0.3° and sub-millimeter precision in real-world experiments (mean distance to target ≈ 0.275 m) and runs in real time (~40 fps with ORB as the front-end).

**Model architecture**

- **Input representation** — a pair of images: the current image from the robot's camera and a target image of the desired view.
- **Feature extraction** — a CNN extracts high-level visual features from both images.
- **Correspondence encoding** — computes and encodes visual correspondences between features in the current and target images.
- **Neural network layers** — learn the mapping from encoded correspondences to control actions.
- **Control output** — produces control commands (translation and rotation adjustments) to align the current view with the target.

**References**

- Paper: <https://arxiv.org/abs/2309.09047>
- Source: <https://github.com/hhcaz/CNS>

# How to Use

CNS reaches optimized inference on Intel CPU or iGPU via OpenVINO. It is CPU-friendly — follow the [official installation tutorial](https://github.com/hhcaz/CNS). `PyTorch` (>1.12) and `PyTorch Geometric` must be installed compatibly, and `pybullet-object-models` is required to run `demo_sim_Erender.py`.

### Install dependencies

```bash
pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 --index-url https://download.pytorch.org/whl/xpu
pip install tqdm numpy scipy pybullet matplotlib tensorboard scikit-image open3d>=0.12.0 opencv-python>=4.8.0 pyrealsense2==2.53.1.4623

cd [path to your CNS project]/cns/thirdparty
pip3 install -e pybullet-object-models/
```

Select CPU as the running device:

```bash
python3 demo_sim_Erender.py --device=CPU
```

### Convert to OpenVINO IR for iGPU

To run on Intel iGPU, use `OpenVINO 2025.3.0` and run the conversion inside the CNS project:

```python
import openvino
import torch
from cns.models.graph_vs import GraphVS

# Wrap the original GraphVS in an OpenVINO-friendly forward signature.
class OVGraphVS(GraphVS):
    def forward(self, x_cur, x_tar, pos_cur, pos_tar,
                l1_dense_edge_index_cur, l1_dense_edge_index_tar,
                l0_to_l1_edge_index_j_cur, l0_to_l1_edge_index_i_cur,
                cluster_mask, cluster_centers_index, num_clusters,
                new_scene, hidden=None, batch=None):
        l0_to_l1_edge_index_cur = torch.stack(
            [l0_to_l1_edge_index_j_cur, l0_to_l1_edge_index_i_cur], dim=0)
        if batch is None:
            batch = torch.zeros(x_cur.size(0)).long().to(x_cur.device)
        x_clu = self.encoder(x_cur, x_tar, pos_cur, pos_tar, cluster_mask,
                             l0_to_l1_edge_index_cur, cluster_centers_index)
        pos_clu = pos_tar[cluster_centers_index]
        batch_clu = batch[cluster_centers_index]
        xx = self.init_hidden(num_clusters.sum()).to(x_cur)
        hidden = torch.where(new_scene, xx, hidden)
        hidden, x_clu = self.backbone(hidden, x_clu, pos_clu,
                                      l1_dense_edge_index_cur,
                                      l1_dense_edge_index_tar, batch_clu)
        vel_si_vec, vel_si_norm = self.decoder(x_clu, cluster_mask, batch_clu)
        return vel_si_vec, vel_si_norm, hidden

# Load checkpoint weights.
ckpt = torch.load("checkpoints/cns_state_dict.pth", "cpu")
if hasattr(ckpt, "net") and isinstance(ckpt["net"], torch.nn.Module):
    model = ckpt["net"]
else:
    model = OVGraphVS(2, 2, 128, regress_norm=True).to("cpu")
    model.load_state_dict(ckpt)

# Provide representative example_input (graph tensors, hidden state, new_scene flag),
# then convert and save the IR model.
ov_model = openvino.convert_model(model, example_input=example_input)
openvino.save_model(ov_model, "cns_ov/openvino_model.xml")
```

Run inference on the iGPU:

```python
core = ov.Core()
compiled_model = core.compile_model(model="cns_ov/openvino_model.xml", device_name='GPU')
result_infer = compiled_model(example_input)
print(result_infer)
```
