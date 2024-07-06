import useCounter from "../../../hooks/useCounter";
import { UserGroupIcon } from "../../../icons/icons";

export default function CounterCard() {
  const count = useCounter(238);
  return (
    <div className="bg-secondary p-4 rounded-md">
      <div className="w-12 h-12 bg-gradient-to-b from-red-400 to-red-700 rounded-full">
        <UserGroupIcon className="text-white p-3 h-full w-full" />
      </div>

      <h3 className="text-secondary text-base font-semibold my-2">
        Total user
      </h3>
      <h2 className="text-primary text-xl font-bold">{count}+</h2>
    </div>
  );
}
