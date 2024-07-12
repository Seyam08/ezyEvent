import { useState } from "react";
import image from "../../../assets/user.png";
import { userProfileMenuItem } from "../../../constants/userProfileMenu.js";
import useScreenSize from "../../../hooks/useScreenSize.js";
import { ArrowDataTransferVerticalIcon } from "../../../icons/icons";
import SubMenu from "../../../partials/Menu/SubMenu.jsx";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const smallScreen = useScreenSize(768);

  const handleSubMenu = () => {
    setSubMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.user_profile}>
      <div className={styles.user_icon} onClick={handleSubMenu}>
        <img src={image} alt="user" />
      </div>
      <div className="hidden lg:block">
        <h4 className={`${styles.user_name} text-primary`}>Username</h4>
        <p className={`${styles.user_desc} text-secondary`}>Description</p>
      </div>
      <ArrowDataTransferVerticalIcon
        className="text-primary cursor-pointer"
        onClick={handleSubMenu}
      />
      <SubMenu
        menuItem={userProfileMenuItem}
        isOpen={subMenuOpen}
        positionClass={
          smallScreen ? "right-2 top-12" : "md:left-0 md:bottom-14"
        }
      />
    </div>
  );
}
