const fs = require("node:fs");
const path = require("node:path");

// Build-time aggregation: assemble the Docusaurus `docs/` tree inside the site
// dir (`@site/docs`) from content that lives at the repo root. The source of
// truth is split across domain folders; `.website/docs` is generated and
// gitignored.
//
// Convention (one explicit rule, no fallbacks): every top-level repo folder that
// contains a `docs/` subfolder is a domain and maps to `.website/docs/<domain>/`.
// Hidden folders (which excludes the generated site dir `.website`) and anything
// without a `docs/` subfolder are ignored. Collisions fail the build.

const websiteDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(websiteDir, "..");
const destRoot = path.join(websiteDir, "docs");

function copyInto(srcDir, destDir, label) {
  if (!fs.existsSync(srcDir)) {
    throw new Error(`[copy-docs] source does not exist: ${srcDir}`);
  }
  fs.mkdirSync(destDir, { recursive: true });
  // errorOnExist + force:false makes any path collision throw instead of
  // silently overwriting, so overlapping sources fail the build loudly.
  fs.cpSync(srcDir, destDir, {
    recursive: true,
    errorOnExist: true,
    force: false,
  });
  console.log(`[copy-docs] ${label} -> ${path.relative(repoRoot, destDir)}`);
}

fs.rmSync(destRoot, { recursive: true, force: true });
fs.mkdirSync(destRoot, { recursive: true });

// Discover domains: top-level dirs that are not hidden and contain a `docs/`
// subfolder.
const domains = fs
  .readdirSync(repoRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter((name) => !name.startsWith("."))
  .filter((name) => fs.existsSync(path.join(repoRoot, name, "docs")))
  .sort();

for (const domain of domains) {
  copyInto(
    path.join(repoRoot, domain, "docs"),
    path.join(destRoot, domain),
    `${domain}/docs`,
  );
}
