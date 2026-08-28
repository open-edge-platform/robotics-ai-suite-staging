import { isValidElement, ReactNode } from "react";
import Link from "../Link";
import styles from "./styles.module.css";

type DottedCardDetailsProps = {
  title: string;
  children?: ReactNode;
  className?: string;
  readModeLink: string;
};

export const DottedCardDetails = ({
  title,
  children,
  className = "",
  readModeLink,
}: DottedCardDetailsProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <h4 className={styles.title}>{title}</h4>

      {children && <div className={styles.description}>{children}</div>}

      <Link href={readModeLink} label="Read more" className={styles.link} />
    </div>
  );
};

export default DottedCardDetails;
