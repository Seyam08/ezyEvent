import PropTypes from "prop-types";
import { useState } from "react";
import { EditIcon } from "../../../icons/icons";
import TooltipIcon from "../../subComponents/AnimatedIcons/TooltipIcon";
import EditEventStatusModal from "./EditEventStatusModal";

export default function EditEventStatus({ currentEventStatus, eventId }) {
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
      <EditEventStatusModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        currentEventStatus={currentEventStatus}
        eventId={eventId}
      />
    </div>
  );
}
EditEventStatus.propTypes = {
  currentEventStatus: PropTypes.string,
  eventId: PropTypes.string.isRequired,
};
