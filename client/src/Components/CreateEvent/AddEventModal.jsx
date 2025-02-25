import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "react-modal";
import { CancelCircleHalfDotIcon, TickDoubleIcon } from "../../icons/icons";
import Calender from "../subComponents/Calender/Calender";

export default function AddEventModal({ modalIsOpen, closeModal }) {
  const [date, setDate] = useState(new Date());

  console.log(date.toLocaleDateString("sv-SE"));

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none w-4/5 md:w-3/4"
      overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-40"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-primary font-semibold">Create Event</h2>
        <button
          onClick={closeModal}
          className="bg-red-500 rounded-lg p-1 text-white text-xl"
        >
          <CancelCircleHalfDotIcon className="text-white" />
        </button>
      </div>

      <form
        className="grid grid-cols-1 gap-4 text-sm text-secondary py-2"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium text-tertiary" htmlFor="new-name">
            New name
          </label>
          <input
            id="new-name"
            placeholder="Type your fullname..."
            autoComplete="off"
            className="px-2 py-1 text-base font-medium rounded-lg border focus:outline focus:outline-1 focus:outline-offset-1 bg-transparent text-primary focus:outline-[#aaaaaa] border-[#514cfe]"
            // {...formRegister("fullname")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-tertiary" htmlFor="new-email">
            New email
          </label>
          <input
            id="new-email"
            placeholder="Type your email..."
            autoComplete="off"
            className="px-2 py-1 text-base font-medium rounded-lg border focus:outline focus:outline-1 focus:outline-offset-1 bg-transparent text-primary focus:outline-[#aaaaaa] border-[#514cfe]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Calender date={date} setDate={setDate} />
        </div>
        {/* submit button  */}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 flex gap-2 items-center text-white py-1 px-3 rounded-md font-medium transition-all duration-200"
            type="submit"
            // disabled={isLoading}
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
      </form>
    </Modal>
  );
}
AddEventModal.propTypes = {
  modalIsOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
