import PropTypes from "prop-types";
import styles from "./AnimatedCheckbox.module.css";

export default function AnimatedCheckbox({ isChecked, setIsChecked }) {
  return (
    <div className={styles.checkbox_container}>
      <input
        type="checkbox"
        className={`${styles.cbx2} hidden`}
        id="cbx2"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label htmlFor="cbx2" className={styles.check}>
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z" />
          <polyline points="1 9 7 14 15 4" />
        </svg>
      </label>
    </div>
  );
}

AnimatedCheckbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  setIsChecked: PropTypes.func.isRequired,
};
