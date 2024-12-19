import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../../features/auth/authApi";
import { loginFormSchema } from "../../helper/login/loginFormSchema";
import { loginErrorHandler } from "../../helper/login/loginResErrorHandler";
import { AtIcon, LockIcon } from "../../icons/icons";
import AnimatedCheckbox from "../subComponents/AnimatedCheckbox/AnimatedCheckbox";
import ErrorMsgBox from "../subComponents/ErrorMsgBox/ErrorMsgBox";
import FullScreenLoader from "../subComponents/Loader/FullScreenLoader/FullScreenLoader";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const [resError, setResError] = useState({});
  const { error: authError } = useSelector((state) => state.auth);

  console.log(authError);
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

  const onSubmit = (data) => {
    setResError({});
    login({ username: data.email, password: data.password });
  };

  useEffect(() => {
    if (responseError) {
      const extractError = loginErrorHandler(responseError);
      setResError(extractError);
    }
    if (data) {
      reset();
    }
  }, [data, responseError, reset]);

  console.log("login render");

  return (
    <div>
      {isLoading ? <FullScreenLoader color="bg-[#8C5BFE]" /> : null}
      <form
        className={`${styles.form} bg-secondary box-shadow`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.flex_column}>
          <label className={`text-primary`}>Email</label>
        </div>
        <div className={`${styles.inputForm} bg-primary`}>
          <AtIcon className="fill-[#333839] dark:fill-[#e7e7e7]" />
          <input
            placeholder="Enter your Email"
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
        <div className={styles.flex_column}>
          <label className={`text-primary`}>Password </label>
        </div>
        <div className={`${styles.inputForm} bg-primary`}>
          <LockIcon className="fill-[#333839] dark:fill-[#e7e7e7]" />
          <input
            placeholder="Enter your Password"
            className={`${styles.input} bg-primary`}
            type="password"
            {...formRegister("password")}
          />
        </div>
        {errors.password && (
          <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
            {errors.password.message}
          </ErrorMsgBox>
        )}

        <div className={styles.flex_row}>
          <div className="flex">
            <AnimatedCheckbox
              isChecked={rememberMe}
              setIsChecked={setRememberMe}
            />
            <label className={`text-secondary`}>Remember me </label>
          </div>
          {errors.rememberMe && (
            <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
              {errors.rememberMe.message}
            </ErrorMsgBox>
          )}

          {/* <span className={styles.span}>Forgot password?</span> */}
        </div>
        <button
          className={styles.button_submit}
          type="submit"
          disabled={isLoading}
        >
          Sign In
        </button>
        {resError?.message && (
          <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
            {resError.message}
          </ErrorMsgBox>
        )}
        {!authError && data?.message && (
          <ErrorMsgBox bgColor="bg-emerald-400" txtColor="text-emerald-400">
            {data.message}
          </ErrorMsgBox>
        )}
        {authError && (
          <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
            {authError}
          </ErrorMsgBox>
        )}
        <div className={styles.short_note_row}>
          <span className={styles.line} />
          <p className={`${styles.p} text-primary`}>
            Don&apos;t have an account?{" "}
            <span className={styles.span}>Sign Up</span>
          </p>
          <span className={styles.line} />
        </div>
      </form>
    </div>
  );
}
