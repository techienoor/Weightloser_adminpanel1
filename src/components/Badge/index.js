import styles from "./Badge.module.scss";
import Typography from "components/Typography";

const Badge = ({ children }) => {
  return (
    <div className={styles.base}>
      <Typography variant="small_bold">{children}</Typography>
    </div>
  );
};

export default Badge;
