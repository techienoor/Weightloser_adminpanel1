import styles from "./Input.module.scss";
import classNames from "classnames";
import Attachment from "icons/Attachment";

const Input = ({ className, ...rest }) => {
  return (
    <div className={classNames(className, styles.input_container)}>
      <input {...rest} placeholder="Enter message..." />
      <Attachment className={styles.icon_attachment} clickable />
    </div>
  );
};

export default Input;
