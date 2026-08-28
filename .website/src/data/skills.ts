export type Skill = {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  labels: string[];
};

const skills: Skill[] = [
  {
    id: 'configure-real-time-linux',
    name: 'Optimise Real-Time Linux Kernel',
    category: 'Realtime Control',
    icon: '/img/icon/tsn-sync.svg',
    description:
      'Configures the real-time kernel, isolated CPU cores, and latency tuning, then measures worst-case scheduling latency.',
    labels: ['PREEMPT_RT', 'CPU Isolation'],
  },
  {
    id: 'prepare-frames-with-intel-ipu',
    name: 'Prepare Camera Frames with Intel IPU',
    category: 'Perception',
    icon: '/img/icon/ipu-frame.svg',
    description:
      'Configures a supported camera-stream resolution and output pixel format through Intel Camera HAL, then validates received frames before inference.',
    labels: ['Intel IPU', 'Camera HAL', 'ISP'],
  },
  {
    id: 'stream-gmsl-camera',
    name: 'Stream Frames from a GMSL Camera',
    category: 'Perception',
    icon: '/img/icon/gmsl-camera.svg',
    description:
      'Installs the sensor driver, defines the camera topology, configures the media graph, and verifies frame capture from the resulting video node.',
    labels: ['GMSL', 'V4L2', 'ACPI'],
  },
  {
    id: 'add-iceoryx-zero-copy-ipc',
    name: 'Add Zero-Copy IPC with Iceoryx',
    category: 'Middleware',
    icon: '/img/icon/zero-copy-ipc.svg',
    description:
      'Converts one local producer-consumer path to typed, loaned shared-memory samples and verifies delivery with RouDi.',
    labels: ['Iceoryx', 'C++', 'Shared Memory'],
  },
  {
    id: 'tune-openvino-inference',
    name: 'Tune OpenVINO Inference',
    category: 'AI Toolkits',
    icon: '/img/icon/inference-chip.svg',
    description:
      'Benchmarks a supplied IR or ONNX model on available devices, applies a latency or throughput performance hint, and records comparable results.',
    labels: ['OpenVINO', 'Latency', 'Throughput'],
  },
];

export default skills;
