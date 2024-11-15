import { EditIcon } from "../../../icons/icons";

export default function EditIconComponent() {
  return (
    <div className="group relative w-6 h-6">
      <button>
        <EditIcon className="w-full h-full hover:scale-125 duration-200 text-secondary hover:text-[#8C5BFE]" />
      </button>
      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border-thin bg-primary text-secondary py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
        Edit
      </span>
    </div>
  );
}
