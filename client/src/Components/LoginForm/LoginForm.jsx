import { useState } from "react";
import { AtIcon, LockIcon } from "../../icons/icons";
import AnimatedCheckbox from "../subComponents/AnimatedCheckbox/AnimatedCheckbox";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <form className={`${styles.form} bg-secondary`}>
      <div className={styles.flex_column}>
        <label className={`text-primary`}>Email </label>
      </div>
      <div className={`${styles.inputForm} bg-primary`}>
        <AtIcon className="fill-[#333839] dark:fill-[#e7e7e7]" />
        <input
          placeholder="Enter your Email"
          className={`${styles.input} bg-primary`}
          type="text"
        />
      </div>
      <div className={styles.flex_column}>
        <label className={`text-primary`}>Password </label>
      </div>
      <div className={`${styles.inputForm} bg-primary`}>
        <LockIcon className="fill-[#333839] dark:fill-[#e7e7e7]" />
        <input
          placeholder="Enter your Password"
          className={`${styles.input} bg-primary`}
          type="password"
        />
      </div>
      <div className={styles.flex_row}>
        <div className="flex">
          {/* <input
            type="checkbox"
            className="mx-2.5"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          /> */}
          <AnimatedCheckbox
            isChecked={rememberMe}
            setIsChecked={setRememberMe}
          />
          <label className={`text-secondary`}>Remember me </label>
        </div>

        <span className={styles.span}>Forgot password?</span>
      </div>
      <button className={styles.button_submit}>Sign In</button>
      <p className={`${styles.p} text-primary`}>
        Don&apos;t have an account? <span className={styles.span}>Sign Up</span>
      </p>
    </form>
  );
}
