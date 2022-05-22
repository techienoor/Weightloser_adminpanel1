import styles from "./Activities.module.scss";
import Typography from "components/Typography";
import Activity from "./Activity";
import ArrowRightAlt from "assets/svg/ArrowRightAlt";

const Activities = () => {
  return (
    <div className={styles.container__activities}>
      <Typography variant="body_bold" block className="mb-2">
        Activity
      </Typography>
      <div className={styles.list}>
        <Activity />
        <Activity />
        <Activity />
        <Activity />
      </div>
      <ArrowRightAlt className="text-center cursor-pointer" />
    </div>
  );
};

export default Activities;
