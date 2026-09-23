---
title: "GraspNet - Baseline"
subtitle: "6-DoF grasp pose generation from point clouds"
category: "Physical AI"
model_type:
  - "Grasp Generation"
key_novelty: "Predicts 6-DoF grasp poses from scene point clouds, trained end-to-end on the GraspNet-1Billion dataset (1 billion grasp poses across 88,000 object models)."
thumbnail: assets/thumbnail.png
code: "https://github.com/graspnet/graspnet-baseline"
paper: "https://openaccess.thecvf.com/content_CVPR_2020/papers/Fang_GraspNet-1Billion_A_Large-Scale_Benchmark_for_General_Object_Grasping_CVPR_2020_paper.pdf"
tags:
  - robotics-ai-suite
  - physical-ai
---

# GraspNet - Baseline

Robotic grasping requires generating stable, feasible grasps for a wide variety of objects. The GraspNet project introduced the **GraspNet-1Billion dataset** and a baseline **grasp generation model**:

- **GraspNet-1Billion dataset** — a massive dataset containing 1 billion grasp poses for 88,000 object models, each associated with multiple grasp poses annotated with stability labels and quality scores, covering a wide range of object shapes, sizes, and materials.
- **Grasp generation model** — a deep learning model that predicts 6-DoF grasp poses (position and orientation) from a point cloud of the scene and outputs a set of candidate grasps ranked by predicted stability and quality.

**Grasp representation** — grasps are 6-DoF poses of a robotic gripper, defined by a 3D position (where the gripper is placed), a 3D orientation (how it is aligned), and a quality score indicating stability and feasibility.

**Model architecture**

- **Point cloud encoder** — a network (e.g., PointNet or PointNet++) extracts features from the input point cloud.
- **Grasp proposal network** — generates candidate grasp poses from the extracted features.
- **Grasp evaluation network** — scores and ranks the candidate grasps by predicted stability and quality.

The model is trained end-to-end using the GraspNet-1Billion dataset.

**References**

- Paper: <https://openaccess.thecvf.com/content_CVPR_2020/papers/Fang_GraspNet-1Billion_A_Large-Scale_Benchmark_for_General_Object_Grasping_CVPR_2020_paper.pdf>
- Homepage: <https://graspnet.net/>
- Source: <https://github.com/graspnet/graspnet-baseline>
