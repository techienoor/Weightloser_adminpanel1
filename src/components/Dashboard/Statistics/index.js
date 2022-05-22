import styles from "./Statistics.module.scss";
import Typography from "components/Typography";
import CustomerSvg from "assets/svg/Customer.svg";

const Statistics = ({ title, count, icon: Icon, currency }) => {
  return (
    <div className={styles.base}>
      <Typography disabled block>
        {title || "N/A"}
      </Typography>
      <Icon className={styles.icon} />
      <Typography variant="body_bold" block>
        {currency && "$"}
        {Number(count).toLocaleString()}
      </Typography>
    </div>
  );
};

export default Statistics;
