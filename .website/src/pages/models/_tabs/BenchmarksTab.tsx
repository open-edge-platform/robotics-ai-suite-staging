import type { ChartRow } from "@site/src/components/ModelBenchmarks/utils";
import {
  METRIC_COLORS,
  getMetricKeys,
  getMetricLabels,
  getYAxisConfig,
} from "@site/src/components/ModelBenchmarks/utils";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCategoryFilter } from "../_hooks/useCategoryFilter";
import styles from "./BenchmarksTab.module.css";
import { BenchmarkTooltip } from "./BenchmarkTooltip";

export const BenchmarksTab = (): React.JSX.Element => {
  const {
    relevantBenchmarks,
    isLoading,
    items: filteredItems,
  } = useCategoryFilter({ alwaysFetchBenchmarks: true });

  const displayedSlugs = new Set(filteredItems.map(({ slug }) => slug));
  const displayedBenchmarks = relevantBenchmarks.filter(({ slug }) =>
    displayedSlugs.has(slug),
  );

  const chartData = filteredItems.map((model) => {
    const row: Record<string, string | number> = { name: model.name };
    for (const entry of displayedBenchmarks) {
      if (entry.slug !== model.slug) continue;

      for (const metric of entry.metrics) {
        row[`${metric.name}__${entry.hardware}`] = metric.value ?? 0;
      }
    }
    return row;
  });

  const metricKeys = getMetricKeys(displayedBenchmarks);
  const metricLabels = getMetricLabels(displayedBenchmarks, metricKeys);

  const barKeys = Array.from(
    new Set(
      displayedBenchmarks.flatMap((e) =>
        e.metrics.map((m) => `${m.name}__${e.hardware}`),
      ),
    ),
  );

  const barLabels = barKeys.reduce<Record<string, string>>((acc, key) => {
    const sep = key.indexOf("__");
    const metricName = key.slice(0, sep);
    const hardware = key.slice(sep + 2);
    acc[key] =
      `${metricLabels[metricName] ?? metricName} – ${hardware.toUpperCase()}`;
    return acc;
  }, {});

  const { yAxisMax, yTicks } = getYAxisConfig(chartData as ChartRow[], barKeys);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (chartData.length === 0 || metricKeys.length === 0) {
    return <p>No benchmark data available for the selected models.</p>;
  }

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid vertical={false} strokeDasharray="" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={false}
            interval={0}
          />
          <YAxis
            domain={[0, yAxisMax]}
            ticks={yTicks}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "#ffffff0d" }}
            allowEscapeViewBox={{ x: false, y: true }}
            position={{ y: -8 }}
            offset={12}
            content={(props) => (
              <BenchmarkTooltip {...props} barLabels={barLabels} />
            )}
          />
          {barKeys.map((barKey) => (
            <Bar
              key={barKey}
              dataKey={barKey}
              name={barLabels[barKey]}
              fill={
                METRIC_COLORS[
                  metricKeys.indexOf(barKey.split("__")[0] ?? "") %
                    METRIC_COLORS.length
                ]
              }
              radius={[2, 2, 0, 0]}
            >
              <LabelList dataKey={barKey} position="top" />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
