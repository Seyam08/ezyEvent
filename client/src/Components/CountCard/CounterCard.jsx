import PropTypes from "prop-types";
import ClickToAction from "../subComponents/ClickToAction/ClickToAction";
import Count from "./Count";
import styles from "./CounterCard.module.css";

export default function CounterCard({
  limit,
  heading,
  icon: Icon,
  customClass,
}) {
  return (
    <div className={customClass}>
      <div className={` ${styles.card} bg-secondary`}>
        <div className={`${styles.card_col} items-start`}>
          <div className={styles.card_icon}>
            <Icon className="text-white p-3 h-full w-full" />
          </div>

          <h3
            className={`${styles.card_heading} text-secondary text-subHeading-size`}
          >
            {heading}
          </h3>
          <Count limit={limit} />
        </div>
        <div className={`${styles.card_col} items-end`}>
          <ClickToAction />
          <div className={styles.card_progress_bg}>
            <span className={`${styles.card_progress_txt} text-desc-size`}>
              +25%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

CounterCard.propTypes = {
  limit: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  customClass: PropTypes.string,
};
