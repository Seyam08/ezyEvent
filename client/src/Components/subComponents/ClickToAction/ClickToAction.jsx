import { useState } from "react";
import { MoreIcon } from "../../../icons/icons";

export default function ClickToAction() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-center">
      <MoreIcon
        className="fill-current cursor-pointer text-primary"
        onClick={() => setOpen((prev) => !prev)}
      />
      <div
        className={`${
          open ? "flex" : "hidden"
        } w-24 absolute top-7 right-1 justify-center bg-primary text-primary z-50 text-desc-size py-1 px-5 border-thin rounded-full drop-shadow-xl transition animate-fade animate-duration-100 animate-ease-in-out hover:foreground hover:text-white`}
      >
        See All
      </div>
    </div>
  );
}
