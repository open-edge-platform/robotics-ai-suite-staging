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
        Build intelligent robots faster with Robotics AI Suite. Pre-validated
        components, specialized reference applications, and hardware-aware
        optimizations help you integrate AI perception with deterministic
        control, optimize workloads across Intel® CPUs, GPUs, and NPUs, and
        scale from prototype to production.
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
