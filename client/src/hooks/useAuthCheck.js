import { jwtVerify } from "jose";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApi";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      // Convert the secret key to Uint8Array
      const secretKey = new TextEncoder().encode(
        import.meta.env.VITE_JWT_SECRET
      );
      // Verify the token
      jwtVerify(localAuth, secretKey)
        .then(({ payload }) => {
          if (payload) {
            dispatch(
              userLoggedIn({
                profile: payload,
              })
            );
            setAuthChecked(true);
          }
        })
        .catch(() => {
          localStorage.removeItem("auth");
          logout();
          setAuthChecked(true);
        });
    } else {
      setAuthChecked(true);
    }
  }, [dispatch, logout, setAuthChecked]);

  return authChecked;
}
