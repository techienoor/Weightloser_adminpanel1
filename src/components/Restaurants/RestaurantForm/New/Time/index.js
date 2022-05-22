import { useState } from "react";
import Typography from "components/Typography";
import styles from "./Time.module.scss";
import Plus from "icons/Plus";
import SelectFood from "components/Restaurants/SelectFood";
import Modal from "components/Modal";
import toast from "react-hot-toast";

const Time = ({ label, restaurantId, onFoodAdd }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!restaurantId) {
      toast("Please save restaurant details first!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return false;
    }
    setIsOpen(true);
  };

  const handleFoodAdd = () => {
    setIsOpen(false);
    onFoodAdd();
  };

  return (
    <div className={styles.base}>
      <Typography variant="body_bold" className={styles.label}>
        {label}
      </Typography>
      <div className={styles.time_picker} onClick={handleOpen}>
        <Plus className={styles.icon} />
      </div>

      <Modal isOpen={isOpen} size="lg" onClose={() => setIsOpen(false)}>
        <SelectFood
          onFoodAdd={handleFoodAdd}
          restaurantId={restaurantId}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Time;
