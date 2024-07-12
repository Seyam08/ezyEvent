import CounterCard from "../../Components/CountCard/CounterCard";
import DataTable from "../../Components/DataTable/DataTable";
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
      <div>
        <DataTable dataArray={dataTable} />
      </div>
    </div>
  );
}
