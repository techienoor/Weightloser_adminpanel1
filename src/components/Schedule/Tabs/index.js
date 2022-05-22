import React, { useState } from "react";
import styles from "./Tabs.module.scss";
import classNames from "classnames";
import Typography from "components/Typography";

const Tab = ({ text, active, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames(styles.tab, `${active ? styles.active : ""}`)}
    >
      <Typography
        variant="body_bold"
        className={active ? "text-secondary" : "text-dark"}
      >
        {text}
      </Typography>
    </div>
  );
};

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Diet", "Exercise", "Mind", "Blogs"];
  return (
    <div className={styles.container_tabs}>
      {tabs.map((m) => (
        <Tab
          onClick={() => setActiveTab(m)}
          active={activeTab === m}
          key={m}
          text={m}
        />
      ))}
    </div>
  );
};

export default Tabs;
