---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure Intel TCC

Intel TCC is a set of processor and firmware features that reduce sources of timing
variation on a real-time core.

- **Cache Allocation Technology (CAT)** partitions the last-level cache and reserves a portion
  for real-time cores, preventing eviction of their data by other workloads.
- **Software SRAM** locks critical code and data into cache, providing deterministic,
  low-latency access that is not subject to memory contention.
- **Power-management tuning** restricts processor C-states and frequency transitions on
  real-time cores to remove latency spikes caused by wake-up and frequency changes.

TCC features are enabled in the platform firmware (BIOS) and configured in the operating
system.

## Use Cache Allocation Technology

CAT partitions the last-level cache (LLC) and L2 cache and reserves a portion for
real-time cores. Use `lstopo` to inspect cache topology, then apply core masks with
`msr-tools`. The following example reserves cache for core 13:

<Tabs groupId="os">
  <TabItem value="ubuntu-24-04" label="Ubuntu 24.04 LTS" default>

```bash
$ sudo apt install -y msr-tools
```

  </TabItem>
</Tabs>

```bash
# LLC core masks
$ wrmsr 0xc90 0x3f      # best-effort mask
$ wrmsr 0xc91 0xfc0     # real-time mask
# E-core L2 masks
$ wrmsr -p13 0xd11 0xff00
# Assign the real-time mask to core 13
$ wrmsr -p13 0xc8f 0x100000000
```

## Lock the real-time core frequency

Dynamic Voltage and Frequency Scaling (DVFS) introduces execution-time jitter. Lock the
isolated core to a fixed frequency within the turbo range. The following example pins
core 13 to 3 GHz through the `intel_pstate` driver:

```bash
$ echo performance > /sys/devices/system/cpu/cpu13/cpufreq/scaling_governor
$ echo 3000000 > /sys/devices/system/cpu/cpu13/cpufreq/scaling_max_freq
$ echo 3000000 > /sys/devices/system/cpu/cpu13/cpufreq/scaling_min_freq
```

:::note
The masks and core indices are examples for a specific processor. Tailor them to your
processor's cache topology and isolated cores. A higher fixed frequency raises
temperature and power and affects CPU reliability.
:::

## Next Steps

Continue to [System Tuning](../system-tuning/index.md).
