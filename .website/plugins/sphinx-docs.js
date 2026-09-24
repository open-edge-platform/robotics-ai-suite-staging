const fs = require("node:fs");
const path = require("node:path");

// The "Development Stack" docs are authored in Sphinx (docs/user-guide) and
// built to docs/out/html by `make build`. Docusaurus doesn't render Sphinx, so
// we stage that pre-built HTML under a subfolder and expose it as a static
// directory. Docusaurus then serves it verbatim at /development-stack/ in both
// `docusaurus start` (dev) and `docusaurus build` (prod).
const SPHINX_HTML_DIR = path.resolve(__dirname, "..", "..", "docs", "out", "html");
const STAGING_DIR = path.resolve(__dirname, "..", ".sphinx-static");
const ROUTE_SUBPATH = "development-stack";

function stageSphinxHtml() {
  const dest = path.join(STAGING_DIR, ROUTE_SUBPATH);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });

  if (!fs.existsSync(SPHINX_HTML_DIR)) {
    console.warn(
      `[sphinx-docs] ${SPHINX_HTML_DIR} not found. Run \`make build\` in docs/ ` +
        `to generate the Sphinx HTML. Serving an empty /${ROUTE_SUBPATH}/ for now.`,
    );
    return;
  }

  fs.cpSync(SPHINX_HTML_DIR, dest, { recursive: true });

  const redirectHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=/development-stack/ai-suite-robotics.html">
    <script>window.location.replace('/development-stack/ai-suite-robotics.html');</script>
  </head>
  <body>
    <p>Redirecting to <a href="/development-stack/ai-suite-robotics.html">Development Stack</a>...</p>
  </body>
</html>`;

  fs.writeFileSync(path.join(dest, "index.html"), redirectHtml);

  const aiSuiteDir = path.join(dest, "ai-suite-robotics");
  fs.mkdirSync(aiSuiteDir, { recursive: true });
  fs.writeFileSync(path.join(aiSuiteDir, "index.html"), redirectHtml);

  console.log(`[sphinx-docs] Staged Sphinx HTML for /${ROUTE_SUBPATH}/`);
}

// Stage at module load so the static directory exists before Docusaurus
// validates `staticDirectories`.
stageSphinxHtml();

module.exports = function sphinxDocsPlugin() {
  return {
    name: "sphinx-docs",
    // Re-stage on each (re)load so a fresh `make build` is picked up by the dev
    // server without restarting Docusaurus.
    loadContent() {
      stageSphinxHtml();
    },
  };
};

module.exports.STAGING_DIR = STAGING_DIR;
module.exports.ROUTE_SUBPATH = ROUTE_SUBPATH;
