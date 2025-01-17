import PropTypes from "prop-types";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAttendEventMutation } from "../../../features/Events/eventApi";
import { resErrorHandler } from "../../../helper/commmon/resErrorHandler";
import useAuth from "../../../hooks/useAuth";

export default function AttendEventBtn({ eventId }) {
  const loggedIn = useAuth();
  const navigate = useNavigate();

  // attend event mutation
  const [
    attendEvent,
    { data: attendData, isLoading: attendLoading, error: attendError },
  ] = useAttendEventMutation();

  const handleClick = (e) => {
    e.preventDefault();
    if (loggedIn) {
      attendEvent(eventId);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (attendData) {
      toast.success(attendData.message, {
        style: {
          background: "#1e293b",
          color: "#fff",
        },
      });
    }
    if (attendError) {
      const extractError = resErrorHandler(attendError);
      toast.error(extractError.message);
    }
  }, [attendData, attendError]);

  return (
    <button
      className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:foreground transition-all"
      disabled={attendLoading}
      onClick={handleClick}
    >
      Claim Your Spot (Free)
    </button>
  );
}
AttendEventBtn.propTypes = {
  eventId: PropTypes.string.isRequired,
};
