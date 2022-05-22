import Typography from "components/Typography";
import styles from "./Row.module.scss";
import Button from "components/Button";
import Badge from "components/Badge";
import Message from "icons/Message";
import PencilAlt from "icons/PencilAlt";
import Trash from "icons/Trash";
import { USER_THUMBNAIL } from "api/RequestInterceptor";
import { handleDelete } from "../AddEditForm/AddEditForm";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";

const Row = ({ onEdit, data = {}, onDelete }) => {
  const { Name, Email, ImageFile, Code, Department, Id } = data;

  return (
    <div className={styles.base}>
      <img
        src={process.env.REACT_APP_IMAGES_URL + ImageFile}
        onError={(e) => (e.target.src = CARD_PLACEHOLDER_IMAGE)}
      />
      <Typography variant="body_bold">{Name}</Typography>
      <Badge>{Department}</Badge>
      <Typography>Last Online: 24 hr ago</Typography>
      <Typography>{Email}</Typography>
      <Typography>{Code}</Typography>
      <Typography>Rating</Typography>
      <div className={styles.actions}>
        {/* <Button outlined circle>
          <Message />
        </Button> */}
        <Button onClick={onEdit} circle outlined>
          <PencilAlt />
        </Button>
        <Button onClick={() => handleDelete(Id, onDelete)} circle outlined>
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default Row;
