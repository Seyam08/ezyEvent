import LoginForm from "../../Components/LoginForm/LoginForm";
import ToogleMode from "../../Components/ToogleMode/ToogleMode";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div>
      <div className="bg-primary flex flex-row items-center min-h-screen">
        <div className="basis-full p-2 md:p-8 ">
          <div className={styles.toogleMode_holder}>
            <ToogleMode customClass={"drop-shadow-sm"} />
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
