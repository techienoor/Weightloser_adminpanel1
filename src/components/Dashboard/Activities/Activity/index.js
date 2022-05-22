import React, { useState, useEffect } from "react";
import styles from "./Activity.module.scss";
import ArrowRightCircle from "icons/ArrowRightCircle";
import ArrowRightCircleActive from "icons/ArrowRightCircleActive";
import ArrowRight from "icons/ArrowRight";
import Typography from "components/Typography";

const Text = ({ children: text }) => {
  const MAX_TEXT_LENGTH = 80;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [data, setData] = useState(text.slice(0, MAX_TEXT_LENGTH));
  useEffect(() => {
    if (isCollapsed) {
      setData(text.slice(0, MAX_TEXT_LENGTH));
    } else {
      setData(text);
    }
  }, [isCollapsed]);

  return (
    <div>
      <Typography dark>
        {data}
        {isCollapsed && "... "}
      </Typography>
      {text.length > MAX_TEXT_LENGTH && (
        <Typography
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="text-secondary cursor-pointer"
        >
          {isCollapsed ? "Read more" : ""}
        </Typography>
      )}
    </div>
  );
};

const Activity = () => {
  return (
    <div className={styles.base}>
      <ArrowRightCircle className={styles.icon} />

      <Typography className="nowrap">22 Nov</Typography>
      <ArrowRight />

      <Text>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like)
      </Text>
    </div>
  );
};

export default Activity;
