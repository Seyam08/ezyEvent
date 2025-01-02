import PropTypes from "prop-types";
import useColorMode from "../../hooks/useColorMode";
import { MoonIcon, SunIcon } from "../../icons/icons";
import styles from "./ToogleMode.module.css";

export default function ToogleMode({ customClass = "bg-primary border-thin" }) {
  const [theme, setTheme] = useColorMode();

  const handleDarkSwitch = () => {
    setTheme("dark");
  };
  const handleLightSwitch = () => {
    setTheme("light");
  };

  return (
    <div className={styles.mode_btn_container}>
      <div className={`${styles.area} ${customClass ? customClass : ""}`}>
        <button
          onClick={handleDarkSwitch}
          className={`${styles.mode_btn} bg-transparent text-primary  dark:foreground hover:foreground hover:text-white`}
        >
          <MoonIcon className="dark:fill-current fill-none h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={handleLightSwitch}
          className={`${styles.mode_btn} foreground text-white dark:bg-transparent
        hover:foreground`}
        >
          <SunIcon className="fill-current dark:fill-none h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </div>
  );
}

ToogleMode.propTypes = {
  customClass: PropTypes.string,
};
