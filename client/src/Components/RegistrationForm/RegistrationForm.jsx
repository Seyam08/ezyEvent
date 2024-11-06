import styles from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  return (
    <div className={styles.registration_form}>
      <div className={`${styles.form_box} bg-secondary box-shadow`}>
        <form className={styles.inner_box}>
          <div className={styles.two_col_inp_fild}>
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
              />
            </div>
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
              />
            </div>
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
              />
            </div>
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
              />
            </div>
          </div>
          <div className={styles.two_col_inp_fild}>
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
          </div>
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
          <div className={styles.submit_btn_row}>
            <button className={styles.submit_btn} type="submit">
              Sign up
            </button>
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
