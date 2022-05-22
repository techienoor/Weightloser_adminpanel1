import styles from "./Checkbox.module.scss";

const Checkbox = () => {
  return (
    <label className={styles.base}>
      <input type="checkbox" />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default Checkbox;
