import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";
import { regFormSchema } from "../../helper/registration/regFormSchema";
import { regResErrorHandler } from "../../helper/registration/regResErrorHandler";
import { FileAddIcon } from "../../icons/icons";
import AnimatedCheckbox from "../subComponents/AnimatedCheckbox/AnimatedCheckbox";
import ErrorMsgBox from "../subComponents/ErrorMsgBox/ErrorMsgBox";
import FullScreenLoader from "../subComponents/Loader/FullScreenLoader/FullScreenLoader";
import styles from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const [agreed, setAgreed] = useState(false);
  const [resError, setResError] = useState({});
  const navigate = useNavigate();
  // react hook form
  const {
    register: formRegister,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(regFormSchema),
  });
  const selectedFile = watch("avatar");
  // rtk mutation
  const [register, { data, isLoading, error: responseError }] =
    useRegisterMutation();

  // form submit handler
  const onSubmit = (data) => {
    setResError({});
    // Prepare FormData
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("name", data.fullname);
    formData.append("password", data.password);
    if (data.avatar) {
      formData.append("avatar", data.avatar[0]);
    }

    register(formData);
  };

  useEffect(() => {
    // Set the value of "agreed" in React Hook Form manually
    setValue("agreed", agreed);
  }, [agreed, setValue]);

  // handling the error and resetting the form after successful
  useEffect(() => {
    if (responseError) {
      const extractError = regResErrorHandler(responseError);
      setResError(extractError);
    }
    if (data) {
      setAgreed(false);
      reset();
    }
  }, [data, responseError, reset]);

  // redirect to login after successfully registered
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
              }, 2000);
            }),
            {
              loading: "Redirecting to login...",
              success: () => {
                navigate("/login");
              },
              error: "Something went wrong",
            }
          );
        })
        .catch(() => {});
    }
  }, [data]);

  return (
    <div className={styles.registration_form}>
      <div className={`${styles.form_box} bg-secondary box-shadow`}>
        {isLoading ? <FullScreenLoader color="bg-[#514cfe]" /> : null}

        <form className={styles.inner_box} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.two_col_inp_fild}>
            {/* full name  */}
            <div>
              <label
                className={`${styles.form_label} text-primary`}
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                className={`${styles.input_box} bg-primary`}
                type="text"
                id="fullname"
                {...formRegister("fullname")}
              />
              {errors.fullname && (
                <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                  {errors.fullname.message}
                </ErrorMsgBox>
              )}
            </div>
            {/* email  */}
            <div>
              <label
                className={`${styles.form_label} text-primary`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`${styles.input_box} bg-primary`}
                type="email"
                id="email"
                {...formRegister("email")}
              />
              {errors.email && (
                <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                  {errors.email.message}
                </ErrorMsgBox>
              )}
              {resError?.email && (
                <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                  {resError.email}
                </ErrorMsgBox>
              )}
            </div>
            {/* username  */}
            <div>
              <label
                className={`${styles.form_label} text-primary`}
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={`${styles.input_box} bg-primary`}
                type="text"
                id="username"
                {...formRegister("username")}
              />
              {errors.username && (
                <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                  {errors.username.message}
                </ErrorMsgBox>
              )}
              {resError?.username && (
                <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                  {resError.username}
                </ErrorMsgBox>
              )}
            </div>
            {/* phone  */}
            <div>
              <label
                className={`${styles.form_label} text-primary`}
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className={`${styles.input_box} bg-primary`}
                type="tel"
                id="phone"
                {...formRegister("phone")}
              />
              {errors.phone && (
                <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                  {errors.phone.message}
                </ErrorMsgBox>
              )}
            </div>
            {/* password  */}
            <div>
              <label
                className={`${styles.form_label} text-primary`}
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`${styles.input_box} bg-primary`}
                type="password"
                id="password"
                {...formRegister("password")}
              />
              {errors.password && (
                <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                  {errors.password.message}
                </ErrorMsgBox>
              )}
              {resError?.password && (
                <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                  {resError.password}
                </ErrorMsgBox>
              )}
            </div>
            {/* confirm Password */}
            <div>
              <label
                className={`${styles.form_label} text-primary`}
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <input
                className={`${styles.input_box} bg-primary`}
                type="password"
                id="confirmPassword"
                {...formRegister("confirmPassword")}
              />
              {errors.confirmPassword && (
                <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                  {errors.confirmPassword.message}
                </ErrorMsgBox>
              )}
            </div>
          </div>
          {/* date of birth and gender  */}
          {/* <div className={styles.two_col_inp_fild}>
            <div>
              <label
                className={`${styles.form_label} text-primary`}
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                className={`${styles.input_box} bg-primary`}
                type="date"
                id="dob"
              />
            </div>
            <div>
              <label
                className={`${styles.form_label} text-primary`}
                htmlFor="gender"
              >
                Gender
              </label>
              <select className={`${styles.input_box} bg-primary`} id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div> */}
          {/* <div className={styles.center_btn_row}>
            <div>
              <button
                className={`${styles.signUp_with_btn} bg-tertiary text-primary`}
              >
                <GoogleIcon />
                <span className="ml-2">Sign up with Google</span>
              </button>
              <button
                className={`${styles.signUp_with_btn} bg-tertiary text-primary mt-4`}
              >
                <AppleIcon />
                <span className="ml-2">Sign up with Apple</span>
              </button>
            </div>
          </div> */}
          {/* add avatar button  */}

          <div>
            <input
              id="avatar"
              type="file"
              className="hidden"
              {...formRegister("avatar")}
              accept="image/png, image/jpeg"
            />
            <label
              htmlFor="avatar"
              className="flex items-center justify-center max-w-max px-3 py-1 foreground bg-opacity-50 text-primary rounded-md shadow cursor-pointer hover:bg-opacity-100 transition-all mb-3 text-sm 2xl:text-lg"
            >
              <FileAddIcon className="text-primary h-4 w-4 mr-2" />
              Add Avatar
            </label>
            {selectedFile?.length > 0 && (
              <>
                <ErrorMsgBox bgColor="bg-amber-400" txtColor="text-amber-400">
                  {selectedFile[0].name}
                </ErrorMsgBox>
              </>
            )}
            {errors.avatar && (
              <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                {errors.avatar.message}
              </ErrorMsgBox>
            )}
          </div>
          {/* t&c agreed */}
          <div>
            <div className="flex my-3">
              <AnimatedCheckbox isChecked={agreed} setIsChecked={setAgreed} />

              <label className="text-secondary text-sm 2xl:text-lg">
                Agreed with the terms and condition
              </label>
            </div>
            {errors.agreed && (
              <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                {errors.agreed.message}
              </ErrorMsgBox>
            )}
          </div>

          <div className={styles.submit_btn_row}>
            <button
              className={styles.submit_btn}
              type="submit"
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
          <div>
            {resError?.fetch && (
              <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                {resError.fetch}
              </ErrorMsgBox>
            )}
            {data?.message && (
              <ErrorMsgBox bgColor="bg-emerald-400" txtColor="text-emerald-400">
                {data.message}
              </ErrorMsgBox>
            )}
          </div>
          <div className={styles.short_note_row}>
            <span className={styles.line} />
            <p className={`${styles.note}  text-primary`} href="#">
              Have an account?{" "}
              <Link
                to={"/login"}
                className="ml-1.5 text-glow font-medium uppercase hover:underline hover:decoration-2 hover:underline-offset-2 transition-all"
              >
                Log in
              </Link>
            </p>
            <span className={styles.line} />
          </div>
        </form>
      </div>
    </div>
  );
}
