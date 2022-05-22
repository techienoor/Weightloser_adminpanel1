import { useEffect, useState } from "react";
import styles from "./BurnerCard.module.scss";
import Typography from "components/Typography";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ContextMenu from "components/molecules/ContextMenu";

const BurnerCard = ({
  data: food = {},
  viewOnly,
  withLogging,
  onEdit = () => {},
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [logged, setLogged] = useState(false);

  const handleDelete = async () => {
    confirmAlert({
      title: "Delete Exercise",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const { data: res } = await api.delete(
                API_URLS.exercise.deleteBurner(food.PlanId, food.BurnerId)
              );
              if (res) {
                toast.success("Exercise removed successfully");
                setIsDeleted(true);
              } else {
                toast.error("An unknow error occurred!");
              }
            } catch (ex) {
              console.error(
                "Error in deleting burner from exercise plan",
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

  const fetchLogging = async () => {
    try {
      const { data } = await api.get(
        API_URLS.exercise.getLogging(269, food.PlanId)
      );
      if (data && data.response === "Logged") {
        setLogged(true);
      } else {
        setLogged(false);
      }
    } catch (ex) {}
  };

  useEffect(() => {
    fetchLogging();
  }, []);

  if (isDeleted) {
    return null;
  }

  return (
    <div className={styles.food_card__base}>
      {withLogging && (
        <div className={styles.logging}>
          <Typography variant="h3">
            {logged ? "Logged" : "Not Logged"}
          </Typography>
        </div>
      )}

      {!viewOnly && (
        <ContextMenu>
          <li onClick={handleDelete}>
            <Typography variant="small">Delete</Typography>
          </li>
          <li onClick={onEdit}>
            <Typography variant="small">Edit</Typography>
          </li>
        </ContextMenu>
      )}
      <div className={styles.img_top}>
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}${food?.FileName}`}
          onError={(el) => {
            el.target.src = CARD_PLACEHOLDER_IMAGE;
          }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <Typography variant="small" className={styles.title}>
            {food.Name || "N/A"}
          </Typography>
          <Typography variant="extra_small" className={styles.duration}>
            {food.Duration} mins
          </Typography>
        </div>
        <div className={styles.footer}>
          <Typography variant="label" className={styles.counts}>
            {food.Calories}{" "}
            <Typography variant="extra_small" className="text-disabled">
              kcal
            </Typography>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default BurnerCard;
