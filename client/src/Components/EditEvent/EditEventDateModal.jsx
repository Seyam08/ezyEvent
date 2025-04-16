import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useEditEventMutation } from "../../features/Events/eventApi";
import { resErrorHandler } from "../../helper/commmon/resErrorHandler";
import { editEventDateSchema } from "../../helper/EditEvent/editEventDateSchema";
import { CancelCircleHalfDotIcon, TickDoubleIcon } from "../../icons/icons";
import Calender from "../subComponents/Calender/Calender";
import ErrorMsgBox from "../subComponents/ErrorMsgBox/ErrorMsgBox";
import ItemHeading from "../subComponents/Heading/ItemHeading";
import ComponentLoader from "../subComponents/Loader/ComponentLoader/ComponentLoader";

export default function EditEventDateModal({
  modalIsOpen,
  closeModal,
  currentEventDate,
  eventId,
}) {
  const [date, setDate] = useState(new Date());
  const [editEvent, { data, isLoading, error }] = useEditEventMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editEventDateSchema),
  });

  const readAbleDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // setting the date to the current event date
  useEffect(() => {
    if (currentEventDate) {
      const oldDate = new Date(currentEventDate);
      setDate(oldDate);
    }
  }, [currentEventDate]);

  // Set the value of "eventDate" in React Hook Form manually
  useEffect(() => {
    setValue("eventDate", date.toLocaleDateString("sv-SE"));
  }, [date, setValue]);

  // submit controller
  const onSubmit = (data) => {
    // making the date readable
    const readableOldDate = new Date(currentEventDate).toLocaleDateString(
      "sv-SE"
    );
    const readableNewDate = data.eventDate.toLocaleDateString("sv-SE");

    if (readableOldDate == readableNewDate) {
      setError("eventDate", {
        type: "custom",
        message: "Please select a new date!",
      });
      return;
    } else {
      editEvent({
        id: eventId,
        data: { eventDate: readableNewDate },
      });
    }
  };

  // handling ui and notifying after api call
  useEffect(() => {
    if (data?.message) {
      toast.success("Event date updated successfully!");
      closeModal();
    }
    if (error) {
      const errorMsg = resErrorHandler(error);
      toast.error(errorMsg.message);
    }
  }, [data, error]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none w-auto h-auto space-y-3 py-5"
        overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-40"
      >
        {isLoading ? (
          <div className="absolute top-1/3 left-1/4">
            <ComponentLoader />
          </div>
        ) : null}
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
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Calender date={date} setDate={setDate} />
          <div>
            <button
              className={`bg-blue-500 hover:bg-blue-700 flex gap-2 items-center text-white py-1 px-3 rounded-md font-medium transition-all duration-200 ${
                isLoading && "cursor-not-allowed"
              }`}
              type="submit"
              disabled={isLoading}
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
          {errors.eventDate && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.eventDate.message}
            </ErrorMsgBox>
          )}
        </form>
      </Modal>
    </>
  );
}
EditEventDateModal.propTypes = {
  modalIsOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentEventDate: PropTypes.string,
  eventId: PropTypes.string.isRequired,
};
