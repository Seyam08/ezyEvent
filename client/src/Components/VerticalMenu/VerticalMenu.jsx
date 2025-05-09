import { NavLink } from "react-router-dom";
import { accountsPageMenu } from "../../constants/accountsPageMenu";
import styles from "./VerticalMenu.module.css";

export default function VerticalMenu() {
  return (
    <>
      <ul className={`${styles.menu} vertical-menu bg-secondary`}>
        {accountsPageMenu.map((item, key) => {
          const { href, label, icon: Icon } = item;
          return (
            <NavLink to={href} key={key} end>
              <li
                className={`${styles.item} text-primary focus:bg-tertiary hover:bg-tertiary`}
              >
                <Icon />
                {label}
              </li>
            </NavLink>
          );
        })}
      </ul>
    </>
  );
}
