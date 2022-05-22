import Typography from "components/Typography";
import styles from "./Social.module.scss";
import FacebookSvg from "assets/svg/Facebook.svg";
import { Link } from "react-router-dom";
import SocialLink from "./Link";
import TwitterSvg from "assets/svg/Twitter.svg";
import InstagramSvg from "assets/svg/Instagram.svg";

const Social = () => {
  return (
    <div className={styles.base}>
      <Typography variant="body_bold" block>
        Social Source
      </Typography>
      <div className={styles.content}>
        <FacebookSvg className={styles.fb} />
        <Typography>
          Facebook - <Typography disabled>125 Sales</Typography>
        </Typography>
        <Typography>
          Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
          libero venenatis faucibus tincidunt.
        </Typography>
        <Link to="#">
          <Typography>Learn more &gt;</Typography>
        </Link>
      </div>
      <div className={styles.links}>
        <SocialLink icon={FacebookSvg} title="Facebook" count={125} />
        <SocialLink icon={TwitterSvg} title="Twitter" count={100} />
        <SocialLink icon={InstagramSvg} title="Instagram" count={105} />
      </div>
    </div>
  );
};

export default Social;
