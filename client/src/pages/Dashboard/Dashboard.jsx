import CounterCard from "../../Components/CountCard/CounterCard";
import DataTable from "../../Components/DataTable/DataTable";
import SpeakerList from "../../Components/SpeakerList/SpeakerList";
import { speakersList } from "../../constants/speakersList.js";
import { dataTable } from "../../constants/userReg";
import { UserGroupIcon } from "../../icons/icons";

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-3 md:gap-2 gap-1">
        <CounterCard limit={234} heading="Total user" icon={UserGroupIcon} />
        <CounterCard limit={454} heading="Total event's" icon={UserGroupIcon} />
        <CounterCard limit={235} heading="Total speaker" icon={UserGroupIcon} />
        <CounterCard limit={457} heading="Past Event's" icon={UserGroupIcon} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-3 md:gap-2 gap-1">
        <SpeakerList
          list={speakersList}
          link="/speakers"
          customClass={"mt-8"}
        />
        <DataTable
          dataArray={dataTable}
          customClass={"lg:col-span-2"}
          link="/"
        />
      </div>
    </div>
  );
}
