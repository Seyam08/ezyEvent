import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";
import styles from "./subMenu.module.css";

export default function SubMenu({
  menuItem,
  isOpen,
  positionClass,
  lastBtn: LastBtn,
}) {
  return (
    <div
      className={`bg-primary border-thin animate-fade-up animate-duration-150 ${positionClass} ${
        styles.sub_menu_box
      } ${isOpen ? "grid" : "hidden"}`}
    >
      <div className="grid">
        {menuItem.map((item, key) => {
          const { href, label, icon: Icon } = item;
          return (
            <HashLink
              smooth={true}
              className={`${styles.sub_menu_item} text-secondary hover:text-primary hover:bg-secondary dark:hover:bg-secondary`}
              to={href}
              key={key}
            >
              <Icon />
              {label}
            </HashLink>
          );
        })}
        {LastBtn ? (
          <div className="px-4 py-2">
            <LastBtn />
          </div>
        ) : null}
      </div>
    </div>
  );
}

SubMenu.propTypes = {
  menuItem: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  positionClass: PropTypes.string.isRequired,
  lastBtn: PropTypes.func,
};
