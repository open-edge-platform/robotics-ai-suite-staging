---
sidebar_position: 0
---

# Cameras

import CameraTable from '@site/src/components/CameraTable';

Cameras give the robot its primary sense of the world — color images for perception, and in some cases depth for understanding distance and 3D shape. This section is organized by **how the camera wires to the development kit**, because the interface you choose is driven by where the camera is mounted and how far it sits from the compute box.

## Camera catalog

All documented cameras. Select a development kit to show only the cameras it supports; the **Notes** column flags any that need a CPHY-DPHY adapter.

<CameraTable />

## Choosing a camera

Pick a camera by answering two questions:

1. **What does the robot need to perceive?**
   - *Color only* (object detection, line following, teleoperation) → any standard 2D camera.
   - *Distance / 3D shape* (grasping, obstacle avoidance, mapping) → a **depth camera** such as the Intel RealSense D457.

2. **Where is the camera mounted, relative to the compute box?**
   - *Right next to the board* → **[MIPI CSI-2](mipi-csi-2/index.md)** (ribbon cable) or **[USB](usb-uvc/index.md)**.
   - *Meters away* (robot arm tip, AMR corners) → **[GMSL](gmsl/index.md)**.
   - *Quick prototype or add-on* → **[USB (UVC)](usb-uvc/index.md)**.
