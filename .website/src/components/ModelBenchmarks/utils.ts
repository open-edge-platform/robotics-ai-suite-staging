export const METRIC_COLORS = [
  "#c8f000",
  "#3b5ea6",
  "#1e2d5a",
  "#63b3ed",
  "#2f855a",
];

const METRIC_LABELS: Record<string, string> = {
  inference_latency: "Inference Latency",
  throughput: "Throughput",
};

const HARDWARE_LABELS: Record<string, string> = {
  nvl: "Core Ultra 4 NOVA LAKE",
  ptl: "Core Ultra 3 PANTHER LAKE",
  wcl: "Intel Core 300 WILDCAT LAKE",
};

export type BenchmarkMetric = {
  name: string;
  value: number;
  unit?: string;
};

export type ChartRow = {
  name: string;
  [metricKey: string]: string | number;
};

type BenchmarkWithSlug = {
  slug: string;
};

type BenchmarkWithMetrics = {
  metrics: ReadonlyArray<{
    name: string;
    unit?: string;
    value?: number;
  }>;
};

type BenchmarkWithHardware = {
  hardware: string;
};

export const toTitleCase = (value: string) =>
  value
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const getModelBenchmarks = <T extends BenchmarkWithSlug>(
  benchmarks: ReadonlyArray<T>,
  slug: string,
): T[] => benchmarks.filter(({ slug: modelSlug }) => modelSlug === slug);

export const getMetricKeys = <T extends BenchmarkWithMetrics>(
  modelBenchmarks: ReadonlyArray<T>,
): string[] =>
  Array.from(
    new Set(
      modelBenchmarks.flatMap((entry) => entry.metrics.map(({ name }) => name)),
    ),
  );

export const getMetricLabels = <T extends BenchmarkWithMetrics>(
  modelBenchmarks: ReadonlyArray<T>,
  metricKeys: string[],
): Record<string, string> =>
  metricKeys.reduce<Record<string, string>>((acc, key) => {
    const metric = modelBenchmarks
      .flatMap((entry) => entry.metrics)
      .find(({ name }) => name === key);

    const baseLabel = METRIC_LABELS[key] ?? key;
    const formattedLabel = toTitleCase(baseLabel);

    acc[key] = metric?.unit
      ? `${formattedLabel} (${metric.unit})`
      : formattedLabel;
    return acc;
  }, {});

export const getChartData = <
  T extends BenchmarkWithMetrics & BenchmarkWithHardware,
>(
  modelBenchmarks: ReadonlyArray<T>,
): ChartRow[] =>
  modelBenchmarks.map((entry) => {
    const row: ChartRow = {
      name: HARDWARE_LABELS[entry.hardware] ?? entry.hardware.toUpperCase(),
    };

    for (const metric of entry.metrics) {
      row[metric.name] = metric.value ?? 0;
    }

    return row;
  });

export const getYAxisConfig = (
  chartData: ChartRow[],
  metricKeys: string[],
  step = 20,
  minMax = 20,
): { yAxisMax: number; yTicks: number[] } => {
  const maxMetricValue = Math.max(
    0,
    ...chartData.flatMap((row) =>
      metricKeys.map((metricKey) => Number(row[metricKey] ?? 0)),
    ),
  );

  const yAxisMax = Math.max(minMax, Math.ceil(maxMetricValue / step) * step);
  const yTicks = Array.from(
    { length: yAxisMax / step + 1 },
    (_, index) => index * step,
  );

  return { yAxisMax, yTicks };
};
