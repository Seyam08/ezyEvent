import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function TooltipIcon({
  text,
  icon: Icon,
  link,
  h = "h-6",
  w = "w-6",
  color = "text-secondary",
  onClick,
}) {
  return (
    <div className={`group relative ${h} ${w}`}>
      {link ? (
        <Link to={link} target={"_blank"}>
          <Icon
            className={`w-full h-full hover:scale-125 duration-200 hover:text-glow ${color}`}
          />
        </Link>
      ) : (
        <Icon
          className={`w-full h-full hover:scale-125 duration-200 hover:text-glow ${color}`}
          onClick={onClick}
        />
      )}

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
  h: PropTypes.string,
  w: PropTypes.string,
  color: PropTypes.string,
  onclick: PropTypes.func,
};
