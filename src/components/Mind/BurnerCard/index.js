import { useState } from "react";
import styles from "./BurnerCard.module.scss";
import Typography from "components/Typography";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ContextMenu from "components/molecules/ContextMenu";
import { getVideoUrl } from "../CBTCard";

const BurnerCard = ({ data: food = {}, viewOnly, onEdit = () => {} }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  console.log("food", food);

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
                API_URLS.video.delete(food.vidId)
              );
              if (res) {
                toast.success("Video deleted successfully");
                if (res && res.response) {
                  setIsDeleted(true);
                }
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

  if (isDeleted) {
    return null;
  }

  return (
    <div className={styles.food_card__base}>
      <div className={styles.img_top}>
        <video src={getVideoUrl(food.VideoFile)} />
      </div>
      {!viewOnly && (
        <ContextMenu>
          <li onClick={handleDelete}>
            <Typography variant="small">Delete</Typography>
          </li>
        </ContextMenu>
      )}
      <div className={styles.content}>
        <div className={styles.head}>
          <Typography variant="small" className={styles.title}>
            {food.Title || "N/A"}
          </Typography>
          <Typography variant="extra_small" className={styles.duration}>
            {food.Duration} mins
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default BurnerCard;
