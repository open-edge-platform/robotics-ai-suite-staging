import { useHfConfig } from "@site/src/data/models/useHfConfig";
import { ReactNode } from "react";
import { FiltersSidebar } from "../_FiltersSidebar/FiltersSidebar";
import styles from "./FiltersSidebarLayout.module.css";

export const FiltersSidebarLayout = ({
  cfg,
  children,
}: {
  cfg: ReturnType<typeof useHfConfig>;
  children: ReactNode;
}) => {
  return (
    <div className={styles.layout}>
      <FiltersSidebar cfg={cfg} />

      {children}
    </div>
  );
};
