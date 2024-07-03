import image from "../../../assets/user.png";
import { ArrowDataTransferVerticalIcon } from "../../../icons/icons";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  return (
    <div className={styles.user_profile}>
      <div className={styles.user_icon}>
        <img src={image} alt="user" />
      </div>
      <div>
        <h4 className={`${styles.user_name} text-primary`}>Username</h4>
        <p className={`${styles.user_desc} text-secondary`}>Description</p>
      </div>
      <ArrowDataTransferVerticalIcon className="text-primary" />
    </div>
  );
}
