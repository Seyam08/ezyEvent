import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";

export default function Menu({ customClassname, menuItem }) {
  return (
    <ul className={`${customClassname} min-w-full`}>
      {menuItem.map((item, key) => {
        const { href, label, icon: Icon } = item;
        return (
          <NavLink to={href} key={key} className={styles.active}>
            <li
              className={`${styles.menu_item} text-secondary focus:bg-tertiary hover:bg-tertiary`}
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
  menuItem: PropTypes.array.isRequired,
};
