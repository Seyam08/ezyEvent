import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { editAvatarSchema } from "../../../helper/editAccount/editAvatarSchema";
import { CancelIcon, FileAddIcon } from "../../../icons/icons";
import ErrorMsgBox from "../ErrorMsgBox/ErrorMsgBox";

export default function EditAvatar({ modalIsOpen, closeModal }) {
  const [preview, setPreview] = useState({ url: null, name: null });
  // react hook form
  const {
    register: avatarRegister,
    handleSubmit,
    setValue,
    watch,
    reset,
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

  const clearAvatar = () => {
    setValue("avatar", null);
    setPreview({ url: null, name: null });
  };

  // form submit handler
  const onSubmit = (data) => {
    // // Prepare FormData
    // const formData = new FormData();
    // formData.append("username", data.username);
    // formData.append("email", data.email);
    // formData.append("name", data.fullname);
    // formData.append("password", data.password);
    // if (data.avatar) {
    //   formData.append("avatar", data.avatar[0]);
    // }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none"
      overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-40"
    >
      <button
        onClick={closeModal}
        className="bg-cyan-500 rounded-lg p-1 text-white text-xl"
      >
        <CancelIcon className="text-white fill-white" />
      </button>

      <form className="" onSubmit={handleSubmit(onSubmit)}>
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
            className="flex items-center justify-center max-w-max px-3 py-1 foreground bg-opacity-50 text-primary rounded-md shadow cursor-pointer hover:bg-opacity-100 transition-all mb-3 text-sm 2xl:text-lg"
          >
            <FileAddIcon className="text-primary h-4 w-4 mr-2" />
            Add Avatar
          </label>
          {preview.name && (
            <>
              <button type="button" onClick={clearAvatar}>
                Clear Avatar
              </button>
              <ErrorMsgBox bgColor="bg-amber-400" txtColor="text-amber-400">
                {preview.name}
              </ErrorMsgBox>
            </>
          )}
          {errors.avatar && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.avatar.message}
            </ErrorMsgBox>
          )}
        </div>

        <div className="w-10">
          <img src={preview.url} alt={preview.name} />
        </div>
        <div className="">
          <button className="" type="submit">
            Sign up
          </button>
        </div>
        <div>
          {/* {resError?.fetch && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {resError.fetch}
            </ErrorMsgBox>
          )}
          {data?.message && (
            <ErrorMsgBox bgColor="bg-emerald-400" txtColor="text-emerald-400">
              {data.message}
            </ErrorMsgBox>
          )} */}
        </div>
      </form>
    </Modal>
  );
}
