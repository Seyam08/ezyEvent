import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "../../Components/DataTable/DataTable";
import PageHeading from "../../Components/subComponents/Heading/PageHeading";

export default function AttendedEvents() {
  const { myAccount } = useSelector((state) => state.account);
  const { eventsAttended } = myAccount || {};
  const [attendedEventArray, setAttendedEventArray] = useState([]);

  useEffect(() => {
    if (eventsAttended) {
      const modifiedData = eventsAttended?.map((item) => {
        const readableDate = new Date(item?.eventDate).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );
        const shortID = item?._id.length > 4 ? item?._id.slice(-4) : item?._id;

        return {
          idNo: shortID,
          date: readableDate,
          seminar: item?.eventName,
          status: item?.status,
          link: `/event/${item?._id}`,
        };
      });
      setAttendedEventArray(modifiedData);
    }
  }, [eventsAttended]);

  return (
    <>
      <PageHeading>Event's Those I've been Attended</PageHeading>
      <DataTable
        title={"Events as Attendees"}
        dataArray={attendedEventArray}
        link="/dashboard/all-events"
      />
    </>
  );
}
