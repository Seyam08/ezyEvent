import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useEditProfileMutation } from "../../../features/profile/profileApi";
import { resErrorHandler } from "../../../helper/commmon/resErrorHandler";
import { editAccountsInfoSchema } from "../../../helper/editAccount/editAccountsInfo";
import { CancelCircleHalfDotIcon, TickDoubleIcon } from "../../../icons/icons";
import ErrorMsgBox from "../ErrorMsgBox/ErrorMsgBox";

export default function EditInfo({
  modalIsOpen,
  closeModal,
  prevFullname,
  prevEmail,
}) {
  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editAccountsInfoSchema),
  });
  const [editProfile, { data, isLoading, error: resError }] =
    useEditProfileMutation();
  const account = useSelector((state) => state.account);
  // destructuring the username
  const username = account?.myAccount?.username;

  // set default values after component mount
  useEffect(() => {
    reset({
      fullname: prevFullname,
      email: prevEmail,
    });
  }, [prevFullname, prevEmail]);

  // form submit handler
  const onSubmit = (data) => {
    if (data.fullname || data.email) {
      const formData = new FormData();
      if (data.fullname) {
        formData.append("name", data.fullname);
      }
      if (data.email !== prevEmail) {
        formData.append("email", data.email);
      }

      editProfile({
        username,
        data: formData,
      });
    } else {
      toast.error("Either the name or the email is required.", 1000);
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        fullname: null,
        email: null,
      });
      const duration = 1000;
      toast.success(data?.message, { duration: duration });
      setTimeout(() => {
        closeModal();
      }, duration);
    }
    if (resError) {
      const extractError = resErrorHandler(resError);
      toast.error(extractError.message);
      reset({
        fullname: null,
        email: null,
      });
    }
  }, [data, resError]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none"
      overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-40"
    >
      <button
        onClick={closeModal}
        className="bg-red-500 rounded-lg p-1 text-white text-xl"
      >
        <CancelCircleHalfDotIcon className="text-white" />
      </button>
      <form
        className="grid grid-cols-2 gap-4 text-sm text-secondary py-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium text-tertiary" htmlFor="new-name">
            New name
          </label>
          <input
            id="new-name"
            placeholder="Type your fullname..."
            autoComplete="off"
            className="px-2 py-1 text-base font-medium rounded-lg border focus:outline focus:outline-1 focus:outline-offset-1 bg-transparent text-primary focus:outline-[#aaaaaa] border-[#514cfe]"
            {...formRegister("fullname")}
          />
          {errors.fullname && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.fullname.message}
            </ErrorMsgBox>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-tertiary" htmlFor="new-email">
            New email
          </label>
          <input
            id="new-email"
            placeholder="Type your email..."
            autoComplete="off"
            className="px-2 py-1 text-base font-medium rounded-lg border focus:outline focus:outline-1 focus:outline-offset-1 bg-transparent text-primary focus:outline-[#aaaaaa] border-[#514cfe]"
            {...formRegister("email")}
          />
          {errors.email && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.email.message}
            </ErrorMsgBox>
          )}
        </div>
        {/* submit button  */}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 flex gap-2 items-center text-white py-1 px-3 rounded-md font-medium transition-all duration-200"
            type="submit"
            disabled={isLoading}
          >
            Confirm
            {isLoading ? (
              <div className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
              </div>
            ) : (
              <TickDoubleIcon className="text-white h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
EditInfo.propTypes = {
  modalIsOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  prevFullname: PropTypes.string,
  prevEmail: PropTypes.string,
};
