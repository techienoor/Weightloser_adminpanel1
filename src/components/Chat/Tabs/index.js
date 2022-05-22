import React, { useState } from "react";
import Typography from "components/Typography";
import styles from "./Tabs.module.scss";
import classNames from "classnames";

const Tab = ({ active, text, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames(styles.tab, `${active ? styles.active : ""}`)}
    >
      <Typography variant="body_bold">{text}</Typography>
    </div>
  );
};

const TABS = ["Chat", "Contacts", "Categories"];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className={styles.container_tabs}>
      {TABS.map((m, index) => (
        <Tab
          text={m}
          active={activeTab === index + 1}
          onClick={() => setActiveTab(index + 1)}
        />
      ))}
    </div>
  );
};

export default Tabs;
