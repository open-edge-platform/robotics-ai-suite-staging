// Intel silicon shown on docs/hardware/index.md. Two static entries:
// the on-robot SoC (Panther Lake) and the discrete inference GPU
// (Crescent Island). Facts only, no fabricated figures.

const silicon = [
  {
    id: 'panther-lake',
    name: 'Intel® Core™ Ultra (Panther Lake)',
    tier: 'On-robot compute',
    description:
      'A single SoC that combines CPU, GPU, and NPU, so perception, control, and AI inference run on the same chip in a power envelope that fits on a robot.',
    points: [
      'CPU, GPU (12 Xe cores), and NPU 5.0, delivering up to 180 TOPS of combined AI compute',
      'Heterogeneous engines let you place each workload on the best-suited unit',
      'No discrete accelerator required for on-robot perception and control',
    ],
  },
  {
    id: 'crescent-island',
    name: 'Intel® Data Center GPU (Crescent Island)',
    tier: 'On-premise inference',
    description:
      'A 350W air-cooled data center GPU built on Intel® Iris® Xe3P graphics IP, optimized for tokens per watt when inference workloads exceed the on-robot SoC.',
    points: [
      'Inference-optimized for performance per watt and per TCO',
      'Widest range of AI datatypes across matrix and vector, down to INT4/MxFP4',
      'Fits air-cooled solutions on a reliable open software stack',
    ],
  },
];

export default silicon;
