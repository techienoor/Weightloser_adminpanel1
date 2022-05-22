import styles from "./Input.module.scss";
import classNames from "classnames";
import Typography from "components/Typography";

const Input = ({
  variant = "grayed",
  size,
  unit,
  error,
  flexible,
  previewMode,
  disabled,
  previewWithLabel,
  placeholder,
  value,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        styles.input_base,
        styles[variant],
        `${error ? styles.hasError : ""}`,
        previewMode ? styles.previewMode : ""
      )}
    >
      {previewMode && previewWithLabel && value && (
        <Typography variant="small">{placeholder}</Typography>
      )}
      <input
        placeholder={placeholder}
        disabled={previewMode || disabled}
        className={classNames(styles[size])}
        value={value}
        {...rest}
      />
      {unit && <span className={styles.unit}>{unit}</span>}
    </div>
  );
};

export default Input;
