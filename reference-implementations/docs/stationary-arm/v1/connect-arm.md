---
sidebar_position: 5
---

# Step 5 — Connect the arm over CAN-FD

OpenArm's Damiao actuators sit on a **CAN-FD** bus. You wire the arm to one of the kit's
isolated CAN-FD channels, bring the SocketCAN interface up, and verify that every motor
responds. Every cycle, the control loop exchanges a command and a feedback frame with each
motor on this bus — a late frame means a late motor command, so this exchange relies on the
real-time scheduling from [Step 3](./enable-real-time.md): the isolated core and PREEMPT_RT
keep the per-cycle exchange from slipping.

## Configure motor IDs

Before the host can talk to the arm, each Damiao motor must be flashed with its CAN sender and
master ID (J1 → `0x01`/`0x11` … J8 gripper → `0x08`/`0x18`). This is a **one-time** step done
with the **Damiao Debugging Tools on a Windows machine** over the USB-CAN debugger, and it must
be completed **before running any code on the arm**.

- **Follow** — [OpenArm → Setup Motor ID](https://docs.openarm.dev/setup/openarm-setup/motor-id)
  for the full flashing procedure and ID table.
- **Done when** — every motor reports its assigned ID.

## Wire up the bus

- **Follow** — [Robot Control → CAN Bus](../../../robot-control/can-bus/index.md) for the
  SocketCAN stack, and the [openarm_can](https://github.com/enactic/openarm_can) library for
  the Damiao motors.
- **Wire it** — connect the arm to a CAN-FD channel on the kit's **J1** connector. See
  [CAN Bus](../../../hardware/development-kits/robinson-bay/interfaces/control/can.md). For a
  bimanual build, use both channels — one per arm.
- **Done when** — `discover` lists every motor and `monitor` shows live state.
