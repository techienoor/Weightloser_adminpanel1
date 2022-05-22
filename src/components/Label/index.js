import styles from "./Label.module.scss";
import classNames from "classnames";

const Label = ({ children, circle, active, disabled, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames(
        styles.base,
        `${circle ? styles.circle : ""}`,
        `${active ? styles.active : ""}`,
        `${disabled ? styles.disabled : ""}`
      )}
    >
      {children}
    </div>
  );
};

export default Label;
