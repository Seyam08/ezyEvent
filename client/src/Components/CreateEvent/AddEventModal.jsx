import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "react-modal";
import {
  CalendarIcon,
  CancelCircleHalfDotIcon,
  TickDoubleIcon,
} from "../../icons/icons";
import Calender from "../subComponents/Calender/Calender";
import SearchInput from "../subComponents/SearchInput/SearchInput";

export default function AddEventModal({ modalIsOpen, closeModal }) {
  const [date, setDate] = useState(new Date());
  const [visibleCalender, setVisibleCalender] = useState(false);

  // console.log(date.toLocaleDateString("sv-SE"));

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none w-4/5 md:w-3/4 h-5/6"
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
        className="grid grid-cols-6 gap-4 text-sm text-secondary py-2"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col col-span-6 gap-2">
          <label className="font-medium text-tertiary" htmlFor="event-name">
            Event name
          </label>
          <input
            id="event-name"
            placeholder="Type Event Name..."
            autoComplete="off"
            className="px-2 py-1 text-base font-medium rounded-md focus:outline-none bg-primary text-primary border-b border-transparent focus:border-[#514cfe]"
            // {...formRegister("fullname")}
          />
        </div>

        <div className="flex flex-col col-span-2 gap-2">
          <label className="font-medium text-tertiary" htmlFor="event-date">
            Event date
          </label>

          <div className="relative">
            <input
              placeholder="Event date"
              className="block w-full px-2 py-1 text-base font-medium rounded-md focus:outline-none bg-primary text-primary border-b border-transparent focus:border-[#514cfe]"
              id="event-date"
              type="text"
            />

            <div className="absolute top-1 right-1">
              <CalendarIcon
                onClick={() => setVisibleCalender((prevState) => !prevState)}
                className="cursor-pointer"
              />
            </div>
            <div
              className={`${
                visibleCalender ? "block" : "hidden"
              } animate-fade-up animate-duration-300 absolute top-9 left-0 z-10`}
            >
              <Calender date={date} setDate={setDate} />
            </div>
          </div>
        </div>

        <div className="flex flex-col col-span-2 gap-2">
          <label
            className="font-medium text-tertiary"
            htmlFor="attendance-limit"
          >
            Attendance Limit
          </label>
          <input
            id="attendance-limit"
            type="number"
            placeholder="Set attendance limit"
            autoComplete="off"
            className="px-2 py-1 text-base font-medium rounded-md focus:outline-none bg-primary text-primary border-b border-transparent focus:border-[#514cfe]"
            // {...formRegister("fullname")}
          />
        </div>

        <div className="flex flex-col col-span-2 gap-2">
          <label className="font-medium text-tertiary">Event status</label>
          <select
            className="px-2 py-1 pe-9 block w-full border-b border-transparent rounded-md text-base focus:border-[#514cfe] focus:ring-[#514cfe] bg-primary text-primary"
            defaultValue="Upcoming"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col col-span-3 gap-2">
          <label className="font-medium text-tertiary">Select Host</label>
          <SearchInput />
        </div>
        <div className="flex flex-col col-span-3 gap-2">
          <label className="font-medium text-tertiary">Select Speaker</label>
          <SearchInput />
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
