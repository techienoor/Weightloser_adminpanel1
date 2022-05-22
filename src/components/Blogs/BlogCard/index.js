import { useState } from "react";
import styles from "./BlogCard.module.scss";
import Time from "icons/Time";
import dayjs from "dayjs";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import Typography from "components/Typography";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import ContextMenu from "components/molecules/ContextMenu";

const BlogCard = ({
  data = {},
  onEdit = () => {},
  viewOnly,
  onClick = () => {},
}) => {
  const { Title, Description, CreatedAt, Id, FileName, Category } = data;
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    confirmAlert({
      title: "Delete Blog",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const { data: res } = await api.delete(API_URLS.blog.delete(Id));
              if (res) {
                toast.success("Blog deleted successfully");
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

  if (isDeleted) {
    return null;
  }

  return (
    <div className={styles.base} onClick={onClick}>
      {!viewOnly && (
        <ContextMenu>
          <li onClick={onEdit}>
            <Typography variant="small">Edit</Typography>
          </li>
          <li onClick={handleDelete}>
            <Typography variant="small">Delete</Typography>
          </li>
        </ContextMenu>
      )}
      <Link to={viewOnly ? "#" : "/blogs/" + Id}>
        <div className={styles.image}>
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}${FileName}`}
            onError={(el) => {
              el.target.src = CARD_PLACEHOLDER_IMAGE;
            }}
          />
        </div>
      </Link>
      <div className={styles.content}>
        <h2 className={styles.title}>{Title}</h2>
        <div className="d-flex gap-1">
          <span className={styles.exercise_label}>
            {Category || "No Category"}
          </span>
          <span className={styles.time}>
            <Time />{" "}
            {CreatedAt ? dayjs(CreatedAt).format("MMMM DD, YYYY") : "N/A"}
          </span>
        </div>
        <p className={styles.description}>{Description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
