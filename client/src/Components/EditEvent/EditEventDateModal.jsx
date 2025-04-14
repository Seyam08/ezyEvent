import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { CancelCircleHalfDotIcon, TickDoubleIcon } from "../../icons/icons";
import Calender from "../subComponents/Calender/Calender";
import ItemHeading from "../subComponents/Heading/ItemHeading";

export default function EditEventDateModal({
  modalIsOpen,
  closeModal,
  currentEventDate,
}) {
  const [date, setDate] = useState(new Date());

  const readAbleDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  useEffect(() => {
    if (currentEventDate) {
      const oldDate = new Date(currentEventDate);
      setDate(oldDate);
    }
  }, [currentEventDate]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none w-auto h-auto space-y-3 py-5"
      overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-40"
    >
      <div className="flex justify-between items-center mb-4">
        <ItemHeading>Edit Event date</ItemHeading>
        <button
          onClick={closeModal}
          className="bg-red-500 rounded-lg p-1 text-white text-xl"
        >
          <CancelCircleHalfDotIcon className="text-white" />
        </button>
      </div>
      <div className="flex items-center">
        <h4 className="text-secondary">Current Date -</h4>
        <p className="text-tertiary"> {readAbleDate}</p>
      </div>
      <Calender date={date} setDate={setDate} />
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 flex gap-2 items-center text-white py-1 px-3 rounded-md font-medium transition-all duration-200"
          type="submit"
          // disabled={isLoading || addEventLoading}
        >
          Confirm
          {/* {isLoading ? (
                    <div className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
                    </div>
                  ) : (
                    <TickDoubleIcon className="text-white h-5 w-5" />
                  )} */}
          <TickDoubleIcon className="text-white h-5 w-5" />
        </button>
      </div>
    </Modal>
  );
}
EditEventDateModal.propTypes = {
  modalIsOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentEventDate: PropTypes.string,
};
