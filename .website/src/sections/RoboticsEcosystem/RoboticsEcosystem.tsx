import { Link } from "../../components/Link";
import { Section } from "../../components/Section";
import styles from "./RoboticsEcosystem.module.css";

const resources = [
  {
    title: "Intel Robotics",
    description: "Explore Intel's robotics technologies and platform portfolio.",
    href: "https://www.intel.com/robotics",
    label: "Explore Intel Robotics",
  },
  {
    title: "Hardware for Robotics",
    description:
      "Discover compute systems and vision devices for perception, AI, and control.",
    href: "https://builders.intel.com/communities/robotics/scale#hardware",
    label: "Browse hardware",
  },
  {
    title: "Partner Solutions",
    description:
      "Find Intel-powered edge AI systems and applications from ecosystem partners.",
    href: "https://builders.intel.com/ecosystem-engagement/solution-hub/edge-ai-catalog/partner-spotlight?cp=53&cid=202&type=system",
    label: "Explore partner solutions",
  },
];

export const RoboticsEcosystem = () => (
  <Section className={styles.container} id="robotics-ecosystem">
    <Section.Title>Explore the Intel Robotics Ecosystem</Section.Title>
    <div className={styles.resources}>
      {resources.map(({ title, description, href, label }) => (
        <div className={styles.resource} key={title}>
          <h3>{title}</h3>
          <p>{description}</p>
          <Link href={href} label={label} />
        </div>
      ))}
    </div>
  </Section>
);