import { Link } from "react-router-dom";
import logo from "../../assets/ezyTrans.svg";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <img src={logo} alt="Logo" className="w-32 mb-8" />
      <h1 className="text-6xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-xl mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
