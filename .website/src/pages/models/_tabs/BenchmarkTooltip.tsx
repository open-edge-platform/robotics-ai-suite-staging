import type { TooltipContentProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import styles from "./BenchmarkTooltip.module.css";

export type BenchmarkTooltipProps = TooltipContentProps<ValueType, NameType> & {
  barLabels: Record<string, string>;
};

export const BenchmarkTooltip = ({
  active,
  label,
  payload,
  barLabels,
}: BenchmarkTooltipProps) => {
  if (!active || !payload?.length) return null;

  const byHardware: Record<
    string,
    Array<{ metric: string; value: number }>
  > = {};

  for (const entry of payload) {
    const key = String(entry.dataKey ?? "");
    const sep = key.indexOf("__");
    if (sep === -1) continue;
    const hardware = key.slice(sep + 2).toUpperCase();
    const metricLabel = (barLabels[key] ?? key).split(" \u2013 ")[0];
    if (!byHardware[hardware]) byHardware[hardware] = [];
    byHardware[hardware].push({
      metric: metricLabel,
      value: Number(entry.value ?? 0),
    });
  }

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipTitle}>{label}</p>
      {Object.entries(byHardware).map(([hardware, metrics]) => (
        <div key={hardware} className={styles.tooltipGroup}>
          <p className={styles.tooltipHardware}>{hardware}</p>
          {metrics.map(({ metric, value }) => (
            <div key={metric} className={styles.tooltipRow}>
              <span>{metric}</span>
              <span className={styles.tooltipValue}>{value}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
