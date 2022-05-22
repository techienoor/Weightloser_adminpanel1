import styles from "./Earnings.module.scss";
import Typography from "components/Typography";
import ArrowUp from "icons/ArrowUp";
import ArrowRightAltSvg from "assets/svg/ArrowRightAlt";

const Earnings = ({ count }) => {
  return (
    <div className={styles.base}>
      <Typography variant="body_bold" className="mb-2" block>
        Monthly Earning
      </Typography>
      <div>
        <div className={styles.content}>
          <Typography variant="label" className="mb-2" block>
            This Month
          </Typography>
          <Typography variant="h3" block className="mb-2">
            ${Number(count).toLocaleString()}
          </Typography>
          <div className="mb-2">
            <Typography className="text-success mr-1">
              12% <ArrowUp />
            </Typography>
            <Typography>From previous period</Typography>
          </div>
          {/* <ArrowRightAltSvg /> */}
          <Typography variant="label" block>
            Text that tells which price plan is making most money or something
            like that.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
