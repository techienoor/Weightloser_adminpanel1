import Typography from "components/Typography";
import styles from "./Table.module.scss";
import ArrowUp from "icons/ArrowUp";
import classNames from "classnames";
import { get } from "lodash";
import Checkbox from "components/Checkbox";

const Thead = ({ columns, selectable }) => {
  return (
    <thead className={styles.thead}>
      {selectable && (
        <th>
          <Checkbox />
        </th>
      )}
      {columns.map((m) => (
        <th key={m.title} className={classNames(m.class)}>
          <Typography variant="body_bold">{m.title}</Typography>
        </th>
      ))}
    </thead>
  );
};

export const Badge = ({ status = "" }) => {
  return (
    <div className={classNames(styles.badge, styles[status.toLowerCase()])}>
      <Typography variant="small_bold">{status}</Typography>
    </div>
  );
};

export const Rating = ({ count: rating = 0 }) => {
  const getVariantClass = () => {
    if (rating === 0) {
      return styles.dark;
    } else if (rating <= 35) {
      return styles.danger;
    } else if (rating <= 50) {
      return styles.warningHigh;
    } else if (rating <= 80) {
      return styles.warning;
    } else if (rating <= 85) {
      return styles.successMedium;
    } else {
      return styles.success;
    }
  };

  return (
    <Typography
      variant="body_bold"
      className={classNames(styles.rating, getVariantClass())}
    >
      {rating}% <ArrowUp className={styles.arrow} />
    </Typography>
  );
};

const TRow = ({ data, columns, selectable, onClick }) => {
  return (
    <tr className={classNames(styles.trow)} onClick={() => onClick(data)}>
      {selectable && (
        <td>
          <Checkbox />
        </td>
      )}
      {columns.map((m, index) => (
        <td key={`${m.title}-${index}`} className={classNames(m.class)}>
          {m.render ? (
            m.render(data)
          ) : (
            <Typography variant="body_bold">
              {get(data, m.dataKey) || "N/A"}
            </Typography>
          )}
        </td>
      ))}
    </tr>
  );
};

const DATA = [
  {
    customerId: "#SK2540",
    name: "Neal Metheaws",
    joiningDate: "07 Oct, 2019",
    following: 90,
    weightLoss: 3,
    daysLogged: 21,
    totalDays: 23,
  },
];

const Table = ({
  columns = [],
  data = [],
  head,
  className,
  selectable,
  fullHeight,
  onRowClick = () => {},
}) => {
  return (
    <div className={classNames(className, styles.base)}>
      {head}
      <div
        className={classNames(
          styles.container_table,
          fullHeight ? styles.fullHeight : ""
        )}
      >
        <table className={styles.table}>
          <Thead columns={columns} selectable={selectable} />
          <tbody>
            {data.map((m) => (
              <TRow
                selectable={selectable}
                data={m}
                columns={columns}
                onClick={onRowClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
