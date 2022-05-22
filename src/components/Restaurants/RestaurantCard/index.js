import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setShowAddForm } from "redux/reducers/restaurants.reducer";
import styles from "./RestaurantCard.module.scss";
import api, { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import Context from "icons/Context";
import IconButton from "components/IconButton";
import OutsideClick from "components/OutsideClick";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import ContextMenu from "components/molecules/ContextMenu";
const Typography = React.lazy(() => import("components/Typography"));

const RestaurantCard = ({ diet = {} }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [counts, setCounts] = useState({
    itemCount: 0,
    following: 0,
  });
  const dispatch = useDispatch();

  const getCounts = async () => {
    try {
      const { data: res } = await api.get(API_URLS.restaurants.counts(diet.Id));
      if (res) {
        setCounts(res);
      }
    } catch (ex) {
      console.error(ex.message);
    }
  };

  const handleDelete = async () => {
    confirmAlert({
      title: "Delete Restaurant",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const { data: res } = await api.delete(
                API_URLS.restaurants.delete(diet.Id)
              );
              if (res) {
                toast.success("Restaurant deleted successfully");
                setIsDeleted(true);
              } else {
                toast.error("An unknow error occurred!");
              }
            } catch (ex) {
              console.error(
                "Error in deleting food from restaurant",
                ex.message
              );
              toast.error(ex.message);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

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

  if (isDeleted) {
    return null;
  }

  return (
    <div className={styles.diet_card__base}>
      <ContextMenu>
        <li onClick={handleDelete}>
          <Typography variant="small">Delete</Typography>
        </li>
      </ContextMenu>
      <div className={styles.img_top} onClick={handleClick}>
        <img
          src={
            diet.Image
              ? `${process.env.REACT_APP_IMAGES_URL}${diet.Image}`
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
            {diet.Name || "N/A"}
          </Typography>
          <Typography variant="extra_small" className={styles.duration}>
            {counts.itemCount || 0} {counts.itemCount > 1 ? "items" : "item"}
          </Typography>
        </div>
        <Typography variant="extra_small" className={styles.follow_label}>
          People following
        </Typography>
        <Typography variant="extra_small" className={styles.follow_counts}>
          {counts.following}
        </Typography>
      </div>
    </div>
  );
};

export default RestaurantCard;
