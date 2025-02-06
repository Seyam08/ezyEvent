import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useUpdateAvatarMutation } from "../../../features/Profile/profileApi";
import { resErrorHandler } from "../../../helper/commmon/resErrorHandler";
import { editAvatarSchema } from "../../../helper/editAccount/editAvatarSchema";
import {
  CancelCircleHalfDotIcon,
  FileAddIcon,
  TickDoubleIcon,
} from "../../../icons/icons";
import ErrorMsgBox from "../ErrorMsgBox/ErrorMsgBox";

export default function EditAvatar({ modalIsOpen, closeModal }) {
  const [preview, setPreview] = useState({ url: null, name: null });
  const account = useSelector((state) => state.account);
  const [updateAvatar, { data, isLoading, error: resError }] =
    useUpdateAvatarMutation();
  // react hook form
  const {
    register: avatarRegister,
    handleSubmit,
    setValue,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editAvatarSchema),
  });
  const selectedFile = watch("avatar");

  // setting the preview
  useEffect(() => {
    if (selectedFile?.length > 0) {
      const fileName = selectedFile[0].name;
      const fileUrl = URL.createObjectURL(selectedFile[0]);
      setPreview({ url: fileUrl, name: fileName });
    }
  }, [selectedFile]);

  // clearAvatar handler
  const clearAvatar = () => {
    setValue("avatar", null);
    setPreview({ url: null, name: null });
    clearErrors("avatar");
  };

  // destructuring the username
  const username = account?.myAccount?.username;

  // form submit handler
  const onSubmit = (data) => {
    // Prepare FormData
    const formData = new FormData();
    if (data.avatar) {
      formData.append("avatar", data.avatar[0]);
    }
    updateAvatar({ username, data: formData });
  };

  useEffect(() => {
    if (data) {
      reset();
      setValue("avatar", null);
      setPreview({ url: null, name: null });
      const duration = 1000;
      toast.success(data?.message, { duration: duration });
      setTimeout(() => {
        closeModal();
      }, duration);
    }
    if (resError) {
      const extractError = resErrorHandler(resError);
      toast.error(extractError.message);
      reset();
      setValue("avatar", null);
      setPreview({ url: null, name: null });
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
        className="flex flex-row my-5 gap-5 items-end"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* add avatar button  */}
        <div>
          <input
            id="avatar"
            type="file"
            className="hidden"
            {...avatarRegister("avatar")}
            accept="image/png, image/jpeg"
          />
          <label
            htmlFor="avatar"
            className="flex flex-col items-center justify-center max-w-max p-3 foreground bg-opacity-50 text-white font-semibold rounded-md shadow cursor-pointer hover:bg-opacity-100 transition-all text-sm 2xl:text-lg"
          >
            <FileAddIcon className="text-white h-10 w-10 mb-2" />
            Upload New Avatar
          </label>
        </div>
        {/* Preview image  */}
        <div className="space-y-4">
          <div className="w-14">
            {preview.url && <img src={preview.url} alt={preview.name} />}
          </div>
          {errors.avatar && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.avatar.message}
            </ErrorMsgBox>
          )}
          {preview.name && (
            <div className="space-y-2">
              <ErrorMsgBox bgColor="bg-amber-400" txtColor="text-amber-400">
                {preview.name}
              </ErrorMsgBox>
              <button
                type="button"
                onClick={clearAvatar}
                className="bg-orange-500 flex text-white py-1 px-3 rounded-md gap-2"
              >
                Remove <CancelCircleHalfDotIcon className="text-white" />
              </button>
            </div>
          )}
        </div>

        {/* submit button  */}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 flex gap-2 items-center text-white py-1 px-3 rounded-md font-medium
             transition-all duration-200"
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
