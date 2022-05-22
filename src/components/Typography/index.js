import classNames from "classnames";

const baseStyles = {
  fontFamily: "Montserrat, sans-serif",
};

const VARIANTS = {
  h3: {
    fontSize: "1.5625rem",
    fontWeight: "500",
  },
  body: {
    fontSize: "0.9375rem",
  },
  body_light: {
    fontSize: "0.9375rem",
    fontWeight: "300",
  },
  body_bold: {
    fontSize: "0.9375rem",
    fontWeight: "500",
  },
  label: {
    fontSize: "0.8125rem",
  },
  label_light: {
    fontSize: "0.8125rem",
    fontWeight: 200,
  },
  label_bold: {
    fontSize: "0.8125rem",
    fontWeight: "500",
  },
  small: {
    fontSize: "0.75rem",
  },
  small_bold: {
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  extra_small: {
    fontSize: "0.6875rem",
  },
  extra_small_bold: {
    fontSize: "0.0.6875rem",
    fontWeight: "500",
  },
};

const Typography = ({
  variant = "body",
  className,
  children,
  block,
  dark,
  disabled,
  style = {},
  ...rest
}) => {
  return (
    <span
      {...rest}
      className={classNames(
        className,
        { "d-block": block },
        `${disabled ? "text-disabled" : ""}`,
        `${dark ? "text-dark" : ""}`
      )}
      style={{ ...style, ...baseStyles, ...VARIANTS[variant] }}
    >
      {children}
    </span>
  );
};

export default Typography;
