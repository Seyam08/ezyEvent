import PropTypes from "prop-types";
import image from "../../../assets/user.svg";
import { EditIcon } from "../../../icons/icons";
import TooltipIcon from "../AnimatedIcons/TooltipIcon";

export default function ProfileSummaryBox({ name, role, designation }) {
  return (
    <div className="flex items-center py-3 max-w-full h-max relative">
      <div className="w-20 h-20 cursor-pointer">
        <img
          src={image}
          alt="Avatar"
          className="p-1 rounded-full ring-1 ring-[#514cfe] h-full w-full"
        />
      </div>
      <section className="block border-l border-gray-400 m-3">
        <div className="pl-3">
          <h3 className="text-primary text-subHeading-size font-bold">
            {name}
          </h3>
          <h3 className="text-secondary font-semibold text-sm">{role}</h3>
        </div>
        <div className="flex gap-3 pt-2 pl-3">
          <h5 className="text-secondary text-desc-size">{designation}</h5>
        </div>
      </section>

      <div className="absolute top-4 right-4">
        <TooltipIcon text={"Edit"} icon={EditIcon} />
      </div>
    </div>
  );
}
ProfileSummaryBox.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  designation: PropTypes.string,
};
