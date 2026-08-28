import styles from "./ItemCard.module.css";

type ItemCardProps = {
  title: string;
  icon: string;
  description: string;
};

export const ItemCard = ({ title, icon, description }: ItemCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <img src={icon} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
