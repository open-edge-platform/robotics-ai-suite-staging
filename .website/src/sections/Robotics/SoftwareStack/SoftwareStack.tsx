import styles from "./SoftwareStack.module.css";
import clsx from "clsx";
import { sectionIds } from "../../Robotics/util";
import { useState } from "react";

import roboticsAiSuite from "../../../../static/img/robotics-ai-suite.png";
import { CollapsibleCard } from "../../../components/CollapsibleCard";

type SoftwareStackProps = {
  className: string;
};
export const SoftwareStack = ({ className }: SoftwareStackProps) => {
  const [openCard, setOpenCard] = useState<string | null>(null);

  const toggleCard = (cardTitle: string) => {
    setOpenCard((current) => (current === cardTitle ? null : cardTitle));
  };

  return (
    <div className={className}>
      <h3 className={styles.textEnd}>
        Robotics <br />
        <span>Development Stack</span>
      </h3>

      <p className={clsx(styles.description)}>
        A modular software stack spanning blueprints, AI toolkits, and inference
        backends for production robotics.
      </p>

      <div className={styles.mapContent}>
        <img
          className={styles.roboticsAiSuite}
          src={roboticsAiSuite}
          alt="Robotics AI Suite"
        />

        <div className={styles.cards}>
          <CollapsibleCard
            title="Blueprints"
            href={`#${sectionIds.blueprints}`}
            isOpen={openCard === "Blueprints"}
            onToggle={() => toggleCard("Blueprints")}
          >
            <ul>
              <li>Humanoid Robot</li>
              <li>Autonomous Mobile Robot</li>
              <li>Stationary Arm Robot</li>
            </ul>
          </CollapsibleCard>

          <CollapsibleCard
            title="AI Toolkits"
            href={`#${sectionIds.aiToolkits}`}
            isOpen={openCard === "AI Toolkits"}
            onToggle={() => toggleCard("AI Toolkits")}
          >
            <ul>
              <li>Physical Al</li>
              <li>Vision Al</li>
              <li>Gen Al</li>
            </ul>
          </CollapsibleCard>

          <CollapsibleCard
            title="Inference Backends"
            href={`#${sectionIds.aiToolkits}`}
            isOpen={openCard === "Inference Backends"}
            onToggle={() => toggleCard("Inference Backends")}
          >
            <ul>
              <li>OpenVINO</li>
              <li>PyTorch</li>
            </ul>
          </CollapsibleCard>

          <CollapsibleCard
            title="Perception"
            href={`#${sectionIds.perception}`}
            isOpen={openCard === "Perception"}
            onToggle={() => toggleCard("Perception")}
          >
            <ul>
              <li>GMSL/MIPI-SCI/UVC cameras</li>
              <li>Intel Image Processing Unit</li>
            </ul>
          </CollapsibleCard>

          <CollapsibleCard
            title="Realtime Control"
            href={`#${sectionIds.realtimeControl}`}
            isOpen={openCard === "Realtime Control"}
            onToggle={() => toggleCard("Realtime Control")}
          >
            <ul>
              <li>Deterministic execution, Intel TCC, PREEMPT_RT</li>
              <li>CAN-FD, EtherCAT interfaces</li>
            </ul>
          </CollapsibleCard>

          <CollapsibleCard
            title="Safety"
            href={`#${sectionIds.realtimeControl}`}
            isOpen={openCard === "Safety"}
            onToggle={() => toggleCard("Safety")}
          >
            <ul>
              <li>Intel FuSa</li>
              <li>Fail safe over EtherCAT</li>
            </ul>
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
};
