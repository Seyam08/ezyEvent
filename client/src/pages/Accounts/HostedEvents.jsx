import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "../../Components/DataTable/DataTable";
import PageHeading from "../../Components/subComponents/Heading/PageHeading";

export default function HostedEvents() {
  const { myAccount } = useSelector((state) => state.account);
  const { eventsHosted } = myAccount || {};
  const [hostedEventArray, setHostedEventArray] = useState([]);

  useEffect(() => {
    if (eventsHosted) {
      const modifiedData = eventsHosted?.map((item) => {
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
      setHostedEventArray(modifiedData);
    }
  }, [eventsHosted]);

  return (
    <>
      <PageHeading>Event's Those I've been Hosted</PageHeading>
      <DataTable
        title={"Hosted Events"}
        dataArray={hostedEventArray}
        link="/"
      />
    </>
  );
}
