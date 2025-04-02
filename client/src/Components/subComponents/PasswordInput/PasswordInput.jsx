import PropTypes from "prop-types";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../../../icons/icons";

export default function PasswordInput({ parentClassName, ...props }) {
  const [type, setType] = useState("password");
  const [view, setView] = useState(false);

  const handleToggle = () => {
    if (type === "password") {
      setView(true);
      setType("text");
    } else {
      setView(false);
      setType("password");
    }
  };

  return (
    <div className={`relative ${parentClassName}`}>
      <input {...props} type={type} />
      {view ? (
        <EyeOffIcon
          className="text-glow h-5 w-5 absolute right-3 top-1/4 cursor-pointer"
          onClick={handleToggle}
        />
      ) : (
        <EyeIcon
          className="text-glow h-5 w-5 absolute right-3 top-1/4 cursor-pointer"
          onClick={handleToggle}
        />
      )}
    </div>
  );
}
PasswordInput.propTypes = {
  parentClassName: PropTypes.string,
};
