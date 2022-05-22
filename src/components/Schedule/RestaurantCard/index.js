import styles from "./RestaurantCard.module.scss";
import Typography from "components/Typography";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import { useDispatch } from "react-redux";
import { setShowAddForm } from "redux/reducers/restaurants.reducer";

const RestaurantCard = ({ data = {} }) => {
  const dispatch = useDispatch();
  const { RestuarantId, Image, RestaurantName } = data;

  const handleClick = () => {
    dispatch(
      setShowAddForm({
        visibility: true,
        planId: RestuarantId,
      })
    );
  };

  return (
    <div className={styles.plan_card__base} onClick={handleClick}>
      <div className={styles.img_top}>
        <img
          src={process.env.REACT_APP_IMAGES_URL + Image}
          onError={(e) => (e.target.src = CARD_PLACEHOLDER_IMAGE)}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <Typography className={styles.title}>
            {RestaurantName || "N/A"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
