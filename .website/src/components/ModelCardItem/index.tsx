import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { type Model } from "@site/src/data/models/api";
import { useHfConfig } from "@site/src/data/models/useHfConfig";
import { ChipsetBadge } from "../ChipsetBadge";
import { LoadingImage } from "../LoadingImage";
import styles from "./styles.module.css";

type TagStyle = { color: string; border: string };

// Colour palette for model type badges. Unknown types fall back to DEFAULT_TAG.
const TAG_STYLES: Record<string, TagStyle> = {
  "Encoder/Decoder": {
    color: "rgba(128,198,255,0.87)",
    border: "rgba(128,198,255,0.25)",
  },
  ViT: { color: "rgba(165,116,205,0.87)", border: "rgba(165,116,205,0.25)" },
  "Diffusion Head": {
    color: "rgba(0,242,255,0.87)",
    border: "rgba(0,242,255,0.25)",
  },
  "Large Language Model": {
    color: "rgba(255,217,0,0.87)",
    border: "rgba(255,217,0,0.25)",
  },
  "Vision Language Action": {
    color: "rgba(255,128,131,0.87)",
    border: "rgba(255,128,131,0.25)",
  },
  Robotics: {
    color: "rgba(255,144,0,0.87)",
    border: "rgba(255,144,0,0.25)",
  },
};

const DEFAULT_TAG: TagStyle = {
  color: "rgba(227,227,229,0.87)",
  border: "rgba(227,227,229,0.25)",
};

const TagBadge = ({ label }: { label: string }) => {
  const tag = TAG_STYLES[label] ?? DEFAULT_TAG;
  return (
    <span
      className={styles.tagBadge}
      style={{ color: tag.color, border: `1px solid ${tag.border}` }}
    >
      {label}
    </span>
  );
};

type ModelCardItemProps = {
  model: Model;
  className?: string;
};

export const ModelCardItem = ({
  model,
  className = "",
}: ModelCardItemProps) => {
  const cfg = useHfConfig();
  const modelHref = useBaseUrl(`/models/${model.slug}`);

  const chipsetLabel = (alias: string) =>
    cfg.chipsets.find((c) => c.alias === alias)?.label ?? alias;

  const modelTags = [model.primaryType, ...model.secondaryTypes].filter(
    (t): t is string => Boolean(t),
  );

  return (
    <Link to={modelHref} className={`${styles.card} ${className}`}>
      <div className={styles.cardImageWrap}>
        <LoadingImage
          name={model.name}
          src={model.thumbnail}
          className={styles.cardImage}
        />
        <div className={styles.cardTags}>
          {modelTags.map((label) => (
            <TagBadge key={label} label={label} />
          ))}
        </div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{model.name}</h3>
        <p className={styles.cardDesc}>{model.keyNovelty}</p>

        <div className={styles.tags}>
          {model.chipsets.map((type) => (
            <ChipsetBadge
              key={type}
              label={chipsetLabel(type)}
              className={styles.chipsetBadge}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};
