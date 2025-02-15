import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userLoggedOut } from "../../../features/auth/authSlice";
import { useDeleteUserMutation } from "../../../features/Profile/profileApi";
import { resErrorHandler } from "../../../helper/commmon/resErrorHandler";
import { CancelCircleHalfDotIcon, TickDoubleIcon } from "../../../icons/icons";
import ErrorMsgBox from "../ErrorMsgBox/ErrorMsgBox";

export default function DeleteAccount({ modalIsOpen, closeModal }) {
  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        password: yup
          .string()
          .min(8, "Password must be at least 8 characters") // Minimum length
          .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter"
          ) // Capital letter
          .matches(/\d/, "Password must contain at least one number") // Number
          .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
          ) // Special symbol
          .required("Password is required"),
      })
    ),
  });
  const [deleteUser, { data, isLoading, error: resError }] =
    useDeleteUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const account = useSelector((state) => state.account);
  // destructuring the username
  const username = account?.myAccount?.username;

  // form submit handler
  const onSubmit = (data) => {
    if (data) {
      deleteUser({ username, data: { password: data.password } });
    }
  };

  // show toast notification after getting error
  useEffect(() => {
    if (resError) {
      const extractError = resErrorHandler(resError);
      toast.error(extractError?.message, { duration: 1000 });
    }
  }, [resError]);

  // redirect to LandingPage after successfully deleting account
  useEffect(() => {
    if (data) {
      new Promise((resolve, reject) => {
        const duration = 1000;
        // Show the toast
        toast.success(data?.message, { duration: duration });

        // Wait for the toast's duration, then resolve the Promise
        setTimeout(() => {
          if (data?.message) {
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
              loading: "Redirecting...",
              success: () => {
                dispatch(userLoggedOut());
                navigate("/");
              },
              error: () => {
                return "Something went wrong!";
              },
            }
          );
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    }
  }, [data]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-3 rounded-xl focus-visible:outline-none space-y-3"
      overlayClassName="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-40"
    >
      <button
        onClick={closeModal}
        className="bg-red-500 rounded-lg p-1 text-white text-xl"
      >
        <CancelCircleHalfDotIcon className="text-white" />
      </button>
      <h3 className="text-primary">
        Are you sure you want to permanently delete your account?
      </h3>
      <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
        Please confirm your password to delete your account. This action cannot
        be undone.
      </ErrorMsgBox>
      <form
        className="grid grid-cols-3 items-end gap-4 text-sm text-secondary py-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2 flex flex-col gap-2">
          <input
            type="password"
            id="password"
            placeholder="Confirm your password"
            autoComplete="off"
            className="px-2 py-1 text-base font-medium rounded-lg border focus:outline focus:outline-1 focus:outline-offset-1 bg-transparent text-primary focus:outline-[#aaaaaa] border-[#514cfe]"
            {...formRegister("password")}
          />
          {errors.password && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.password.message}
            </ErrorMsgBox>
          )}
        </div>

        {/* submit button  */}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 flex gap-2 items-center text-white py-2 px-3 rounded-md font-medium transition-all duration-200"
            type="submit"
            // disabled={isLoading}
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
DeleteAccount.propTypes = {
  modalIsOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
