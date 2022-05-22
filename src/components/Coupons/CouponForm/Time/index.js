import { useEffect, useState } from "react";
import Typography from "components/Typography";
import styles from "./Time.module.scss";
import Plus from "icons/Plus";
import SelectFood from "components/Diets/SelectFood";
import toast from "react-hot-toast";
import { get, find, set } from "lodash";
import { useSelector } from "react-redux";

const Time = ({ label, planId, selectedDay }) => {
  const plans = useSelector((state) => state.diets.plans);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    if (!selectedDay) {
      toast("Please select a day", {
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

  useEffect(() => {
    const selectedPlan = find(plans, { planId });
    if (selectedPlan) {
      const food = get(selectedPlan.foods, `${selectedDay}.${label}`);
      if (food) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  }, [selectedDay]);

  return (
    <>
      {isOpen ? (
        <SelectFood label={label} planId={planId} selectedDay={selectedDay} />
      ) : (
        <div className={styles.base}>
          <Typography variant="body_bold" className={styles.label}>
            {label}
          </Typography>
          <Typography>( Select Time )</Typography>
          <div className={styles.time_picker} onClick={handleOpen}>
            <Plus className={styles.icon} />
          </div>
        </div>
      )}
    </>
  );
};

export default Time;
