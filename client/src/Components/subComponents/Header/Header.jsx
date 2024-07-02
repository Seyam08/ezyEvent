import { useEffect, useState } from "react";
import logo from "../../../assets/ezyEvent.png";
import Menu from "../Menu/Menu";
import styles from "./Header.module.css";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prev) => {
      return prev === "dark" ? "light" : "dark";
    });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img src={logo} alt="ezyEvent" />
      </div>
      <Menu />
      <button onClick={handleThemeSwitch}>mode</button>
    </nav>
  );
}
