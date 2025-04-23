import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useEditEventMutation } from "../../../features/Events/eventApi";
import { resErrorHandler } from "../../../helper/commmon/resErrorHandler";
import { editEventSeatsSchema } from "../../../helper/EditEvent/editEventSeatsSchema";
import { CancelCircleHalfDotIcon, TickDoubleIcon } from "../../../icons/icons";
import ErrorMsgBox from "../../subComponents/ErrorMsgBox/ErrorMsgBox";
import ItemHeading from "../../subComponents/Heading/ItemHeading";
import ComponentLoader from "../../subComponents/Loader/ComponentLoader/ComponentLoader";

export default function EditEventSeatsModal({
  modalIsOpen,
  closeModal,
  currentSeatsLimit,
  eventId,
}) {
  const [seatsLimit, setSeatsLimit] = useState(0);
  const [editEvent, { data, isLoading, error }] = useEditEventMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editEventSeatsSchema),
  });

  //   setting the date to the current event date
  useEffect(() => {
    if (currentSeatsLimit) {
      setSeatsLimit(currentSeatsLimit);
    }
  }, [currentSeatsLimit]);

  // submit controller
  const onSubmit = (data) => {
    // checking if the limit is same as the previous status

    if (seatsLimit === data.attendanceLimit) {
      setError("attendanceLimit", {
        type: "custom",
        message: "It's same as previous limit!",
      });
      return;
    } else {
      editEvent({
        id: eventId,
        data: { attendanceLimit: data.attendanceLimit },
      });
      reset();
    }
  };

  // handling ui and notifying after api call
  useEffect(() => {
    if (data?.message) {
      toast.success("Event seats limit updated successfully!");
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
        <div className="flex justify-between items-center gap-5 mb-4">
          <ItemHeading>Edit event seats limit</ItemHeading>
          <button
            onClick={closeModal}
            className="bg-red-500 rounded-lg p-1 text-white text-xl"
          >
            <CancelCircleHalfDotIcon className="text-white" />
          </button>
        </div>
        <div className="space-y-3 text-center">
          <p className="foreground bg-opacity-10 text-tertiary font-medium px-3 py-1 rounded-md text-base 2xl:text-lg">
            {seatsLimit} seats in total
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col col-span-6 md:col-span-2 gap-2">
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
              {...register("attendanceLimit")}
            />
            {errors.attendanceLimit && (
              <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                {errors.attendanceLimit.message}
              </ErrorMsgBox>
            )}
          </div>
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
        </form>
      </Modal>
    </>
  );
}
EditEventSeatsModal.propTypes = {
  modalIsOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentSeatsLimit: PropTypes.number,
  eventId: PropTypes.string.isRequired,
};
