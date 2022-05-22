import styles from "./Select.module.scss";
import classNames from "classnames";
import Typography from "components/Typography";

const Select = ({
  options = [],
  fullWidth,
  placeholder,
  label = "Name",
  error,
  idParam = "Id",
  previewWithLabel,
  previewMode,
  value,
  disabled,
  className,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        className,
        styles.base,
        fullWidth ? styles.fullWidth : "",
        error ? styles.hasError : "",
        previewMode ? styles.previewMode : ""
      )}
    >
      {previewMode && previewWithLabel && value && (
        <Typography variant="small">{placeholder}</Typography>
      )}
      <select
        value={value}
        disabled={previewMode || disabled}
        defaultValue={""}
        {...rest}
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {options?.map((m) => (
          <option key={m[idParam]} value={m[idParam]}>
            {m[label]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
