import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function TooltipIcon({ text, icon: Icon, link }) {
  return (
    <div className="group relative w-6 h-6">
      <Link to={link ? link : "#"} target={"_blank"}>
        <Icon className="w-full h-full hover:scale-125 duration-200 text-secondary hover:text-glow" />
      </Link>
      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border-thin bg-primary text-secondary py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
        {text}
      </span>
    </div>
  );
}
TooltipIcon.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  link: PropTypes.string,
};
