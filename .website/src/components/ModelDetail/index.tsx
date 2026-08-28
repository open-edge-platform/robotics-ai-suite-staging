import { useLocation } from "@docusaurus/router";
import { modelQueryOptions } from "@site/src/data/models/queryOptions";
import { useHfConfig } from "@site/src/data/models/useHfConfig";
import { useQuery } from "@tanstack/react-query";
import Layout from "@theme/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChipsetBadge } from "../ChipsetBadge";
import { Divider } from "../Divider";
import Link from "../Link";

import useBaseUrl from "@docusaurus/useBaseUrl";
import { ModelBreadcrumbs } from "../ModelBreadcrumbs";
import { ModelDetailsTabs } from "../ModelDetailsTabs";
import { ModelLinks } from "../ModelLinks";
import { RelatedModelCard } from "../RelatedModelCard";
import { TechnicalDetails } from "../TechnicalDetails";
import styles from "./styles.module.css";
import clsx from "clsx";

const slugFromPath = (pathname: string) => {
  const parts = pathname.replace(/\/+$/, "").split("/");
  return parts[parts.length - 1] ?? "";
};

export default function ModelDetail() {
  const cfg = useHfConfig();
  const location = useLocation();
  const slug = slugFromPath(location.pathname);
  const allModelsHref = useBaseUrl("/models/");

  const {
    data: model,
    isError,
    isLoading,
  } = useQuery({
    ...modelQueryOptions(cfg, slug),
    enabled: Boolean(slug),
  });

  const relatedLocal = model?.relatedModels ?? [];

  const chipsetLabel = (alias: string) =>
    cfg.chipsets.find((c) => c.alias === alias)?.label ?? alias;

  if (isError) {
    return (
      <Layout
        title={slug}
        description={`AI model: ${slug}`}
        wrapperClassName={styles.layoutBackground}
      >
        <main className="container margin-vert--xl">
          <p className={styles.error}>Failed to load this model.</p>
          <ModelBreadcrumbs modelName={slug} />
        </main>
      </Layout>
    );
  }

  if (isLoading || !model) {
    return (
      <Layout
        title={slug}
        description={`AI model: ${slug}`}
        wrapperClassName={styles.layoutBackground}
      >
        <main className="container margin-vert--xl">
          <p>Loading...</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout
      title={slug}
      description={`AI model: ${slug}`}
      wrapperClassName={styles.layoutBackground}
    >
      <main
        className={clsx("container", "margin-vert--xl", styles.heroContent)}
      >
        <ModelBreadcrumbs modelName={model.name} />

        <div className={styles.content}>
          <div>
            <header className={styles.header}>
              <h1 className={styles.title}>{model.name}</h1>
              {model.subtitle && (
                <p className={styles.subtitle}>{model.subtitle}</p>
              )}
              <div className={styles.badges}>
                {model.primaryType && (
                  <span className={styles.badge}>{model.primaryType}</span>
                )}

                {model.secondaryTypes.map((type) => (
                  <span key={type} className={styles.badgeSecondary}>
                    {type}
                  </span>
                ))}

                {model.chipsets.map((type) => (
                  <ChipsetBadge key={type} label={chipsetLabel(type)} />
                ))}
              </div>
            </header>

            {model.keyNovelty && (
              <p className={styles.value}>{model.keyNovelty}</p>
            )}

            {model.description && (
              <div className={styles.description}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {model.description}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <div>
            <img
              src={model.thumbnail}
              className={styles.taskImage}
              alt={`${model.name} task illustration`}
            />
          </div>
        </div>

        <ModelDetailsTabs model={model} />

        <Divider />

        <ModelLinks model={model} />

        <Divider />

        <TechnicalDetails model={model} />

        {relatedLocal.length > 0 && (
          <>
            <h2 className={styles.relatedModelsTitle}>Related models</h2>

            <div className={styles.relatedModels}>
              {relatedLocal.map((slug) => (
                <RelatedModelCard slug={slug} key={slug} />
              ))}
            </div>

            <Link
              label="Explore more AI models"
              href={allModelsHref}
              className={styles.exploreMoreLink}
            />
          </>
        )}
      </main>
    </Layout>
  );
}
