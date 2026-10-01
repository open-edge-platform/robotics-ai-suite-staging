## THIS PROJECT IS ARCHIVED

Intel will not provide or guarantee development of or support for this project, including but not limited to, maintenance, bug fixes, new releases or updates. 
Patches to this project are no longer accepted by Intel.  
If you have an ongoing need to use this project, are interested in independently developing it, or would like to maintain patches for the community, please create your own fork of the project.  

contact: webadmin@linux.intel.com
# Robotics AI Suite

A platform for building robots on Intel hardware, organized as the layers of the
Intel robotics stack, from hardware to a running robot. It includes optimized AI
models, robotics skills, and reference implementations.

## Layout

Documentation lives under `docs/`, with one subfolder per layer of the stack.

## Features

- **Model Catalogue** — optimized AI models, filterable by chipset, domain, and more.
- **Blueprints** — end-to-end reference robot designs, each with a walkthrough.
- **Robotics Skills** — reusable, installable robotics skills.

## Making changes

Documentation is written in Markdown under `docs/<layer>/`. Preview it locally
with a live-reloading site:

```bash
cd .website
npm install      # first time only; requires Node >= 20
npm start        # live preview at http://localhost:3000
```

The site renders the domain docs, model catalogue, blueprints, and skills. To
build and serve the static version:

```bash
cd .website
HF_ORG=modelapi HF_TOKEN=<your-hf-read-token> npm run build && npm run serve
```

`HF_ORG`/`HF_TOKEN` point the model catalogue at a Hugging Face organization;
`HF_TOKEN` (a read token) is only needed when that org is private. More settings
live in `.website/docusaurus.config.js` under `customFields`.
