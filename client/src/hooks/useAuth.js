import { useSelector } from "react-redux";

export default function useAuth() {
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  if (isAuthenticated && profile) {
    return true;
  } else {
    return false;
  }
}
