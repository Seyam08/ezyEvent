import { useState } from "react";
import { AddIcon } from "../../icons/icons";
import AddEventModal from "./AddEventModal";

export default function AddEventBtn() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-0 right-0 p-2">
      <button
        className="group flex items-center justify-center w-11 h-11 foreground rounded-lg cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-40 hover:rounded-lg active:translate-x-1 active:translate-y-1"
        onClick={openModal}
      >
        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3 group-hover:hidden">
          <AddIcon className="text-white fill-current" />
        </div>
        <div className="absolute right-0 left-0 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Add Event
        </div>
      </button>
      <AddEventModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
}
