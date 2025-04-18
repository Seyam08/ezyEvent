import PropTypes from "prop-types";
import { useState } from "react";
import { EditIcon } from "../../../icons/icons";
import TooltipIcon from "../../subComponents/AnimatedIcons/TooltipIcon";
import EditEventDateModal from "./EditEventDateModal";

export default function EditEventDate({ currentEventDate, eventId }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="absolute top-4 right-4">
      <TooltipIcon text={"Edit"} icon={EditIcon} onClick={openModal} />
      <EditEventDateModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        currentEventDate={currentEventDate}
        eventId={eventId}
      />
    </div>
  );
}
EditEventDate.propTypes = {
  currentEventDate: PropTypes.string,
  eventId: PropTypes.string.isRequired,
};
