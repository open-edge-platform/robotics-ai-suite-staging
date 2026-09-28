import { Cpu, Handshake } from "lucide-react";
import { Link } from "../../components/Link";
import { Section } from "../../components/Section";
import styles from "./RoboticsEcosystem.module.css";

const resources = [
  {
    title: "Intel Robotics",
    description: "See how Intel enables intelligent robotics solutions",
    href: "https://www.intel.com/robotics",
    label: "intel.com/robotics",
    icon: Cpu,
  },
  {
    title: "Robotics Builders",
    description: "Explore validated edge AI systems to scale robotics deployments",
    href: "https://builders.intel.com/communities/robotics/scale#hardware",
    label: "Explore robotics hardware",
    icon: Handshake,
  },
];

export const RoboticsEcosystem = () => (
  <Section className={styles.container} id="robotics-ecosystem">
    <Section.Title>Explore the Intel Robotics Ecosystem</Section.Title>
    <div className={styles.resources}>
      {resources.map(({ title, description, href, label, icon: Icon }) => (
        <div className={styles.resource} key={title}>
          <Icon className={styles.icon} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{description}</p>
          <Link href={href} label={label} />
        </div>
      ))}
    </div>
  </Section>
);