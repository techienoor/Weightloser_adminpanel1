import styles from "./IconButton.module.scss";
import classNames from "classnames";

const IconButton = ({ children, className, size, ...rest }) => {
  return (
    <button
      {...rest}
      className={classNames(className, styles.icon_button, styles[size])}
    >
      {children}
    </button>
  );
};

export default IconButton;
