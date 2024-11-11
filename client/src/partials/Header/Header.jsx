import { Link } from "react-router-dom";
import ToogleMode from "../../Components/ToogleMode/ToogleMode";
import UserProfile from "../../Components/subComponents/UserProfile/UserProfile";
import Menu from "../Menu/Menu";
import MobileMenu from "../Menu/MobileMenu";
import styles from "./Header.module.css";
import logo from "/ezyEvent.png";

export default function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link to={"/"}>
          <img src={logo} alt="ezyEvent" />
        </Link>
      </div>
      <Menu customClassname="hidden md:block sidebar-main-nav" />
      <ToogleMode />
      <UserProfile />
      <MobileMenu customClass={"md:hidden"} />
    </nav>
  );
}
