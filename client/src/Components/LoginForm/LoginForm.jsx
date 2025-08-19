import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { redirectHolder } from "../../features/auth/authSlice";
import { loginFormSchema } from "../../helper/login/loginFormSchema";
import { loginErrorHandler } from "../../helper/login/loginResErrorHandler";
import { AtIcon, LockIcon } from "../../icons/icons";
import DemoAccount from "../DemoAccount/DemoAccount";
import AnimatedCheckbox from "../subComponents/AnimatedCheckbox/AnimatedCheckbox";
import ErrorMsgBox from "../subComponents/ErrorMsgBox/ErrorMsgBox";
import FullScreenLoader from "../subComponents/Loader/FullScreenLoader/FullScreenLoader";
import PasswordInput from "../subComponents/PasswordInput/PasswordInput";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const [resError, setResError] = useState({});
  const { error: authError } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handling the form using react hook form
  const {
    register: formRegister,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema), // using yup resolver for schema validation
  });
  // rtk mutation
  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  useEffect(() => {
    // Set the value of "agreed" in React Hook Form manually
    setValue("rememberMe", rememberMe);
  }, [rememberMe, setValue]);

  // form submit handler
  const onSubmit = (data) => {
    setResError({});
    login({ username: data.email, password: data.password });
    dispatch(
      redirectHolder({
        holder: true,
      })
    );
  };

  // useEffect to handle the response error and action after successful login
  useEffect(() => {
    if (responseError) {
      const extractError = loginErrorHandler(responseError);
      setResError(extractError);
    }
    if (data) {
      reset();
    }
  }, [data, responseError, reset]);

  // push toast and redirect after successfully logged in
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
                dispatch(
                  redirectHolder({
                    holder: false,
                  })
                );
                navigate("/dashboard");
              },
              error: () => {
                dispatch(
                  redirectHolder({
                    holder: false,
                  })
                );
                return "Something went wrong!";
              },
            }
          );
        })
        .catch(() => {
          dispatch(
            redirectHolder({
              holder: false,
            })
          );
        });
    }
  }, [data]);

  return (
    <div>
      {/* Loader component to show loading state */}
      {isLoading ? <FullScreenLoader color="bg-[#514cfe]" /> : null}

      <form
        className={`${styles.form} bg-secondary box-shadow`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* email */}
        <div className="space-y-3">
          <div className={styles.flex_column}>
            <label className={`text-primary`}>Email or Username</label>
          </div>
          <div className={`${styles.inputForm} bg-primary`}>
            <AtIcon className="text-primary" />
            <input
              placeholder="Type here..."
              className={`${styles.input} bg-primary`}
              type="text"
              {...formRegister("email")}
            />
          </div>
          {errors.email && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.email.message}
            </ErrorMsgBox>
          )}
        </div>
        {/* password */}
        <div className="space-y-3">
          <div className={styles.flex_column}>
            <label className={`text-primary`}>Password</label>
          </div>
          <div className={`${styles.inputForm} bg-primary`}>
            <LockIcon className="text-primary" />
            <PasswordInput
              parentClassName={"h-full w-full"}
              placeholder="Type here..."
              className={`${styles.input} bg-primary`}
              {...formRegister("password")}
            />
          </div>
          {errors.password && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.password.message}
            </ErrorMsgBox>
          )}
        </div>

        <div className={styles.flex_row}>
          <div className="flex">
            <AnimatedCheckbox
              isChecked={rememberMe}
              setIsChecked={setRememberMe}
            />
            <label className="text-secondary">Remember me</label>
          </div>
          {errors.rememberMe && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.rememberMe.message}
            </ErrorMsgBox>
          )}

          <DemoAccount />
        </div>
        <button
          className={styles.button_submit}
          type="submit"
          disabled={isLoading}
        >
          Sign In
        </button>
        {/*  Error message box for login mutation error */}
        {resError?.message && (
          <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
            {resError.message}
          </ErrorMsgBox>
        )}
        {/* successful message if login is successful and no error while generating token */}
        {!authError && data?.message && (
          <ErrorMsgBox bgColor="bg-emerald-400" txtColor="text-emerald-400">
            {data.message}
          </ErrorMsgBox>
        )}
        {/* Error message box for auth error - error from redux state while generating token */}
        {authError?.message && (
          <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
            {authError.message}
          </ErrorMsgBox>
        )}
        <div className={styles.short_note_row}>
          <span className={styles.line} />
          <p className={`${styles.p} text-primary`}>
            Don&apos;t have an account?{" "}
            <Link
              to={"/register"}
              className="ml-1.5 text-glow font-medium uppercase hover:underline hover:decoration-2 hover:underline-offset-2 transition-all"
            >
              Sign Up
            </Link>
          </p>
          <span className={styles.line} />
        </div>
      </form>
    </div>
  );
}
