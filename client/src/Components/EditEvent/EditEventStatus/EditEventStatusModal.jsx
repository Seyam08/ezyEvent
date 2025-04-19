import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useEditEventMutation } from "../../../features/Events/eventApi";
import { resErrorHandler } from "../../../helper/commmon/resErrorHandler";
import { editEventStatusSchema } from "../../../helper/EditEvent/editEventStatusSchema";
import { getStatusClass } from "../../../helper/enentsTable/getColorClass";
import { CancelCircleHalfDotIcon, TickDoubleIcon } from "../../../icons/icons";
import ErrorMsgBox from "../../subComponents/ErrorMsgBox/ErrorMsgBox";
import ItemHeading from "../../subComponents/Heading/ItemHeading";
import ComponentLoader from "../../subComponents/Loader/ComponentLoader/ComponentLoader";

export default function EditEventStatusModal({
  modalIsOpen,
  closeModal,
  currentEventStatus,
  eventId,
}) {
  const [status, setStatus] = useState("");
  const [editEvent, { data, isLoading, error }] = useEditEventMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editEventStatusSchema),
  });

  //   setting the date to the current event date
  useEffect(() => {
    if (currentEventStatus) {
      setStatus(currentEventStatus);
    }
  }, [currentEventStatus]);

  // submit controller
  const onSubmit = (data) => {
    // checking if the status is same as the previous status
    if (currentEventStatus == data.status) {
      setError("status", {
        type: "custom",
        message: "Please select a new status!",
      });
      return;
    } else {
      editEvent({
        id: eventId,
        data: { status: data.status },
      });
    }
  };

  // handling ui and notifying after api call
  useEffect(() => {
    if (data?.message) {
      toast.success("Event status updated successfully!");
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
          <ItemHeading>Edit Event Status</ItemHeading>
          <button
            onClick={closeModal}
            className="bg-red-500 rounded-lg p-1 text-white text-xl"
          >
            <CancelCircleHalfDotIcon className="text-white" />
          </button>
        </div>
        <div className="flex items-center gap-5">
          <h4 className="text-secondary">Current Status</h4>
          <span className="text-secondary">-</span>
          <div
            className={`py-1 px-5 rounded-full flex justify-center ${getStatusClass(
              status
            )}`}
          >
            <span>{status}</span>
          </div>
        </div>

        <div className="flex flex-col col-span-6 md:col-span-2 gap-2">
          <label className="font-medium text-tertiary">Edit status</label>
          <select
            className="px-2 py-1 pe-9 block w-full border-b border-transparent rounded-md text-base focus:border-[#514cfe] focus:ring-[#514cfe] bg-primary text-primary"
            defaultValue="Upcoming"
            {...register("status")}
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.status.message}
            </ErrorMsgBox>
          )}
        </div>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
EditEventStatusModal.propTypes = {
  modalIsOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentEventStatus: PropTypes.string,
  eventId: PropTypes.string.isRequired,
};
