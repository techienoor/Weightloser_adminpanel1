import styles from "./PlanCard.module.scss";
import { EXERCISE_IMAGE } from "api/RequestInterceptor";
import Typography from "components/Typography";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import { setShowAddForm } from "redux/reducers/diets.reducer";
import { useDispatch } from "react-redux";

const PlanCard = ({ data, completion = 85 }) => {
  const dispatch = useDispatch();
  const { PlanId, Title, FileName, duration, Description, PlanType } = data;

  const handleClick = () => {
    dispatch(
      setShowAddForm({
        visibility: true,
        planId: PlanId,
      })
    );
  };

  return (
    <div className={styles.plan_card__base} onClick={handleClick}>
      <div className={styles.img_top}>
        <img
          src={process.env.REACT_APP_IMAGES_URL + FileName}
          onError={(e) => (e.target.src = CARD_PLACEHOLDER_IMAGE)}
        />
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
        </Typography>
        <div className={styles.completion}>
          <div
            className={styles.value}
            style={{ width: `${completion}%` }}
          ></div>
        </div> */}
      </div>
    </div>
  );
};

export default PlanCard;
