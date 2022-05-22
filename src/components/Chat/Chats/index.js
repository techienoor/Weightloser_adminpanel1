import React, { useState } from "react";
import styles from "./Chats.module.scss";
import Typography from "components/Typography";
import ChatCard from "./ChatCard";

const Chats = () => {
  const [active, setActive] = useState(1);

  return (
    <>
      <Typography variant="body_bold" block className="text-dark">
        Recent
      </Typography>
      <div className={styles.list}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((m, index) => (
          <ChatCard
            onClick={() => setActive(index + 1)}
            active={active === index + 1}
          />
        ))}
      </div>
    </>
  );
};

export default Chats;
