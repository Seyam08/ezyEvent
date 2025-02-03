import PropTypes from "prop-types";

export default function ErrorMsgBox({ children, bgColor, txtColor }) {
  return (
    <div
      className={`${txtColor} ${bgColor} bg-opacity-10 px-4 py-2 rounded-md text-sm 2xl:text-base animate-fade-up animate-duration-300 animate-ease-in`}
    >
      {children}
    </div>
  );
}

ErrorMsgBox.propTypes = {
  children: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  txtColor: PropTypes.string.isRequired,
};
