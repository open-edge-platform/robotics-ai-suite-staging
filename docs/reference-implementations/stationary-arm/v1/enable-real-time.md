---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Step 3 — Enable real-time

OpenArm's control loop runs on the host CPU, driving the Damiao motors over CAN-FD. The timing of that loop is therefore the host's responsibility, and it determines how
steadily the arm holds and moves. This step is **mandatory**.

- **Follow** — [Real-time Setup](../../../os-setup/real-time-setup/index.md) to install the
  PREEMPT_RT Linux kernel, isolate a CPU core for the control loop, and enable Intel Time
  Coordinated Computing (TCC).
- **Done when** — the latency check stays
  within target while the camera and AI policy run.

## Use it from your application

### 1. Run the control loop under a real-time scheduler

By default Linux splits CPU time fairly between all processes, so it can pause your loop in the
middle of a cycle to let something else run. When that happens the loop misses its deadline and
real-time behavior breaks. `SCHED_FIFO` is one of Linux's real-time scheduling policies: it lets
the loop run whenever it is ready and won't pause it to share CPU time with normal work.

<Tabs groupId="lang">
<TabItem value="py" label="Python">

```python
import os

param = os.sched_param(80)                     # priority 1-99, above normal tasks
os.sched_setscheduler(0, os.SCHED_FIFO, param)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <pthread.h>
#include <sched.h>

sched_param sp{};
sp.sched_priority = 80;                        // priority 1-99, above normal tasks
pthread_setschedparam(pthread_self(), SCHED_FIFO, &sp);
```

</TabItem>
</Tabs>

Setting a real-time policy needs privilege. Run as root, grant the binary `CAP_SYS_NICE`
(`sudo setcap cap_sys_nice+ep ./your_app`), or raise the RT limit in
`/etc/security/limits.conf`. Without it the call fails with `EPERM`.

### 2. Lock the process memory

A real-time process still stalls if the kernel has swapped part of its memory to disk: the first
access to a swapped-out page blocks on disk I/O and the cycle is missed. `mlockall` keeps all of
the process's memory in RAM so this never happens. Call it once at startup, before the loop
begins.

<Tabs groupId="lang">
<TabItem value="py" label="Python">

```python
import ctypes

MCL_CURRENT, MCL_FUTURE = 1, 2
ctypes.CDLL("libc.so.6").mlockall(MCL_CURRENT | MCL_FUTURE)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <sys/mman.h>

mlockall(MCL_CURRENT | MCL_FUTURE);            // lock current + future allocations
```

</TabItem>
</Tabs>

### 3. Pin the loop and its interrupt to the isolated core

Two things must run on the core you isolated in the kernel setup: the control loop, and the
interrupt (IRQ) the CAN controller raises each time a frame arrives. If the loop runs on the
isolated core but the CAN interrupt is handled on another, every received frame crosses cores
and adds latency. Put both on the same core.

Pin the loop from your code:

<Tabs groupId="lang">
<TabItem value="py" label="Python">

```python
import os

os.sched_setaffinity(0, {3})                   # isolated core id
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <sched.h>

cpu_set_t set;
CPU_ZERO(&set);
CPU_SET(3, &set);                              // isolated core id
sched_setaffinity(0, sizeof(set), &set);
```

</TabItem>
</Tabs>

The CAN controller (the hardware that connects the host to the CAN-FD bus, shown as `can0`) has
an interrupt (IRQ) number, and that IRQ has an affinity mask that decides which cores run its
handler. Point it at your isolated core so the handler runs on the same core as the loop. Do
this once, from the shell:

```bash
# 1. Find the IRQ number for the CAN interface (here, can0)
IRQ=$(grep can0 /proc/interrupts | awk -F: '{print $1}' | tr -d ' ')

# 2. Send it to the isolated core, using that core's bitmask (core N = 1 << N)
#    core 3 -> 0b1000 -> 8
echo 8 | sudo tee /proc/irq/$IRQ/smp_affinity
```

Change `can0` to your CAN interface and `8` to the mask for your isolated core.

### 4. Do not block the loop

Anything with unbounded timing inside the cycle breaks determinism: memory allocation, file or
network I/O, logging, or waiting on a lock. Keep that work off the control loop.

This blueprint applies these settings in the OpenArm adapter — see
[Step 6](./install-software-stack.md).
