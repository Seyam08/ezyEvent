import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/ezyTrans.png";
import ToogleMode from "../../../Components/ToogleMode/ToogleMode";
import { menuItem } from "../../../constants/menuItem";
import MobileMenu from "../../Menu/MobileMenu";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <div className="flex items-center justify-between gap-3 max-w-5xl w-full mx-auto px-4 py-3 md:px-6">
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
                  <li className="text-primary font-semibold px-3 py-2 hover:text-black dark:hover:text-white transition-colors rounded-xl">
                    {label}
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto md:ml-0">
          <ToogleMode />
        </div>

        <MobileMenu customClass={"md:hidden"} menuItem={menuItem} />
      </div>
    </header>
  );
}
