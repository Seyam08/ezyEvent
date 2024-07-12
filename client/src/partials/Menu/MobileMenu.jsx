import PropTypes from "prop-types";
import { useState } from "react";
import { menuItem } from "../../constants/menuItem";
import { MenuIcon } from "../../icons/icons";
import SubMenu from "./SubMenu";

export default function MobileMenu({ customClass }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative z-50 px-1 ${customClass}`}>
      <MenuIcon
        onClick={() => setOpen((prevState) => !prevState)}
        className="cursor-pointer text-primary"
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
};
