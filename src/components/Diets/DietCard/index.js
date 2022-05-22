import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setShowAddForm } from "redux/reducers/diets.reducer";
import styles from "./DietCard.module.scss";
import api, { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
const Typography = React.lazy(() => import("components/Typography"));

const DietCard = ({ diet = {} }) => {
  const [counts, setCounts] = useState(0);
  const dispatch = useDispatch();

  const getCounts = useCallback(async () => {
    try {
      const { data } = await api.get(API_URLS.diet.getCounts(diet.Id));
      if (data) {
        setCounts(data.count);
      }
    } catch (ex) {
      console.error(ex.message);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!diet.Id) {
        return false;
      }
      await getCounts();
    })();
  }, []);
  if (!diet.Id) {
    return <div></div>;
  }

  const handleClick = () => {
    dispatch(
      setShowAddForm({
        visibility: true,
        planId: diet.Id,
      })
    );
  };

  return (
    <div className={styles.diet_card__base} onClick={handleClick}>
      <div className={styles.img_top}>
        <img
          src={
            diet.FileName
              ? `${process.env.REACT_APP_IMAGES_URL}${diet.FileName}`
              : CARD_PLACEHOLDER_IMAGE
          }
          onError={(el) => {
            el.target.src = CARD_PLACEHOLDER_IMAGE;
          }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <Typography variant="small" className={styles.title}>
            {diet.Title || "N/A"}
          </Typography>
          <Typography variant="extra_small" className={styles.duration}>
            {diet.duration} {diet.duration > 1 ? "days" : "day"}
          </Typography>
        </div>
        <Typography variant="extra_small" className={styles.follow_label}>
          People following
        </Typography>
        <Typography variant="extra_small" className={styles.follow_counts}>
          {counts}
        </Typography>
      </div>
    </div>
  );
};

export default DietCard;
