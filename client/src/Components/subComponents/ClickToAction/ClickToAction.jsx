import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";
import { MoreIcon } from "../../../icons/icons";

export default function ClickToAction({ link }) {
  const [open, setOpen] = useState(false);
  const clickRef = useClickOutside(() => setOpen(false));

  return (
    <div className="relative flex justify-center" ref={clickRef}>
      <MoreIcon
        className="fill-current cursor-pointer text-primary"
        onClick={() => setOpen((prev) => !prev)}
      />
      <div
        className={`${
          open ? "flex" : "hidden"
        } w-24 absolute top-7 right-1 justify-center bg-primary text-primary z-50 text-desc-size  border-thin rounded-full drop-shadow-xl transition animate-fade animate-duration-100 animate-ease-in-out hover:foreground hover:text-white`}
      >
        <Link to={link ? link : "#"} className="block py-1 px-5">
          Details
        </Link>
      </div>
    </div>
  );
}
ClickToAction.propTypes = {
  link: PropTypes.string,
};
