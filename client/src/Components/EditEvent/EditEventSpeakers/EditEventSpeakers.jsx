import PropTypes from "prop-types";
import { useState } from "react";
import { EditIcon } from "../../../icons/icons";
import TooltipIcon from "../../subComponents/AnimatedIcons/TooltipIcon";
import EditEventSpeakersModal from "./EditEventSpeakersModal";

export default function EditEventSpeakers({ currentSpeakers, eventId }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="absolute top-4 right-0">
      <TooltipIcon text={"Edit"} icon={EditIcon} onClick={openModal} />
      <EditEventSpeakersModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        currentSpeakers={currentSpeakers}
        eventId={eventId}
      />
    </div>
  );
}
EditEventSpeakers.propTypes = {
  currentSpeakers: PropTypes.array,
  eventId: PropTypes.string.isRequired,
};
