import React, { useEffect } from "react";
import Typography from "components/Typography";
import styles from "./Chat.module.scss";
import Status from "./Status";
import Search from "./Search";
import Tabs from "./Tabs";
import Chats from "./Chats";
import classNames from "classnames";
import MessagesContainer from "./MessagesContainer";

const Chat = () => {
  return (
    <>
      <Typography variant="body_bold" block className="mb-2">
        Chat
      </Typography>
      <div className={styles.content}>
        <div className={classNames(styles.left)}>
          <Status />
          <Search />
          <Tabs />
          <Chats />
        </div>
        <div className={styles.right}>
          <MessagesContainer />
        </div>
      </div>
    </>
  );
};

export default Chat;
