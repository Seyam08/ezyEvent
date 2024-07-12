import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { menuItem } from "../../constants/menuItem";
import styles from "./Menu.module.css";

export default function Menu({ customClassname }) {
  return (
    <ul className={customClassname}>
      {menuItem.map((item, key) => {
        const { href, label, icon: Icon } = item;
        return (
          <NavLink to={href} key={key}>
            <li
              className={`${styles.menu_item} text-secondary hover:foreground hover:text-white`}
            >
              <Icon className="text-secondary" />
              {label}
            </li>
          </NavLink>
        );
      })}
    </ul>
  );
}
Menu.propTypes = {
  customClassname: PropTypes.string,
};
