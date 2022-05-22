import GridFiller from "components/GridFiller";
import styles from "./Grid.module.scss";
import classNames from "classnames";

const Grid = ({ className, children }) => {
  return (
    <div className={classNames(className, styles.grid__base)}>
      {children}
      <GridFiller />
    </div>
  );
};

export default Grid;
