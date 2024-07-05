import logo from "../../../assets/ezyEvent.png";
import Menu from "../Menu/Menu";
import ToogleMode from "../ToogleMode/ToogleMode";
import UserProfile from "../UserProfile/UserProfile";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img src={logo} alt="ezyEvent" />
      </div>
      <Menu customClassname="hidden md:block" />
      <ToogleMode />
      <UserProfile />
    </nav>
  );
}
