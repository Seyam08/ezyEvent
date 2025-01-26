import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import defaultImage from "../../../assets/user.svg";
import { EditIcon } from "../../../icons/icons";
import TooltipIcon from "../AnimatedIcons/TooltipIcon";

export default function ProfileSummaryBox({ name, role, designation, avatar }) {
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    const imageUrl = `${import.meta.env.VITE_SERVER_URL}/${avatar}`;
    setImage(imageUrl);
  }, [avatar]);

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="flex items-center py-3 max-w-full h-max relative">
      <div className="w-20 h-20 cursor-pointer">
        <img
          src={image}
          alt="Avatar"
          onError={handleImageError}
          className="p-1 rounded-full ring-1 ring-[#514cfe] h-full w-full"
        />
      </div>
      <section className="block border-l border-gray-400 m-3">
        <div className="pl-3">
          <h3 className="text-primary text-subHeading-size font-bold">
            {name}
          </h3>
          <div className="space-x-1">
            {Array.isArray(role) && role.length > 0 ? (
              role.map((item, index) => (
                <span
                  key={index}
                  className="text-primary font-medium text-sm rounded-lg px-2 py-1 bg-emerald-600 bg-opacity-25"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-primary font-medium text-sm rounded-lg px-2 py-1 bg-emerald-600 bg-opacity-25">
                {role}
              </span>
            )}
          </div>
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
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  designation: PropTypes.string,
  avatar: PropTypes.string,
};
