import { yupResolver } from "@hookform/resolvers/yup";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useEditEventSpeakersMutation } from "../../../features/Events/eventApi";
import { useLazyGetAllUsersQuery } from "../../../features/users/usersApi";
import { resErrorHandler } from "../../../helper/commmon/resErrorHandler";
import { editEventSpeakersSchema } from "../../../helper/EditEvent/editEventSpeakersSchema";
import { CancelCircleHalfDotIcon, TickDoubleIcon } from "../../../icons/icons";
import ErrorMsgBox from "../../subComponents/ErrorMsgBox/ErrorMsgBox";
import ItemHeading from "../../subComponents/Heading/ItemHeading";
import ComponentLoader from "../../subComponents/Loader/ComponentLoader/ComponentLoader";
import SearchInput from "../../subComponents/SearchInput/SearchInput";

export default function EditEventSpeakersModal({
  modalIsOpen,
  closeModal,
  currentSpeakers,
  eventId,
}) {
  const [usersArray, setUsersArray] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [existedUsers, setExistedUsers] = useState([]);
  const [getAllUsers, { data, error, isLoading }] = useLazyGetAllUsersQuery();
  const [
    editEventSpeakers,
    { data: editEventData, isLoading: editEventLoading, error: editEventError },
  ] = useEditEventSpeakersMutation();
  //   react hook form
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editEventSpeakersSchema),
  });

  // call data when modal is open
  useEffect(() => {
    if (modalIsOpen) {
      getAllUsers();
    }
  }, [modalIsOpen]);

  // control userdata from api and passing to the search input
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong while fetching users!");
    }
    if (data) {
      const filteredUsers = data.map((user, index) => ({
        id: index + 1,
        name: user.name,
        username: user.username,
        avatar: `${import.meta.env.VITE_SERVER_URL}/${user.avatar}`,
      }));

      setUsersArray(filteredUsers);
    }
  }, [error, data]);

  // setting the current speakers to the speakers list
  useEffect(() => {
    if (currentSpeakers) {
      const filteredUsers = currentSpeakers.map((user, index) => ({
        id: index + 1,
        name: user.name,
        username: user.username,
        avatar: `${import.meta.env.VITE_SERVER_URL}/avatars/${user.avatar}`,
      }));
      setExistedUsers(filteredUsers);
    }
  }, [currentSpeakers]);

  // Set the value of "speakersName" in React Hook Form manually
  useEffect(() => {
    setValue("speakersName", speakers);
  }, [speakers]);

  // submit controller
  const onSubmit = (data) => {
    // checking if the speakers list is same as the previous status
    const newSpeakers = data.speakersName;
    const oldSpeakers = currentSpeakers.map((speaker) => speaker.username);

    const isSame = isEqual(newSpeakers, oldSpeakers);

    if (isSame) {
      setError("speakersName", {
        type: "custom",
        message: "It's same as previous speakers list!",
      });
      return;
    } else {
      clearErrors("speakersName");
      editEventSpeakers({
        id: eventId,
        data: { speakerNames: newSpeakers },
      });
      reset();
    }
  };

  // handling ui and notifying after api call
  useEffect(() => {
    if (editEventData?.message) {
      toast.success("Event speakers list updated successfully!");
      closeModal();
    }
    if (editEventError) {
      const errorMsg = resErrorHandler(editEventError);
      toast.error(errorMsg.message);
    }
  }, [editEventData, editEventError]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none w-auto h-auto space-y-3 py-5"
        overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-40"
      >
        {isLoading && editEventLoading ? (
          <div className="absolute top-1/3 left-1/4">
            <ComponentLoader />
          </div>
        ) : null}
        <div className="flex justify-between items-center gap-5 mb-4">
          <ItemHeading>Edit events speakers list</ItemHeading>
          <button
            onClick={closeModal}
            className="bg-red-500 rounded-lg p-1 text-white text-xl"
          >
            <CancelCircleHalfDotIcon className="text-white" />
          </button>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col col-span-6 md:col-span-3 gap-2">
            <label className="font-medium text-tertiary">Select Speakers</label>
            <SearchInput
              usersList={usersArray}
              users={setSpeakers}
              existedUsers={existedUsers}
            />
            {errors.speakersName && (
              <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                {errors.speakersName.message}
              </ErrorMsgBox>
            )}
          </div>
          <div>
            <button
              className={`bg-blue-500 hover:bg-blue-700 flex gap-2 items-center text-white py-1 px-3 rounded-md font-medium transition-all duration-200 ${
                isLoading && editEventLoading && "cursor-not-allowed"
              }`}
              type="submit"
              disabled={isLoading || editEventLoading}
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
EditEventSpeakersModal.propTypes = {
  modalIsOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentSpeakers: PropTypes.array,
  eventId: PropTypes.string.isRequired,
};
