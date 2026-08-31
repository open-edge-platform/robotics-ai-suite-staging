---
sidebar_position: 0
---

# Blueprints

A blueprint is a validated stack you can replicate. Start with the parts list, follow
the steps, and end with the same working robot.

import BlueprintCard from '@site/src/components/BlueprintCard';
import armDiagram from './img/arm.svg';
import amrDiagram from './img/amr.svg';
import humanoidDiagram from './img/humanoid.svg';

<div className="row">
  <BlueprintCard
    title="Stationary Robot"
    Diagram={armDiagram}
    description="A stationary arm picks up an object using a depth camera and a trained policy."
    link="/docs/reference-implementations/stationary-arm/v1/"
  />
  <BlueprintCard
    title="Autonomous Mobile Robot"
    Diagram={amrDiagram}
    description="SLAM-based mapping and autonomous navigation on a mobile robot using Nav2, FastMapping, and the ITS Path Planner."
    link="/docs/reference-implementations/amr/v1/"
  />
  <BlueprintCard
    title="Humanoid Robot"
    Diagram={humanoidDiagram}
    description="Collect teleoperation data, train an ACT policy, convert it with OpenVINO, and run inference on-device."
    link="/docs/reference-implementations/humanoid/v1/"
  />
</div>
