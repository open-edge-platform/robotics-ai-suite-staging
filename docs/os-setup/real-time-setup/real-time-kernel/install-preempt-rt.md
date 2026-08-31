---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install PREEMPT_RT

The PREEMPT_RT patch set makes the Linux kernel fully preemptible, bounding the
worst-case latency between an interrupt and the thread that services it. Control loops
rely on this bound to hold their cycle times; the stock kernel does not provide it.

## Install the real-time kernel

<Tabs groupId="os">
  <TabItem value="ubuntu-24-04" label="Ubuntu 24.04 LTS" default>

1. Install the GRUB customizations and firmware:

   ```bash
   $ sudo apt install -y customizations-grub linux-firmware
   ```

2. Install the real-time kernel:

   ```bash
   $ sudo apt install -y linux-intel-rt-experimental
   ```

   To install the generic (non-RT) kernel instead:

   ```bash
   $ sudo apt install -y linux-intel-experimental
   ```

3. Reboot and select **[Experimental] ECI Ubuntu** at the GRUB menu. Under **Advanced
   Options**, the `-rt` entry boots the real-time kernel and the other entry boots the
   generic kernel.

  </TabItem>
</Tabs>

## Next Steps

Continue to [Intel TCC](../intel-tcc/index.md).
