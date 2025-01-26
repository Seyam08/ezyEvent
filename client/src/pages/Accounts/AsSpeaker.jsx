import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "../../Components/DataTable/DataTable";
import PageHeading from "../../Components/subComponents/Heading/PageHeading";

export default function AsSpeaker() {
  const { myAccount } = useSelector((state) => state.account);
  const { eventsSpeaking } = myAccount || {};
  const [speakingEventArray, setSpeakingEventArray] = useState([]);

  useEffect(() => {
    if (eventsSpeaking) {
      const modifiedData = eventsSpeaking?.map((item) => {
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
      setSpeakingEventArray(modifiedData);
    }
  }, [eventsSpeaking]);

  return (
    <>
      <PageHeading>Event's where I spoked and will be speaking</PageHeading>
      <DataTable
        title={"Events as speaker"}
        dataArray={speakingEventArray}
        link="/"
      />
    </>
  );
}
