import React from "react";
import Modal from "react-modal";
import { CancelCircleHalfDotIcon } from "../../icons/icons";
import ClickToCopy from "../subComponents/ClickToCopy/ClickToCopy";
import ItemHeading from "../subComponents/Heading/ItemHeading";

export default function DemoAccountModal({ modalIsOpen, closeModal }) {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none w-auto h-auto space-y-3 py-5"
        overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-40"
      >
        <div className="flex justify-between items-center gap-5 mb-4">
          <ItemHeading>Use this demo account to login</ItemHeading>
          <button
            onClick={closeModal}
            className="bg-red-500 rounded-lg p-1 text-white text-xl"
          >
            <CancelCircleHalfDotIcon className="text-white" />
          </button>
        </div>
        {/* copy to clipboard input  */}
        <div>
          <label className="text-primary mb-1">Username</label>
          <ClickToCopy
            modalDependency={modalIsOpen}
            text={import.meta.env.VITE_DEMO_ACCOUNT_USERNAME}
          />
        </div>

        <div>
          <label className="text-primary mb-1">Password</label>
          <ClickToCopy
            modalDependency={modalIsOpen}
            text={import.meta.env.VITE_DEMO_ACCOUNT_PASSWORD}
          />
        </div>
      </Modal>
    </>
  );
}
