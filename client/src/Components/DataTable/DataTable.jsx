import PropTypes from "prop-types";
import { MoreIcon } from "../../icons/icons";
import ItemHeading from "../subComponents/Heading/ItemHeading";
import styles from "./DataTable.module.css";

export default function DataTable({ dataArray }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500 bg-opacity-25 text-green-500";
      case "Pending":
        return "bg-yellow-500 bg-opacity-25 text-yellow-500";
      case "Paid":
        return "bg-blue-500 bg-opacity-25 text-blue-500";
      case "Unpaid":
        return "bg-red-500 bg-opacity-25 text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className={styles.table_container}>
      <div>
        <table className={`${styles.table} bg-secondary`}>
          <thead>
            <tr className={styles.table_h_row}>
              <th className={styles.table_h}>
                <ItemHeading>Event Registration User list</ItemHeading>
              </th>
            </tr>
            <tr className={`${styles.table_h_row} text-secondary`}>
              <th className={styles.table_h}>ID No</th>
              <th className={styles.table_h}>Name</th>
              <th className={styles.table_h}>Seminar</th>
              <th className={styles.table_h}>Status</th>
              <th className={styles.table_h}>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((item) => (
              <tr key={item.idNo} className="odd:bg-tertiary">
                <td className={`${styles.table_d} text-secondary`}>
                  {item.idNo}
                </td>
                <td className={`${styles.table_d} text-primary`}>
                  {item.name}
                </td>
                <td className={`${styles.table_d} text-primary`}>
                  {item.seminar}
                </td>
                <td className={`${styles.table_d} text-secondary`}>
                  <div
                    className={`${styles.table_status} ${getStatusClass(
                      item.status
                    )}`}
                  >
                    <span>{item.status}</span>
                  </div>
                </td>
                <td className={styles.table_d}>
                  <button>
                    <MoreIcon className="text-primary fill-current" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

DataTable.propTypes = {
  dataArray: PropTypes.array.isRequired,
};
