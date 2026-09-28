import clsx from "clsx";
import gitHubIcon from "../../../static/img/icon/github.png";
import optimizeIcon from "../../../static/img/icon/optimize.png";
import robotIcon from "../../../static/img/icon/gradient-robot.png";
import { Section } from "../../components/Section";
import styles from "./HomeHeader.module.css";
import { ItemCard } from "./ItemCard/ItemCard";

export const HomeHeader = (): React.JSX.Element => {
  return (
    <Section className={styles.container}>
      <h1 className={clsx(styles.title, styles.gradient)}>Build Intelligent</h1>
      <h1 className={clsx(styles.title, styles.otherTitle)}>
        Robotics at the Edge
      </h1>

      <p className={styles.description}>
        The Robotics AI Suite brings together curated hardware, real-time
        software, and on-device AI, connected end to end from sensing to motion,
        so the platform engineering is handled for you and your team can focus
        on the robot.
      </p>

      <div className={styles.cardsContainer}>
        <ItemCard
          icon={robotIcon}
          title="Physical AI"
          description="Sample apps, frameworks, and tools for building and deploying adaptive robotics - powering the full Physical AI stack."
        />
        <ItemCard
          icon={optimizeIcon}
          title="Real-Time"
          description="Benefit from integrated, optimized hardware - from silicon to systems - delivering low-latency, scalable AI acceleration."
        />
        <ItemCard
          icon={gitHubIcon}
          title="Open Ecosystem"
          description="Leverage Intel’s open-source sample apps, frameworks, and tools develop and deploy AI robotics solutions at the edge."
        />
      </div>
    </Section>
  );
};
