import Calendar from "react-calendar";
import "./Calender.css";

export default function Calender({ date, setDate }) {
  return (
    <Calendar
      onChange={setDate}
      value={date}
      prev2Label={null}
      next2Label={null}
    />
  );
}
