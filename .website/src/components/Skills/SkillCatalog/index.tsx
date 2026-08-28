import { useMemo, useState } from "react";
import skills from "../../../data/skills";
import { CheckboxItem } from "../../CheckboxItem";
import { SearchBox } from "../../SearchBox";
import { SkillCard } from "./SkillCard";
import { pluralize } from "@site/src/utils/pluralize";
import styles from "./styles.module.css";

// Skill groups, shown as filters even when a group has no skills yet.
const SECTIONS = [
  "AI Toolkits",
  "Inference Backends",
  "Perception",
  "Realtime Control",
  "Safety",
  "Middleware",
];

export default function SkillCatalog() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(SECTIONS);
  const allSelected = selected.length === SECTIONS.length;

  const shown = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return skills.filter((skill) => {
      if (!selected.includes(skill.category)) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack =
        `${skill.name} ${skill.description} ${skill.category} ${skill.labels.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query, selected]);

  const onToggle = (category: string): void => {
    setSelected((current) =>
      current.includes(category)
        ? current.filter((value) => value !== category)
        : [...current, category],
    );
  };

  const clearAll = () => {
    setSelected([]);
  };

  const selectAll = () => {
    setSelected(SECTIONS);
  };

  const handleToggleSelected = () => {
    if (allSelected) {
      clearAll();
      return;
    }

    selectAll();
  };

  return (
    <section className="container margin-vert--xl">
      <div className={styles.layout}>
        <aside className={styles.panel} aria-label="Skill filters">
          <div className={styles.filterHeader}>
            <span className={styles.filterLabel}>Filter by</span>
            <button onClick={handleToggleSelected} className={styles.clearAll}>
              {allSelected ? "Clear All" : "Select All"}
            </button>
          </div>

          <SearchBox
            placeholder="Search skills"
            value={query}
            onChange={({ target }) => setQuery(target.value)}
          />

          <div className={styles.filterList}>
            {SECTIONS.map((category) => (
              <CheckboxItem
                key={category}
                label={category}
                checked={selected.includes(category)}
                onChange={() => onToggle(category)}
              />
            ))}
          </div>
        </aside>

        <div>
          <p className={styles.count}>
            <span>{shown.length}</span> {pluralize(shown.length, "Skill")} found
          </p>

          <div className={styles.grid}>
            {shown.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
          {shown.length === 0 ? (
            <p className={styles.emptyState}>
              No skills match the current search and filter selection.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
