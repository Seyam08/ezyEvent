import PropTypes from "prop-types";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRemoveAttendanceMutation } from "../../../features/Events/eventApi";
import { resErrorHandler } from "../../../helper/commmon/resErrorHandler";
import useAuth from "../../../hooks/useAuth";

export default function RemoveAttendEventBtn({ eventId }) {
  const loggedIn = useAuth();
  const navigate = useNavigate();

  // remove attend mutation
  const [
    removeAttendance,
    {
      data: removeAttendData,
      isLoading: removeAttendLoading,
      error: removeAttendError,
    },
  ] = useRemoveAttendanceMutation();

  const handleClick = (e) => {
    e.preventDefault();
    if (loggedIn) {
      removeAttendance(eventId);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (removeAttendData) {
      toast.error(removeAttendData.message, {
        style: {
          background: "#1e293b",
          color: "#fff",
        },
      });
    }
    if (removeAttendError) {
      const extractError = resErrorHandler(removeAttendError);
      toast.error(extractError.message);
    }
  }, [removeAttendData, removeAttendError]);

  return (
    <button
      className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:foreground transition-all"
      disabled={removeAttendLoading}
      onClick={handleClick}
    >
      Leave for Now!
    </button>
  );
}
RemoveAttendEventBtn.propTypes = {
  eventId: PropTypes.string.isRequired,
};
