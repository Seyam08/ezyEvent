import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FullScreenLoader from "../../Components/subComponents/Loader/FullScreenLoader";
import { useRegisterMutation } from "../../features/auth/authApi";
import AnimatedCheckbox from "../subComponents/AnimatedCheckbox/AnimatedCheckbox";
import ErrorMsgBox from "../subComponents/ErrorMsgBox/ErrorMsgBox";
import styles from "./RegistrationForm.module.css";
import { regFormSchema } from "./regFormSchema";

export default function RegistrationForm() {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  // react hook form
  const {
    register: formRegister,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(regFormSchema),
  });

  // rtk mutation
  const [register, { data, isLoading, error: responseError }] =
    useRegisterMutation();

  useEffect(() => {
    console.log(isLoading),
      console.log(JSON.stringify(responseError)),
      console.log(responseError),
      console.log(data);
    if (responseError?.data) {
      setError(responseError.data.message);
    }
    if (data) {
      console.log(data);
    }
  }, [data, responseError, isLoading]);

  const onSubmit = (data) => {
    console.log(
      JSON.stringify({
        username: data.username,
        name: data.fullname,
        email: data.email,
        password: data.password,
      })
    );
    setError("");
    register({
      username: data.username,
      name: data.fullname,
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    // Set the value of "agreed" in React Hook Form manually
    setValue("agreed", agreed);
  }, [agreed, setValue]);

  console.log("render");

  return (
    <div className={styles.registration_form}>
      <div className={`${styles.form_box} bg-secondary box-shadow`}>
        {isLoading ? <FullScreenLoader color="bg-[#8C5BFE]" /> : null}

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
          {/* t&c agreed */}
          <div>
            <div className="flex my-3">
              <AnimatedCheckbox isChecked={agreed} setIsChecked={setAgreed} />

              <label className={`text-secondary`}>
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
            {error !== "" && (
              <ErrorMsgBox bgColor="bg-red-400" txtColor="text-red-400">
                {error}
              </ErrorMsgBox>
            )}
            {data !== undefined && (
              <ErrorMsgBox bgColor="bg-green-400" txtColor="text-green-400">
                {data.message}
              </ErrorMsgBox>
            )}
          </div>
          <div className={styles.short_note_row}>
            <span className={styles.line} />
            <a className={`${styles.note}  text-primary`} href="#">
              Have an account? <span className={styles.span}>Log in</span>
            </a>
            <span className={styles.line} />
          </div>
        </form>
      </div>
    </div>
  );
}
