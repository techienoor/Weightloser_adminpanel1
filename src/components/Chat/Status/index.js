import styles from "./Status.module.scss";
import UserStatusSvg from "assets/svg/UserStatus.svg";
import { USER_THUMBNAIL } from "api/RequestInterceptor";
import Typography from "components/Typography";
import ArrowRightAltSvg from "assets/svg/ArrowRightAlt";

const Status = () => {
  return (
    <div className={styles.base}>
      <div className={styles.top}>
        <img src={USER_THUMBNAIL} />
        <div>
          <Typography variant="body_bold" block className="mb-sm">
            Lauren Summers
          </Typography>
          <Typography>Chief Admin</Typography>{" "}
        </div>

        <UserStatusSvg className={styles.user_image} />
      </div>
    </div>
  );
};

export default Status;
