// @ts-check

const remarkAiActions = require("./plugins/llms-text/remark-ai-actions");

// Header text for the generated llms.txt (see plugins/llms-text).
const LLMS_SITE_DESCRIPTION =
  "The Intel\u00ae Robotics AI Suite is a full-stack platform for physical AI at the edge: a real-time Linux kernel with Intel\u00ae TCC, ROS 2 middleware, PTP-synchronized sensor pipelines, EtherCAT and CAN motion control, and OpenVINO-powered AI toolkits for vision, generative, and embodied AI on Intel\u00ae Core\u2122 Ultra SoCs.";

// Per-sidebar title/description blocks for llms.txt. Keys match sidebars.js.
const LLMS_SIDEBARS_CONFIG = {
  docsSidebar: {
    title: "Development Stack",
    description:
      "The layered bring-up stack: development kits, OS setup, real-time, middleware, sensors, models, and frameworks.",
  },
  referenceImplementationsSidebar: {
    title: "Blueprints",
    description:
      "End-to-end reference implementations: AMR, humanoid, and stationary arm.",
  },
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Intel Robotics AI Suite",
  tagline: "One x86 box that senses, thinks, and moves in real time.",
  favicon: "img/favicon.ico",

  url: process.env.SITE_URL || "http://localhost:3000",
  baseUrl: process.env.BASE_URL || "/",
  trailingSlash: true,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  // AI Models catalog is backed by a Hugging Face organization. `hfToken` is a
  // read token used ONLY to reach a private staging org during testing; it is
  // baked into the client bundle, so never set HF_TOKEN for a public/prod build.
  customFields: {
    hfOrg: process.env.HF_ORG || "modelapi",
    hfToken: process.env.HF_TOKEN || null,
    // Catalog membership marker. Only repos carrying this tag are listed; it is
    // ANDed into every models API query so experimental repos in the org are
    // excluded. Every catalog model must carry this tag.
    hfCatalogTag: process.env.HF_CATALOG_TAG || "robotics-ai-suite",
    // Domain filter options. `label` is shown in the UI; `tag` is the Hugging
    // Face collection tag sent as the models API `filter` value.
    hfDomains: [
      { label: "Physical AI", tag: "physical-ai" },
      { label: "Vision AI", tag: "vision-ai" },
      { label: "Gen AI", tag: "gen-ai" },
    ],
    // Chipset filter options live in src/data/models/chipsets.ts alongside the
    // rest of the catalog data.
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs",
          sidebarPath: "./sidebars.js",
          routeBasePath: "docs",
          // Injects the AI actions toolbar under each doc's H1 at build time.
          remarkPlugins: [remarkAiActions],
          // Blueprints is a top-level navbar section of its own
          // (referenceImplementationsSidebar), so drop it from the main Stack sidebar.
          // The label below must match reference-implementations/_category_.json.
          sidebarItemsGenerator: async ({
            defaultSidebarItemsGenerator,
            ...args
          }) => {
            const items = await defaultSidebarItemsGenerator(args);
            if (args.item.dirName === ".") {
              return items.filter(
                (item) =>
                  !(item.type === "category" && item.label === "Blueprints"),
              );
            }
            return items;
          },
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  plugins: [
    require.resolve("./plugins/model-routes.js"),
    [
      require.resolve("./plugins/llms-text"),
      {
        siteDescription: LLMS_SITE_DESCRIPTION,
        sidebarsConfig: LLMS_SIDEBARS_CONFIG,
        // Export raw markdown for every doc page so each page's AI actions resolve.
        shouldExportFile: () => true,
      },
    ],
  ],

  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexBlog: false,
        indexPages: true,
        searchBarShortcutHint: false,
        docsDir: "docs",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Robotics AI Suite",
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Development Stack",
          },
          {
            to: "/models/",
            label: "AI Models",
            position: "left",
          },
          {
            type: "docSidebar",
            sidebarId: "referenceImplementationsSidebar",
            position: "left",
            label: "Blueprints",
          },
          {
            to: "/skills/",
            label: "Agents Skills",
            position: "left",
          },
          {
            href: "https://github.com/intel-innersource/applications.ai.geti.robotics-ai-suite-docs",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `<div class="legal-footer">
        <span>\u00a9 ${new Date().getFullYear()} Intel Corporation</span>
        <a href="https://www.intel.com/content/www/us/en/legal/terms-of-use.html">Terms of Use</a>
        <a href="https://www.intel.com/content/www/us/en/privacy/intel-cookie-notice.html">Cookies</a>
        <a href="https://www.intel.com/content/www/us/en/privacy/intel-privacy-notice.html">Privacy Policy</a>

      </div>`,
      },
      prism: {
        theme: require("prism-react-renderer").themes.github,
        darkTheme: require("prism-react-renderer").themes.dracula,
      },
    }),
};

module.exports = config;
