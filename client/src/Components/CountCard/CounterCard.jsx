import PropTypes from "prop-types";
import { useState } from "react";
import { MoreIcon } from "../../icons/icons";
import Count from "./Count";
import styles from "./CounterCard.module.css";

export default function CounterCard({
  limit,
  heading,
  icon: Icon,
  customClass,
}) {
  const [isOpen, setOpen] = useState(false);
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
        <div className={`${styles.card_col} items-end relative`}>
          <MoreIcon
            className={`${styles.card_more} text-primary`}
            onClick={() => setOpen((prev) => !prev)}
          />
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } bg-primary text-primary text-desc-size py-1 px-5 border-thin rounded-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px transition animate-fade-left animate-duration-100 animate-ease-in-out hover:foreground hover:text-white`}
          >
            See All
          </div>
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
