---
sidebar_position: 1
---

# Step 1 — Bring up the development kit

Power on the kit, configure the BIOS for this build, and confirm the CAN and camera
ports enumerate before installing the OS.

## In this blueprint

The arm runs over CAN-FD and the depth camera over GMSL, so enable in BIOS:

- **CAN-FD channels** on **J1** (host ↔ arm)
- **IPU** and **MIPI/GMSL** camera support

## Steps

- **Follow** — [Robotics Development Kits](../../../hardware/index.md) for the base BIOS
  and I/O setup, and [CAN Bus](../../../hardware/development-kits/robinson-bay/interfaces/control/can.md)
  for the CAN configuration.
- **Done when** — the kit boots and the CAN and camera ports are detected by the system.
