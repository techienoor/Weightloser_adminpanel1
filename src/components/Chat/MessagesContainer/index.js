import styles from "./MessagesContainer.module.scss";
import Message from "./Message";
import Input from "./Input";
import Send from "icons/Send";
import Button from "components/Button";
import Typography from "components/Typography";
import { Indicator } from "../Chats/ChatCard";
import { SearchInput } from "components/Header";
import ContextAlt from "icons/ContextAlt";
import IconButton from "components/IconButton";
import Gear from "icons/Gear";

const MessagesContainer = () => {
  return (
    <div>
      <div className={styles.top}>
        <div>
          <Typography className="mb-sm" variant="body_bold" block>
            Henry Smith
          </Typography>
          <Indicator /> <Typography variant="label">Active Now</Typography>
        </div>
        <div>
          <SearchInput />
          <IconButton>
            <ContextAlt />
          </IconButton>
          <IconButton>
            <Gear />
          </IconButton>
        </div>
      </div>
      <div className={styles.container_messages}>
        <Message text="Some text in the." user="Henry Smith" />
        <Message text="Some text in the chat lorum." user="Henry Smith" />
        <Message
          text="Lorum Ipsum some text in chat  that shows chat  going on"
          user="Steven Franklin"
          reversed
        />
        <Message text="Some text in the." user="Henry Smith" />
        <Message text="Some text in the chat lorum." user="Henry Smith" />
      </div>
      <div className={styles.bottom}>
        <Input />{" "}
        <Button>
          Send <Send />{" "}
        </Button>
      </div>
    </div>
  );
};

export default MessagesContainer;
