import { useState } from "react";
import Context from "icons/Context";
import IconButton from "components/IconButton";
import OutsideClick from "components/OutsideClick";
import styles from "./ContextMenu.module.scss";

const ContextMenu = ({ children }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  return (
    <OutsideClick onClickOutside={() => setShowContextMenu(false)}>
      <IconButton
        className={styles.btn_context_menu}
        onClick={() => setShowContextMenu((prev) => !prev)}
      >
        <Context />
      </IconButton>
      {showContextMenu && <ul className={styles.context_menu}>{children}</ul>}
    </OutsideClick>
  );
};

export default ContextMenu;
