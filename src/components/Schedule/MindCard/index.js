import styles from "./MindCard.module.scss";
import Typography from "components/Typography";
import { setShowAddForm } from "redux/reducers/mind.reducer";
import { useDispatch } from "react-redux";

const MindCard = ({ completion = 85, withCoverage, data = {} }) => {
  const { vidId, VideoFile, Title, duration } = data;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setShowAddForm({
        visibility: true,
        planId: vidId,
      })
    );
  };

  return (
    <div className={styles.plan_card__base}>
      <div className={styles.img_top}>
        <video src={VideoFile} />
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <Typography className={styles.title}>{Title || "N/A"}</Typography>
          <Typography variant="label" className={styles.duration}>
            {duration || 0} days
          </Typography>
        </div>
        {/* <Typography variant="extra_small" className={styles.follow_label}>
          Followed
        </Typography>
        <Typography variant="extra_small" className={styles.follow_counts}>
          85%
        </Typography> */}
        {/* <div className={styles.completion}>
          <div
            className={styles.value}
            style={{ width: `${completion}%` }}
          ></div>
        </div> */}
      </div>
      {withCoverage && (
        <div className={styles.coverage}>
          <Typography variant="h3">Listened</Typography>
          <Typography variant="h3">23 / 35 min</Typography>
        </div>
      )}
    </div>
  );
};

export default MindCard;
