import PropTypes from "prop-types";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/ezyTrans.png";
import ToogleMode from "../../../Components/ToogleMode/ToogleMode";
import { menuItem } from "../../../constants/menuItem";
import MobileMenu from "../../Menu/MobileMenu";

export default function Header({ customClass = "flex" }) {
  return (
    <header
      className={`justify-between items-center px-2 md:px-8 py-1 z-30 ${customClass}`}
    >
      <div className="flex items-center justify-between gap-3 max-w-6xl w-full mx-auto px-4 py-3 md:px-6">
        <div>
          <div className="h-10 w-20">
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
        <nav>
          <ul className="hidden items-center gap-1 md:flex navMenu">
            {menuItem.map((item, key) => {
              const { href, label } = item;
              return (
                <NavLink key={key} to={href}>
                  <li className="text-white font-semibold px-3 py-2 hover:text-gray-800 hover:bg-gray-100 transition-colors rounded-xl">
                    {label}
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto md:ml-0">
          <ToogleMode customClass={"bg-[#625EFE]"} />
        </div>

        <MobileMenu customClass={"md:hidden"} menuItem={menuItem} />
      </div>
    </header>
  );
}

Header.propTypes = {
  customClass: PropTypes.string,
};
