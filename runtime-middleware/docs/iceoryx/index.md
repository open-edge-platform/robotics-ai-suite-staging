---
sidebar_position: 3
---

# Iceoryx

iceoryx is an Eclipse Foundation middleware for inter-process communication built
around true zero-copy transport over shared memory. Large messages such as camera
frames and point clouds move between processes without being copied or serialized,
giving constant, low latency regardless of payload size. It can back local ROS 2
traffic to remove copy overhead on the same host.
