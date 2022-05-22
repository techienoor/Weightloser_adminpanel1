import { useState } from "react";
import styles from "./FoodCard.module.scss";
import Typography from "components/Typography";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import Heart from "icons/Heart";
import Plus from "icons/Plus";
import Context from "icons/Context";
import IconButton from "components/IconButton";
import OutsideClick from "components/OutsideClick";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const FoodCard = ({
  data: food,
  viewOnly,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  const deleteFood = async () => {
    confirmAlert({
      title: "Delete Food",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const { data: res } = await api.delete(
                API_URLS.restaurants.deleteFood(food.FoodId, food.RestuarantId)
              );
              if (res) {
                toast.success("Food removed successfully");
                onDelete();
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

  return (
    <div className={styles.food_card__base}>
      {!viewOnly && (
        <OutsideClick onClickOutside={() => setShowContextMenu(false)}>
          <IconButton
            className={styles.btn_context_menu}
            onClick={() => setShowContextMenu((prev) => !prev)}
          >
            <Context />
          </IconButton>
          {showContextMenu && (
            <ul className={styles.context_menu}>
              <li onClick={deleteFood}>
                <Typography variant="small">Delete</Typography>
              </li>
              <li onClick={onEdit}>
                <Typography variant="small">Edit</Typography>
              </li>
            </ul>
          )}
        </OutsideClick>
      )}
      <div className={styles.img_top}>
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}${food.FileName}`}
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
            {food.Description && JSON.parse(food.Description) instanceof Array
              ? JSON.parse(food.Description).join(" + ")
              : "N/A"}
          </Typography>
        </div>
        <div className={styles.footer}>
          <Typography variant="small">{food.Cuisine}</Typography>
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

export default FoodCard;
