import LoginForm from "../../Components/LoginForm/LoginForm";
import ToogleMode from "../../Components/ToogleMode/ToogleMode";

export default function Login() {
  return (
    <div>
      <div className="flex md:flex-row flex-col">
        <div className="bg-secondary basis-full md:basis-1/6 md:min-h-screen">
          <ToogleMode />
        </div>
        <div className="bg-primary basis-full md:basis-5/6 min-h-screen p-2 md:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
