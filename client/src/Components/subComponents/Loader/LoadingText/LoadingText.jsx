import PropTypes from "prop-types";
export default function LoadingText({ text }) {
  return (
    <div className="fixed w-full h-full backdrop-blur-[1px] z-[9999] flex gap-2 items-center justify-center left-0 top-0 bg-tertiary bg-opacity-5">
      <div className="bg-secondary box-shadow flex justify-center items-end p-5 rounded-[10px]">
        <p className="text-primary text-lg">{text}</p>
        <div className="w-2 h-2 m-1 rounded-full foreground animate-bounce" />
        <div className="w-2 h-2 m-1 rounded-full foreground animate-bounce [animation-delay:-.3s]" />
        <div className="w-2 h-2 m-1 rounded-full foreground animate-bounce [animation-delay:-.5s]" />
      </div>
    </div>
  );
}
LoadingText.propTypes = {
  text: PropTypes.string.isRequired,
};
