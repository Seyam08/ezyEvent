import { useState } from "react";
import DemoAccountModal from "./DemoAccountModal";

export default function DemoAccount() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div
        className="py-0.5 px-1.5 rounded-lg foreground text-primary hover:bg-primary cursor-pointer transition-all"
        onClick={openModal}
      >
        Demo account
      </div>
      <DemoAccountModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
}
