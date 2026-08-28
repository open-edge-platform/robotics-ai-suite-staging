import { type Model } from "@site/src/data/models/api";
import { useUrlQueryParam } from "@site/src/hooks/useUrlQueryParam.hook";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Architecture } from "../Architecture";
import { ModelBenchmarks } from "../ModelBenchmarks";
import { Tab, Tabs } from "../Tabs";
import styles from "./styles.module.css";

type ModelDetailsTabsProps = {
  model: Model;
};

export const ModelDetailsTabs = ({ model }: ModelDetailsTabsProps) => {
  const { value: initialActiveTabId, setValue: setTabInUrl } =
    useUrlQueryParam("tab");

  const handleTabChange = (tabId: string) => {
    setTabInUrl(tabId);
  };

  return (
    <Tabs
      className={styles.tabs}
      initialActiveTabId={initialActiveTabId}
      onTabChange={handleTabChange}
    >
      <Tab title="Quick Start" id="quick-start">
        {model.quickStart ? (
          <div className={styles.quickStart}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {model.quickStart}
            </ReactMarkdown>
          </div>
        ) : (
          <p className={styles.empty}>Quick start guide coming soon.</p>
        )}
      </Tab>

      <Tab title="Architecture" id="architecture">
        <Architecture model={model} />
      </Tab>

      <Tab title="Benchmark" id="benchmark">
        <ModelBenchmarks slug={model.slug} />
      </Tab>
    </Tabs>
  );
};
