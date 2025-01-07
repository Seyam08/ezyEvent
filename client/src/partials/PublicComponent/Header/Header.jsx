import PropTypes from "prop-types";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/ezyTrans.png";
import ToogleMode from "../../../Components/ToogleMode/ToogleMode";
import { menuItem } from "../../../constants/menuItem";
import { useScroll } from "../../../hooks/useScroll";
import MobileMenu from "../../Menu/MobileMenu";

export default function Header({ sticky = false }) {
  const { isScrollBottom, isScrollTop, isScrollUp } = useScroll();
  return (
    <header
      className={`px-2 md:px-8 py-1 z-30 ${
        sticky
          ? `fixed inset-x-0 top-0 transition-all ease-in-out duration-500 ${
              !isScrollBottom && !isScrollTop && !isScrollUp
                ? "transform -translate-y-full"
                : ""
            } ${
              isScrollTop
                ? "bg-transparent"
                : "foreground-2nd shadow-light-shadow dark:shadow-dark-shadow"
            }`
          : "flex justify-between items-center"
      }`}
    >
      <div className="flex items-center justify-between gap-3 width-holder px-4 py-3 md:px-6">
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
          <ToogleMode customClass={"bg-slate-300 bg-opacity-20"} />
        </div>

        <MobileMenu customClass={"md:hidden"} menuItem={menuItem} />
      </div>
    </header>
  );
}

Header.propTypes = {
  sticky: PropTypes.bool,
};
