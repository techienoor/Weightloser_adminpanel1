import React, { useState } from "react";
import styles from "./Switch.module.scss";
import classNames from "classnames";

const Switch = ({ onChange = () => {}, checked }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span className={classNames(styles.slider, styles.round)}></span>
    </label>
  );
};

export default Switch;
