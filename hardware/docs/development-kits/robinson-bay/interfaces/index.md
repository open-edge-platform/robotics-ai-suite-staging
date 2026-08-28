---
sidebar_position: 1
---

# Interfaces

The Robinson Bay Development Kit provides physical interfaces for connecting cameras, sensors, and low-level robotics hardware to the Intel® Core™ Ultra X7 358H (Panther Lake-H) IPU.

:::note
Please proceed with this section when you know which cameras and control devices you are going to use and what hardware interfaces they require.
:::

Connecting a sensor or a control device usually requires configuring two sides:
1. **The development kit side** (covered here) — physical wiring to the chassis and enabling the ports in the BIOS or kernel.
2. **The sensor side** (covered in the [Sensors](/docs/sensors) section) — device-specific settings like I2C addresses, drivers, and software pipelines.

Select the interface you are using to configure the **development kit side**:

## Sensing Interfaces
*   **[GMSL](./sensing/gmsl.md)** — Use the FAKRA ports for long-reach cameras with SerDes modules. The kit features built-in deserializers.
*   **[MIPI CSI-2](./sensing/mipi-csi-2.md)** — Use the CSI headers for compact, board-adjacent cameras. The kit uses a CPHY interface.

## Control
*   **[CAN Bus](./control/can.md)** — Pinout for the isolated CAN FD channels.
*   **[GPIO](./control/gpio.md)** — 40-pin header exposing I2C, SPI, PWM, UART, and general purpose I/O.
