import Typography from "components/Typography";
import styles from "./Stats.module.scss";
import classNames from "classnames";

const Stats = ({ title, count = 0, total = 0 }) => {
  const MAX = total;
  const percentage = (count / MAX) * 100;

  const getColorClass = () => {
    if (count >= 1500) {
      return styles.high;
    } else if (count >= 800) {
      return styles.medium;
    } else {
      return styles.low;
    }
  };

  return (
    <div className={styles.base}>
      <Typography dark variant="small">
        {title || "N/A"}
      </Typography>
      <Typography variant="small_bold">
        {Number(count).toLocaleString()}
      </Typography>
      <div className={styles.container_value}>
        <div
          className={classNames(styles.value, getColorClass())}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Stats;
