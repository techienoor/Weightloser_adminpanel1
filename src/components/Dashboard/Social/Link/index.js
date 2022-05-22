import Typography from "components/Typography";
import styles from "./Link.module.scss";

const Link = ({ icon: Icon, title, count }) => {
  return (
    <div className={styles.base}>
      <Icon />
      <Typography variant="body_bold">{title}</Typography>
      <Typography variant="body_light">
        {Number(count).toLocaleString()} Sales
      </Typography>
    </div>
  );
};

export default Link;
