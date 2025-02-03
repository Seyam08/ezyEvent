import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();
  const { holder } = useSelector((state) => state.auth);

  return !isLoggedIn ? (
    children
  ) : isLoggedIn && holder ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );
}
