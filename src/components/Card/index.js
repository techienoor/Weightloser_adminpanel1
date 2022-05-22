import styles from "./Card.module.scss";
import classNames from "classnames";

const Card = ({ className, children }) => {
  return (
    <div className={classNames(className, styles.card_base)}>{children}</div>
  );
};

export default Card;
