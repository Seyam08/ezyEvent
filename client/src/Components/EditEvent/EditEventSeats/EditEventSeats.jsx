import PropTypes from "prop-types";
import { useState } from "react";
import { EditIcon } from "../../../icons/icons";
import TooltipIcon from "../../subComponents/AnimatedIcons/TooltipIcon";
import EditEventSeatsModal from "./EditEventSeatsModal";

export default function EditEventSeats({ currentSeatsLimit, eventId }) {
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
      <EditEventSeatsModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        currentSeatsLimit={currentSeatsLimit}
        eventId={eventId}
      />
    </div>
  );
}
EditEventSeats.propTypes = {
  currentSeatsLimit: PropTypes.number,
  eventId: PropTypes.string.isRequired,
};
