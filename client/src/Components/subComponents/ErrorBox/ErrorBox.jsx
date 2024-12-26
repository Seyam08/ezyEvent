import PropTypes from "prop-types";
import { ArrowUp } from "../../../icons/icons";
import styles from "./ErrorBox.module.css";

export default function ErrorBox({ status, heading, desc }) {
  return (
    <div className="bg-secondary shadow-md rounded-lg p-8 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">{status}</h1>
      <h2 className="text-2xl font-semibold text-secondary mb-4">{heading}</h2>
      <p className="text-tertiary mb-6">{desc}</p>
      <div className="flex justify-center">
        <button
          className={`flex justify-center text-xl px-4 py-2 gap-2 bg-gray-50 shadow-md rounded-full hover:foreground hover:text-[#EDEDED] transition-all ${styles.errBtn}`}
          onClick={() => window.history.back()}
        >
          <ArrowUp className={styles.arrowBtn} />
          Go Back
        </button>
      </div>
    </div>
  );
}
ErrorBox.propTypes = {
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  heading: PropTypes.string.isRequired,
  desc: PropTypes.string,
};
