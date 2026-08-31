---
sidebar_position: 1
---

# Safety

Intel Functional safety (FuSa) keeps a robot in a safe state when something fails — a sensor drops out,
a compute fault occurs, or a control loop misses a deadline. Cobots, AMRs, and humanoids all need
it before they can operate around people.

Intel processors run the safety workload, the real-time control loop, and AI inference on a single
edge SoC while keeping the safety path isolated.

### Keep the safety task from being starved by AI and control

Inference, perception, and control all compete for the SoC, but the safety function can't be
preempted. Intel SoCs run it on the **Low-Power Cluster** (efficient E-Cores) as an isolated
subsystem, so the P-Cores, GPU, and NPU carry the heavy load at full speed without touching the
safety path.

### Detect it when the silicon itself faults

**Intel® Silicon Integrity Technology** detects SoC hardware faults and reports error conditions —
the hardware signal your safety function reacts to.

### Get the drives into a safe state reliably

A safe-stop command needs guaranteed integrity to reach the actuators. Intel platforms support
**EtherCAT with FSoE (Fail Safe over EtherCAT)** through the ecosystem (e.g. ACONTIS, ISIT).

:::note[TODO]
- partitioning the safety workload on the development kit
- configuring Intel® Silicon Integrity Technology
- the EtherCAT/FSoE setup
:::
