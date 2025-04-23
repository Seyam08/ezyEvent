import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useAddEventMutation } from "../../features/Events/eventApi";
import { useLazyGetAllUsersQuery } from "../../features/users/usersApi";
import { addEventFormSchema } from "../../helper/addEvent/addEventFormSchema";
import {
  CalendarIcon,
  CancelCircleHalfDotIcon,
  TickDoubleIcon,
} from "../../icons/icons";
import Calender from "../subComponents/Calender/Calender";
import ErrorMsgBox from "../subComponents/ErrorMsgBox/ErrorMsgBox";
import FullScreenLoader from "../subComponents/Loader/FullScreenLoader/FullScreenLoader";
import SearchInput from "../subComponents/SearchInput/SearchInput";

export default function AddEventModal({ modalIsOpen, closeModal }) {
  const [date, setDate] = useState(new Date());
  const [visibleCalender, setVisibleCalender] = useState(false);
  const [hosts, setHosts] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [getAllUsers, { data, error, isLoading }] = useLazyGetAllUsersQuery();
  const [
    addEvent,
    { data: addEventData, isLoading: addEventLoading, error: responseError },
  ] = useAddEventMutation();
  const navigate = useNavigate();
  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addEventFormSchema),
  });

  // Set the value of "eventDate" in React Hook Form manually
  useEffect(() => {
    setValue("eventDate", date.toLocaleDateString("sv-SE"));
  }, [date, setValue]);

  // Set the value of "hostName" in React Hook Form manually
  useEffect(() => {
    setValue("hostName", hosts);
  }, [hosts, setValue]);

  // Set the value of "speakerName" in React Hook Form manually
  useEffect(() => {
    setValue("speakerName", speakers);
  }, [speakers, setValue]);

  // submit controller
  const onSubmit = (data) => {
    const reqObj = {
      eventName: data.eventName,
      eventDate: data.eventDate.toLocaleDateString("sv-SE"),
      attendanceLimit: data.attendanceLimit,
      hostName: data.hostName,
      speakerName: data.speakerName,
      status: data.status,
    };

    addEvent(reqObj);
  };

  // call data when modal is open
  useEffect(() => {
    if (modalIsOpen) {
      getAllUsers();
    }
  }, [modalIsOpen]);

  // control userdata from api
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong while fetching users!");
    }
    if (data) {
      const filteredUsers = data.map((user) => ({
        name: user.name,
        username: user.username,
        avatar: `${import.meta.env.VITE_SERVER_URL}/${user.avatar}`,
      }));

      setUsersArray(filteredUsers);
    }
  }, [error, data]);

  // handling responseError of addEvent mutation hook
  useEffect(() => {
    const errors = responseError?.data?.errors;

    if (errors) {
      Object.values(errors).forEach((error) => {
        if (error?.msg) {
          toast.error(error.msg);
        }
      });
    }
  }, [responseError]);

  // handling api response of addEvent mutation hook
  useEffect(() => {
    if (addEventData) {
      reset();
      new Promise((resolve, reject) => {
        const duration = 1000;
        // Show the toast
        toast.success(addEventData?.message, { duration: duration });

        // Wait for the toast's duration, then resolve the Promise
        setTimeout(() => {
          if (addEventData?.message) {
            resolve();
          } else {
            reject();
          }
        }, duration);
      })
        .then(() => {
          toast.promise(
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
            {
              loading: "Redirecting to event...",
              success: () => {
                navigate(`/event/${addEventData?.eventId}`);
              },
              error: () => "Something went wrong!",
            }
          );
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  }, [addEventData]);

  return (
    <>
      {isLoading || addEventLoading ? (
        <FullScreenLoader color="bg-[#514cfe]" />
      ) : null}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none w-4/5 md:w-3/4 h-auto md:h-4/5"
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
          onSubmit={handleSubmit(onSubmit)}
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
              {...register("eventName")}
            />
            {errors.eventName && (
              <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                {errors.eventName.message}
              </ErrorMsgBox>
            )}
          </div>

          <div className="flex flex-col col-span-6 md:col-span-2 gap-2">
            <label className="font-medium text-tertiary" htmlFor="event-date">
              Event date
            </label>

            <div className="relative">
              <input
                placeholder="Event date"
                className="block w-full px-2 py-1 text-base font-medium rounded-md focus:outline-none bg-primary text-primary border-b border-transparent focus:border-[#514cfe] cursor-pointer"
                id="event-date"
                type="text"
                readOnly
                value={watch("eventDate")}
                {...register("eventDate")}
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
                } animate-fade-up animate-duration-300 absolute top-9 left-0 z-30`}
              >
                <Calender date={date} setDate={setDate} />
              </div>
            </div>
            {errors.eventDate && (
              <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                {errors.eventDate.message}
              </ErrorMsgBox>
            )}
          </div>

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

          <div className="flex flex-col col-span-6 md:col-span-2 gap-2">
            <label className="font-medium text-tertiary">Event status</label>
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

          <div className="flex flex-col col-span-6 md:col-span-3 gap-2">
            <label className="font-medium text-tertiary">Select Host</label>
            <SearchInput usersList={usersArray} users={setHosts} />
            {errors.hostName && (
              <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                {errors.hostName.message}
              </ErrorMsgBox>
            )}
          </div>

          <div className="flex flex-col col-span-6 md:col-span-3 gap-2">
            <label className="font-medium text-tertiary">Select Speaker</label>
            <SearchInput usersList={usersArray} users={setSpeakers} />
            {errors.speakerName && (
              <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                {errors.speakerName.message}
              </ErrorMsgBox>
            )}
          </div>
          {/* submit button  */}
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 flex gap-2 items-center text-white py-1 px-3 rounded-md font-medium transition-all duration-200"
              type="submit"
              disabled={isLoading || addEventLoading}
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
AddEventModal.propTypes = {
  modalIsOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
