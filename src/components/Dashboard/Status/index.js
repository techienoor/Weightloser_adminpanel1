import styles from "./Status.module.scss";
import UserStatusSvg from "assets/svg/UserStatus.svg";
import { USER_THUMBNAIL } from "api/RequestInterceptor";
import Typography from "components/Typography";
import ArrowRightAltSvg from "assets/svg/ArrowRightAlt";

const Status = () => {
  return (
    <div className={styles.base}>
      <div className={styles.top}>
        <span className={styles.label_welcome}>Welcome !</span>
        <span className={styles.username}>Lorem Ipsum</span>
        <UserStatusSvg className={styles.user_image} />
        <img src={USER_THUMBNAIL} />
      </div>
      <div className={styles.content}>
        <div>
          <Typography block className="mb-sm" variant="body_bold">
            Lauren Summers
          </Typography>
          <Typography block>Chief Admin</Typography>
        </div>
        {/* <div>
          <Typography variant="body_bold">29</Typography>
          <Typography disabled variant="label">
            /31
          </Typography>
          <Typography variant="small" className="mt-xs" block>
            Days Online
          </Typography>
        </div>
        <div>
          <Typography variant="body_bold">03</Typography>
          <Typography variant="small" className="mt-xs" block>
            Pending Tasks
          </Typography>
        </div> */}
      </div>
      {/* <ArrowRightAltSvg className="cursor-pointer float-right mr-1" /> */}
    </div>
  );
};

export default Status;
