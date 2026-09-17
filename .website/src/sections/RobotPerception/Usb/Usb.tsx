import Sensor from "../../../../static/img/robot-perception/usb_camera.png";
import Link from "../../../components/Link";
import styles from "./Usb.module.css";

export const Usb = () => {
  const camerasHref = "/development-stack/components/sensors/cameras/index.html";

  return (
    <>
      <div className={styles.imageContainer}>
        <div>
          <h3 className={styles.title}>USB</h3>
          <p className={styles.description}>
            Cameras connected via USB to the developer kit
          </p>

          <ul className={styles.items}>
            <li>
              Flexible and easy to connect to the developer kit via USB
            </li>
            <li>Wide range of USB cameras supported, making USB versatile for different use cases</li>
            <li>
              Easy to configure and use without requiring specialized software
            </li>
          </ul>

          <Link
            href={camerasHref}
            className={styles.link}
            label="See all supported cameras"
          />
        </div>

        <img src={Sensor} alt="USB Sensor" />
      </div>

      <ul className={styles.list}>
        <li>
          Pre-integrated with over 60 ready-to-deploy camera modules from 11
          imaging partners.
        </li>
        <li>
          Validated on 20+ industrial edge boards built by 9 leading
          manufacturers.
        </li>
      </ul>
    </>
  );
};
