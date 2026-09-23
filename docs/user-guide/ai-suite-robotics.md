<link rel="stylesheet" type="text/css" href="_static/css/style_home_section_tiles.css">

# Robotics AI Suite


Edge AI Suites are collections of open, industry-specific AI software
development kits (SDKs), microservices, and sample applications for independent
software vendors (ISVs), system integrators and solution builders.

The Robotics AI Suite is an open-source toolkit for developing robots that sense,
interact, and make decisions at the edge. Built on a unified Intel platform, the
Suite combines modular tools for vision, control, and AI inference, accelerating
integration and deployment.

Whatever your robotics workload - if you are bringing up a new platform,
integrating sensors and actuators, or optimizing an AI workload with Intel -
these documents help you find compatible ingredients and pipelines for your
robotics application and guidance for deploying on Intel hardware.

:::{image} ./images/intro-light.png
:class: only-light
:::

:::{image} ./images/intro-dark.png
:class: only-dark
:::

## Robot Form Factors

The Robotics AI Suite targets the following robot form factors:

- **[Autonomous Mobile Robot](./hardware_blueprints/amr/index.md)**\
  â€” Wheeled or tracked robots that navigate dynamic environments without fixed
  guidance, using onboard sensing, mapping, and path planning. Common in
  warehouse logistics, material transport, inspection, and last-mile delivery.

- **[Humanoid](./hardware_blueprints/humanoid/index.md)**\
  â€” Human-shaped robots with articulated limbs designed to operate in spaces and
  with tools built for people. Used for manipulation, locomotion, and interactive
  tasks in service, research, and general-purpose automation.

- **[Stationary Arm](./hardware_blueprints/stationary_arm/index.md)**\
  â€” Fixed-base robotic manipulators that perform precise, repeatable operations
  within a defined workspace. Typical applications include pick-and-place,
  assembly, welding, and machine tending on production lines.

## Explore Intel Robotics Ecosystem

[Scale Enablement - Robotics Builders Community | Intel(R) Industry Solution Builders](https://builders.intel.com/communities/robotics/scale)

Explore robotics Scale Enablement and discover how Intel's ecosystem and experts help accelerate robotics solutions from design to deployment.

[Edge AI Partner Spotlight - Solution Hub | Intel(R) Industry Solution Builders](https://builders.intel.com/ecosystem-engagement/solution-hub/edge-ai-catalog/partner-spotlight?cp=53&cid=202&type=system)

Browse our curated catalog of Intel-powered Edge AI systems and applications, delivering real-time innovation, efficiency, and intelligence to your business.

## Next Steps

Continue to the System Requirements guide to learn about supported Intel processors, OS requirements, and development kits:

- **[System Requirements](./platform_foundation/system_requirements.md)** â€” select a platform and install an OS distribution.

![Robot Background](./images/RobotBackground.png)

:::{toctree}
:caption: Platform Foundation
:hidden:

System Requirements <platform_foundation/system_requirements.md>
Getting Started <platform_foundation/getting_started.md>
:::

:::{toctree}
:caption: Components
:hidden:


Intel Optimized Robotics Components <components/optimized_solutions/index>
Navigation <components/navigation/index>
Manipulation <components/manipulation/index>
Real-time Determinism <components/realtime_determinism/index>
Benchmarking <components/benchmarking/index>
Security <components/security/index>
Virtualization <components/virtualization/index>
Sensors <components/sensors/index>
:::


:::{toctree}
:caption: AI Toolkit
:hidden:

Physical AI Studio <ai_resources/ai_toolkits/physical_ai_studio>
OpenVINO Physical AI <ai_resources/ai_toolkits/openvino_physical_ai>
OpenVINO Toolkit <ai_resources/ai_toolkits/openvino_toolkit>
Geti <ai_resources/ai_toolkits/geti>
:::

:::{toctree}
:caption: Resources
:hidden:

Demos & Blogs <resources/demos_and_blogs/index>
Release Notes <resources/release-notes.md>
Troubleshooting <resources/troubleshooting.md>
Glossary <resources/glossary.md>
Get Help or Contribute <https://docs.openedgeplatform.intel.com/dev/OEP-articles/contribution-guide.html>
Hack-a-thon Resources <resources/hackathon_resources.md>
:::
