---
sidebar_position: 3
---

# Bring Your Own Kernel

## Introduction
This section provides a high-level overview of integrating a custom upstream or distribution kernel with the Intel Edge platform features.

## Process Overview to Bring Your Own Kernel
To use a custom kernel while maintaining IPU hardware acceleration and real-time determinism, apply the following patch sets in order:

1. **Obtain the Upstream Source:** Clone your target kernel tree (e.g., from `kernel.org`).
2. **Apply PREEMPT_RT Patches:** For real-time determinism, apply the RT patch set matching your kernel version.
3. **Apply Intel Kernel Overlay Patches:** Apply the overlay patches required for the Intel IPU and NPU.
4. **Configure the Kernel:** Run `make menuconfig` to enable the newly patched subsystems.
5. **Build and Deploy:** Compile the kernel and deploy the resulting packages to the target.

*Note: Specific patch links and Git tree instructions are provided by the platform engineering teams via the Intel Resource & Documentation Center (RDC).*
