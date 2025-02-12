import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import defaultImage from "../../../assets/user.svg";
import { DeleteIcon, EditIcon } from "../../../icons/icons";
import TooltipIcon from "../AnimatedIcons/TooltipIcon";
import DeleteAccount from "../EditProfileComponents/DeleteAccount";
import EditAvatar from "../EditProfileComponents/EditAvatar";

export default function ProfileSummaryBox({ name, role, designation, avatar }) {
  const [image, setImage] = useState(defaultImage);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteMIsOpen] = useState(false);

  // for controlling edit avatar modal
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // for controlling delete account modal
  const openDeleteModal = () => {
    setDeleteMIsOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteMIsOpen(false);
  };

  useEffect(() => {
    const imageUrl = `${import.meta.env.VITE_SERVER_URL}/${avatar}`;
    setImage(imageUrl);
  }, [avatar]);

  // for handling image error - set default image
  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="flex items-center py-3 max-w-full h-max relative">
      <div className="w-20 h-20 cursor-pointer rounded-full relative group">
        <img
          src={image}
          alt="Avatar"
          onError={handleImageError}
          className="p-1 ring-1 ring-[#514cfe] h-full w-full rounded-full"
        />
        <div
          className="hidden group-hover:flex absolute top-0 left-0 h-full w-full bg-gray-700 bg-opacity-30 rounded-full p-1 items-center justify-center cursor-pointer transition-all duration-500"
          onClick={openModal}
        >
          <EditIcon className="text-white" />
        </div>

        <EditAvatar modalIsOpen={modalIsOpen} closeModal={closeModal} />
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
        <TooltipIcon
          text={"Delete"}
          icon={DeleteIcon}
          onClick={openDeleteModal}
        />
        <DeleteAccount
          modalIsOpen={deleteModalIsOpen}
          closeModal={closeDeleteModal}
        />
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
