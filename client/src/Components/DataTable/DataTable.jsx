import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ClickToAction from "../subComponents/ClickToAction/ClickToAction";
import ItemHeading from "../subComponents/Heading/ItemHeading";
import styles from "./DataTable.module.css";

export default function DataTable({ title, dataArray, customClass, link }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-green-500 bg-opacity-25 text-green-500";
      case "Upcoming":
        return "bg-yellow-500 bg-opacity-25 text-yellow-500";
      case "Completed":
        return "bg-blue-500 bg-opacity-25 text-blue-500";
      default:
        return "";
    }
  };

  return (
    <div className={`${styles.table_container} ${customClass}`}>
      <div>
        <table className={`${styles.table} bg-secondary`}>
          <thead>
            <tr className={styles.table_h_row}>
              <th className={styles.table_h} colSpan={3}>
                <ItemHeading>{title}</ItemHeading>
              </th>
              <th className={`!text-end ${styles.table_h}`} colSpan={2}>
                <Link
                  to={link}
                  className="text-secondary font-medium text-sm md:text-base bg-tertiary rounded-full px-4 py-1 hover:foreground hover:text-[#EDEDED] transition"
                >
                  View All
                </Link>
              </th>
            </tr>
            <tr className={`${styles.table_h_row} text-secondary`}>
              <th className={styles.table_h}>ID</th>
              <th className={styles.table_h}>Date</th>
              <th className={styles.table_h}>Event</th>
              <th className={styles.table_h}>Status</th>
              <th className={styles.table_h}>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataArray?.map((item) => {
              const { idNo, date, seminar, status, link } = item;
              return (
                <tr key={item.idNo} className="odd:bg-tertiary">
                  <td className={`${styles.table_d} text-secondary`}>{idNo}</td>
                  <td className={`${styles.table_date}`}>{date}</td>
                  <td
                    className={`${styles.table_d} text-primary font-semibold`}
                  >
                    {seminar}
                  </td>
                  <td className={`${styles.table_d} text-secondary`}>
                    <div
                      className={`${styles.table_status} ${getStatusClass(
                        status
                      )}`}
                    >
                      <span>{item.status}</span>
                    </div>
                  </td>
                  <td className={`${styles.table_d} relative`}>
                    <ClickToAction link={link} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  dataArray: PropTypes.array.isRequired,
  customClass: PropTypes.string,
  link: PropTypes.string.isRequired,
};
