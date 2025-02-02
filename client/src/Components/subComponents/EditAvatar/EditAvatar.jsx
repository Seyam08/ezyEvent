import Modal from "react-modal";

export default function EditAvatar({ modalIsOpen, closeModal }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none"
      overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-40"
    >
      <button
        onClick={closeModal}
        className="bg-cyan-500 rounded-lg px-3 py-1 text-white text-xl"
      >
        x
      </button>
      <div>I am a modal</div>
      <div>I am a modal</div>
      <div>I am a modal</div>
      <div>I am a modal</div>
      <div>I am a modal</div>
      <div>I am a modal</div>
      <div>I am a modal</div>
      <div>I am a modal</div>
      <div>I am a modal</div>
      <div>I am a modal</div>
      <div>I am a modal</div>
    </Modal>
  );
}
