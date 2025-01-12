import PropTypes from "prop-types";
import defaultImage from "../../assets/avatar.svg";
import ItemHeading from "../../Components/subComponents/Heading/ItemHeading";
import { FacebookIcon, LinkedinIcon, NewTwitterIcon } from "../../icons/icons";
import TooltipIcon from "../subComponents/AnimatedIcons/TooltipIcon";

export default function ProfileCard({
  name,
  designation,
  avatar,
  facebook,
  linkedIn,
  X,
  customClass,
}) {
  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };
  return (
    <div
      className={`rounded-lg px-4 py-6 flex flex-col gap-3 items-center text-center ${customClass}`}
    >
      <div className="w-20 h-20 cursor-pointer">
        <img
          src={avatar}
          onError={handleImageError}
          alt="Avatar"
          className="p-1 rounded-full ring-1 ring-[#514cfe] h-full w-full"
        />
      </div>
      <ItemHeading>{name}</ItemHeading>
      <p className="text-sm text-tertiary">{designation}</p>
      <div className="bg-tertiary flex flex-row w-full justify-center space-x-5 py-2 rounded-md">
        {facebook ? (
          <TooltipIcon text="Facebook" icon={FacebookIcon} link={facebook} />
        ) : null}
        {linkedIn ? (
          <TooltipIcon text="LinkedIn" icon={LinkedinIcon} link={linkedIn} />
        ) : null}
        {X ? <TooltipIcon text="X" icon={NewTwitterIcon} link={X} /> : null}
      </div>
    </div>
  );
}
ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  facebook: PropTypes.string,
  linkdin: PropTypes.string,
  X: PropTypes.string,
  customClass: PropTypes.string,
};
