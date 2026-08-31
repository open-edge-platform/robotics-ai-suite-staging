---
sidebar_position: 8
---

# Step 8 — Run the application

Run the fine-tuned policy on the kit: `physicalai`'s `PolicyRuntime` reads the camera, runs
inference on the iGPU, and drives the arm.

## In this blueprint

`PolicyRuntime` ties together the D457 camera ([Step 4](./connect-camera.md)), the OpenVINO
policy ([Step 7](./train-export-policy.md)), and the OpenArm adapter
([Step 6](./install-software-stack.md)), configured via YAML or CLI.

## Steps

- **Follow** — [`physicalai` → Policy Runtime](https://github.com/openvinotoolkit/physicalai) to
  configure and launch the runtime.
- **Done when** — the arm picks the object.

:::note[TODO]
Build-specific runtime configuration to be supplied:
- the `PolicyRuntime` YAML for this build (OpenArm adapter, D457 camera, exported policy path,
  task, `fps`)
- an e-stop / watchdog for the CAN-FD control loop
:::
