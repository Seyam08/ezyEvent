import { UserGroupIcon } from "../../../icons/icons";
import CounterCard from "../../subComponents/CountCard/CounterCard";

export default function Dashboard() {
  return (
    <div>
      <h5 className="text-primary">Dashboard</h5>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-3 md:gap-2 gap-1">
        <CounterCard limit={234} heading="Total user" icon={UserGroupIcon} />
        <CounterCard limit={454} heading="Total event's" icon={UserGroupIcon} />
        <CounterCard limit={235} heading="Total speaker" icon={UserGroupIcon} />
        <CounterCard
          limit={457}
          heading="Completed Event's"
          icon={UserGroupIcon}
        />
      </div>
    </div>
  );
}
