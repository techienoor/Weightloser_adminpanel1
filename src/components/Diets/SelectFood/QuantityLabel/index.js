import styles from "./QuantityLabel.module.scss";

const QuantityLabel = ({ title, quantity, left }) => {
  return (
    <div className={styles.base}>
      <span>{title}</span>{" "}
      <span className={styles.carbs}>{(quantity || 0) + "g"}</span>
      <div className="clearfix"></div>
      <span className={styles.left}>{(left || 0) + "g"} left</span>
    </div>
  );
};

export default QuantityLabel;
