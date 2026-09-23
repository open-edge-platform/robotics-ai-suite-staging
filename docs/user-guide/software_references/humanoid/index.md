---
orphan: true
---

# Humanoid Sample Pipelines

The Humanoid Toolkit sample pipelines demonstrate end-to-end AI workflows optimized for Intel platforms. Review the [validated hardware configuration](../../hardware_blueprints/humanoid/index.md#validated-configuration) before running a pipeline.


::::{grid} 3

:::{grid-item-card} **GEAR-SONIC Introduction**
:link: gr00t_wbc
:link-type: doc
:link-alt: clickable cards

Explore whole-body control for GR00T-based humanoid robotics.
:::
::::


## Sample Pipelines Overview

| Pipeline | Domain | Description |
|---|---|---|
| **[Imitation Learning - ACT](../../components/manipulation/imitation_learning_act.md)** | Manipulation, AI | Action Chunking with Transformers optimized with OpenVINOâ„¢ for ALOHA robots. |
| **[Diffusion Policy](../../resources/demos_and_blogs/diffusion_policy.md)** | Manipulation, AI | Visuomotor diffusion policy for the Push-T manipulation task. |
| **[Model Predictive Control Demo](../../resources/demos_and_blogs/mpc_demo.md)** | Manipulation, Control | ACT imitation learning with OCS2 MPC and MuJoCo simulation. |
| **[VSLAM: ORB-SLAM3](../../resources/demos_and_blogs/ORB_VSLAM.md)** | SLAM, Perception | Feature-based visual SLAM for monocular, stereo, and RGB-D cameras. |
| **[Robotics Diffusion Transformer (RDT)](../../resources/demos_and_blogs/robotics_diffusion_transformer.md)** | Foundation Model, AI | Bimanual manipulation foundation model running in MuJoCo and real ALOHA robots. |
| **[Pi0.5 with Real-Time Chunking](../../components/manipulation/pi05_with_rtc.md)** | VLA, Manipulation | Vision-Language-Action pipeline with PaliGemma VLM and flow-matching policy. |
| **[LLM Robotics Demo](../../resources/demos_and_blogs/llm_robotics.md)** | GenAI, Manipulation | Voice and text-commanded robot control with Phi-4 and SAM/CLIP. |
| **[OpenClaw AgenticROS Demo](../../resources/demos_and_blogs/openclaw_agenticros_demo.md)** | Agentic AI, ROS 2 | Agentic ROS framework demo with OpenClaw. |
| **[Fast-LIO2 Demo](../../components/navigation/fast_lio2_demo.md)** | LiDAR, SLAM | Fast, robust LiDAR-inertial odometry package. |
| **[Fast-LIVO2 Demo](../../components/navigation/fast_livo2_demo.md)** | LiDAR, Visual SLAM | Fast LiDAR-inertial-visual odometry package. |
| **[Point-LIO Demo](../../components/navigation/point_lio_demo.md)** | LiDAR, SLAM | Robust LiDAR-inertial odometry via point-by-point integration. |
| **[GR00T Whole-Body Control](gr00t_wbc.md)** | Control, Manipulation | Whole-body control pipeline for humanoid robotics. |
| **[GR00T N1D7 OpenVINO](../../ai_resources/openvino/models/model_gr00t_n1d7.md)** | AI Inference | OpenVINO-accelerated GR00T foundation model deployment. |


