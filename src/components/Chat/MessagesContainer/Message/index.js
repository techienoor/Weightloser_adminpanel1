import React, { useState } from "react";
import Typography from "components/Typography";
import styles from "./Message.module.scss";
import Time from "icons/Time";
import Context from "icons/Context";
import classNames from "classnames";
import OutsideClick from "components/OutsideClick";

const ContextMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <OutsideClick onClickOutside={() => setShowMenu(false)}>
      <div className={styles.menu}>
        <Context clickable onClick={() => setShowMenu((prev) => !prev)} />
        {showMenu && (
          <div className={styles.menu_content}>
            <ul>
              <li>
                <Typography variant="label">Delete</Typography>
              </li>
            </ul>
          </div>
        )}
      </div>
    </OutsideClick>
  );
};

const Message = ({ reversed, text, user }) => {
  return (
    <div
      className={classNames(styles.base, `${reversed ? styles.reversed : ""}`)}
    >
      <div className={styles.message}>
        <Typography block variant="body_bold" className="text-secondary">
          {user}
        </Typography>
        <Typography className="text-dark">{text}</Typography>
        <Typography className={styles.time} block variant="small">
          <Time className={styles.icon} /> 10:06
        </Typography>
      </div>
      <ContextMenu />
    </div>
  );
};

export default Message;
