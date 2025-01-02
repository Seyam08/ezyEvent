import PropTypes from "prop-types";
import styles from "./FullScreenLoader.module.css";

export default function FullScreenLoader({ color = "bg-[#514cfe]" }) {
  return (
    <div className={`${styles.loaderOverlay} bg-tertiary bg-opacity-5`}>
      <div className={`${styles.loaderContainer} bg-secondary box-shadow`}>
        <div className="grid grid-cols-3 gap-1 w-[70px] h-[70px]">
          <span
            className={`${styles.loaderSpan} ${color}`}
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className={`${styles.loaderSpan} ${color}`}
            style={{ animationDelay: "200ms" }}
          ></span>
          <span
            className={`${styles.loaderSpan} ${color}`}
            style={{ animationDelay: "300ms" }}
          ></span>
          <span
            className={`${styles.loaderSpan} ${color}`}
            style={{ animationDelay: "400ms" }}
          ></span>
          <span
            className={`${styles.loaderSpan} ${color}`}
            style={{ animationDelay: "500ms" }}
          ></span>
          <span
            className={`${styles.loaderSpan} ${color}`}
            style={{ animationDelay: "600ms" }}
          ></span>
        </div>
      </div>
    </div>
  );
}
FullScreenLoader.propTypes = {
  color: PropTypes.string,
};
