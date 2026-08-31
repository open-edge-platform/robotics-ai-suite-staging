---
sidebar_position: 4
---

# Step 4 — Connect the camera

- **Follow** — [Sensors → Cameras → Intel RealSense D457](../../../sensors/cameras/gmsl/intel-realsense-d457.md) to connect the camera and stream frames.
- **Done when** — a live frame appears.

:::note[Why the IPU]
The D457 serialises frames on-camera and sends them over GMSL. A **deserializer** on the kit
converts that GMSL stream back to MIPI CSI-2, and the kit's **IPU** prepares each frame for the
iGPU to run inference on, **without touching the CPU**. That keeps the CPU free for the real-time
control loop, so the control loop, the frame prep, and inference each stay on a separate engine.
:::
