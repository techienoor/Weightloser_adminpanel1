import classNames from "classnames";

const Icon = ({ clickable, children, className, ...rest }) => {
  return (
    <span
      {...rest}
      className={classNames(className, { "cursor-pointer": clickable })}
    >
      {children}
    </span>
  );
};

export default Icon;
