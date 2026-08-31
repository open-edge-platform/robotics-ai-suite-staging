---
sidebar_position: 6
---

# Step 6 — Install the software stack

Install the runtime that connects the camera, the policy, and the arm on the kit:
[`physicalai`](https://github.com/openvinotoolkit/physicalai), the deployment runtime for
policies trained in [Physical AI Studio](https://github.com/open-edge-platform/physical-ai-studio)
(Step 7).

## In this blueprint

`physicalai` provides the deployment pieces:

- **Camera** — unified capture with a RealSense D457 backend
- **Inference** — `InferenceModel` runs the OpenVINO IR policy on the iGPU
- **Control loop** — `PolicyRuntime` reads → infers → `send_action`

Underneath, the CAN-FD motor loop still relies on the real-time setup from
[Step 3](./enable-real-time.md).

## Install

```bash
$ pip install "physicalai[realsense]"
```

**Done when** — `physicalai` imports and the RealSense D457 is discoverable through its camera
API.

:::note[TODO]
OpenArm is not one of the robots `physicalai` ships an adapter for (SO101, Trossen WidowX, …).
An **OpenArm robot adapter** — a class satisfying the `physicalai` Robot Protocol
(`connect` / `get_observation` / `send_action` / `joint_names`) over
[openarm_can](https://github.com/enactic/openarm_can) — must be supplied. Owner TBD.
:::

:::note[TODO]
Evaluate whether the OpenArm adapter should talk to the arm **directly over CAN-FD** or
**through ROS 2** (`ros2_control` + [openarm_ros2](https://github.com/enactic/openarm_ros2)),
reusing the existing `ros2_control` hardware interface. A ROS 2-backed adapter satisfies the same
Robot Protocol; the trade-off is the extra middleware hop.
:::
