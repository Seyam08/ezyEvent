import PropTypes from "prop-types";
import { menuItem } from "../../../constants/menuItem";
import styles from "./Menu.module.css";

export default function Menu({ customClassname }) {
  return (
    <ul className={customClassname}>
      {menuItem.map((item, key) => {
        const { label, icon: Icon } = item;
        return (
          <li
            key={key}
            className={`${styles.menu_item} text-secondary hover:foreground hover:text-white`}
          >
            <Icon className="text-secondary" />
            {label}
          </li>
        );
      })}
    </ul>
  );
}
Menu.propTypes = {
  customClassname: PropTypes.string,
};
