---
title: "BC-RNN & BC-Transformer"
subtitle: "Behavior cloning with recurrent or transformer policy backbones"
category: "Physical AI"
model_type:
  - "Imitation Learning"
key_novelty: "Behavior cloning policies that encode temporal dependencies in demonstration data with an RNN (BC-RNN) or a Transformer (BC-Transformer) backbone, conditioned on task embeddings."
code: "https://github.com/ARISE-Initiative/robomimic"
paper: "https://arxiv.org/abs/2108.03298"
tags:
  - robotics-ai-suite
  - physical-ai
  - "category:action-policies-vla"
---

# BC-RNN & BC-Transformer

**Behavior Cloning with Recurrent Neural Networks (BC-RNN)** is a behavior cloning model that uses a recurrent neural network to encode temporal dependencies in demonstration data, learning to map observations (e.g., images, sensor data) to actions by imitating expert demonstrations. **Behavioral Cloning with a Transformer network (BC-Transformer)** shares a similar architecture but replaces the RNN backbone with a Transformer backbone.

**Model architecture**

- **Observation encoder** — processes high-dimensional observations (e.g., images) into a compact representation.
- **Policy network** — a recurrent (e.g., LSTM or GRU) or transformer network that models temporal dependencies and predicts actions from the encoded observations and task embeddings.
- **Task embedding module** — encodes task descriptions (e.g., natural language instructions) into a latent space and conditions the policy on the task context.

**References**

- Paper: <https://arxiv.org/abs/2108.03298>
- Homepage: <https://robomimic.github.io/>
- Source: <https://github.com/ARISE-Initiative/robomimic>
