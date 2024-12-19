import logo from "../../assets/ezyTrans.png";
import LogoutBtn from "../../Components/subComponents/AuthButton/LogoutBtn";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <img src={logo} alt="Logo" className="w-32 mb-8" />
      <h1 className="text-6xl font-bold mb-4">Coming Soon</h1>
      <p className="text-xl">
        We&apos;re working hard to bring you something amazing. Stay tuned!
      </p>
      <LogoutBtn />
    </div>
  );
}
