import { menuItem } from "../../../constants/menuItem";
import styles from "./Menu.module.css";

export default function Menu() {
  return (
    <ul>
      {menuItem.map((item, key) => {
        const { label, icon: Icon } = item;
        return (
          <li
            key={key}
            className={`${styles.menu_item} text-secondary hover:foreground hover:text-white`}
          >
            <Icon className="text-secondar" />
            {label}
          </li>
        );
      })}
    </ul>
  );
}
