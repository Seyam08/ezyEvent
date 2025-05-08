import { useState } from "react";
import { useSelector } from "react-redux";
import defaultImage from "../../../assets/user.svg";
import { userProfileMenuItem } from "../../../constants/userProfileMenu.js";
import useClickOutside from "../../../hooks/useClickOutside";
import useScreenSize from "../../../hooks/useScreenSize.js";
import { ArrowDataTransferVerticalIcon } from "../../../icons/icons";
import SubMenu from "../../../partials/Menu/SubMenu.jsx";
import LogoutBtn from "../AuthButton/LogoutBtn.jsx";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const smallScreen = useScreenSize(768);
  const { myAccount } = useSelector((state) => state.account);
  const username = myAccount?.username || "Username";
  const avatar = myAccount?.avatar || "avatars/avatar-default.jpg";
  const menuRef = useClickOutside(() => setSubMenuOpen(false));

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  const handleSubMenu = () => {
    setSubMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.user_profile} ref={menuRef}>
      <div className={styles.user_icon} onClick={handleSubMenu}>
        <img
          onError={handleImageError}
          src={`${import.meta.env.VITE_SERVER_URL}/${avatar}`}
          alt="user"
        />
      </div>
      <div className="hidden lg:block">
        <h4 className={`${styles.user_name} text-primary`}>{username}</h4>
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
        lastBtn={LogoutBtn}
      />
    </div>
  );
}
