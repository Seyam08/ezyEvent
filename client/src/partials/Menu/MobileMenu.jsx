import PropTypes from "prop-types";
import { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { MenuIcon } from "../../icons/icons";
import SubMenu from "./SubMenu";

export default function MobileMenu({
  customClass,
  menuItem,
  color = "text-primary",
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useClickOutside(() => setOpen(false));

  return (
    <div className={`relative z-10 px-1 ${customClass}`} ref={menuRef}>
      <MenuIcon
        onClick={() => setOpen((prevState) => !prevState)}
        className={`cursor-pointer ${color}`}
      />
      <SubMenu
        menuItem={menuItem}
        isOpen={open}
        positionClass="right-2 top-10"
      />
    </div>
  );
}
MobileMenu.propTypes = {
  customClass: PropTypes.string,
  menuItem: PropTypes.array.isRequired,
  color: PropTypes.string,
};
