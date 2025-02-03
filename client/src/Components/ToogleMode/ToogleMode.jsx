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
          <MoonIcon className="dark:fill-current fill-none h-4 w-4 2xl:h-5 2xl:w-5" />
        </button>
        <button
          onClick={handleLightSwitch}
          className={`${styles.mode_btn} foreground text-white dark:bg-transparent
        hover:foreground`}
        >
          <SunIcon className="fill-current dark:fill-none h-4 w-4 2xl:h-5 2xl:w-5" />
        </button>
      </div>
    </div>
  );
}

ToogleMode.propTypes = {
  customClass: PropTypes.string,
};
