import styles from "./Calories.module.scss";
import Typography from "components/Typography";
import classNames from "classnames";

const Calories = ({ count, className }) => {
  return (
    <div className={classNames(className, styles.base)}>
      <Typography block className={styles.label}>
        Cals
      </Typography>
      <Typography variant="body_bold">{count || 0}</Typography>
    </div>
  );
};

export default Calories;
