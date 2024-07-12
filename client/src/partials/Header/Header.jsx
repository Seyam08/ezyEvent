import logo from "../../../public/ezyEvent.png";
import ToogleMode from "../../Components/ToogleMode/ToogleMode";
import UserProfile from "../../Components/subComponents/UserProfile/UserProfile";
import Menu from "../Menu/Menu";
import MobileMenu from "../Menu/MobileMenu";
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
      <MobileMenu customClass={"md:hidden"} />
    </nav>
  );
}
