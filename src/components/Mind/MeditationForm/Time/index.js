import { useEffect, useState } from "react";
import Typography from "components/Typography";
import styles from "./Time.module.scss";
import Plus from "icons/Plus";
import ExerciseVideoUploader from "components/molecules/ExerciseVideoUploader";
import toast from "react-hot-toast";
import { get, find } from "lodash";
import { useSelector } from "react-redux";
import Modal from "components/Modal";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import BurnerCard from "components/Mind/BurnerCard";
import Grid from "components/shared/Grid";

const Time = ({
  label,
  planId,
  selectedDay,
  set,
  burners = [],
  viewOnly,
  onBurnerAdd = () => {},
}) => {
  const plans = useSelector((state) => state.exercises.plans);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBurner, setSelectedBurner] = useState(null);

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

  const getBurners = () => {
    try {
      console.log("details", burners);
      return burners.filter(
        (f) => f.Day == selectedDay && f.PlanTitle == label
      );
    } catch (ex) {
      console.error("Error in finding realted burners", ex.message);
      return [];
    }
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

  const onModalClose = () => {
    setIsOpen(false);
  };
  const handleSaveVideo = (data) => {
    setIsOpen(false);
    if (data.Day.length) {
      attachBurnerToExercise(data);
    } else {
      onBurnerAdd();
    }
  };
  const attachBurnerToExercise = (data) => {
    try {
      toast("Attaching vidoe to meditation");
      setTimeout(async () => {
        for (let day of data.Day) {
          await api.post(API_URLS.mind.meditation.attachVideo, {
            VideoId: data.burnerId,
            Day: String(day),
            Sets: 0,
            PlanId: planId,
            Title: label,
          });
        }
        toast.success("Attached video details to meditation");
        onBurnerAdd();
      }, 1000);
    } catch (ex) {
      console.error("Error in attaching burner to meditation", ex.message);
    }
  };

  const handleEditBurner = (data) => {
    setSelectedBurner(data);
    setIsOpen(true);
  };

  return (
    <>
      <div className={styles.base}>
        <Typography block variant="body_bold" className={styles.label}>
          {label}
        </Typography>
        <Grid className={styles.grid}>
          {getBurners().map((m, i) => (
            <BurnerCard
              viewOnly={viewOnly}
              data={m}
              key={i.toString()}
              onEdit={() => handleEditBurner(m)}
            />
          ))}
          {!getBurners().length && (
            <Typography variant="label_bold">No data</Typography>
          )}
          {!viewOnly && (
            <div className={styles.time_picker} onClick={handleOpen}>
              <Plus className={styles.icon} />
            </div>
          )}
        </Grid>
      </div>
      <Modal size="xs" isOpen={isOpen} onClose={onModalClose}>
        <ExerciseVideoUploader
          forMind
          onSave={handleSaveVideo}
          label={label}
          planId={planId}
          selectedDay={selectedDay}
          burner={selectedBurner}
        />
      </Modal>
    </>
  );
};

export default Time;
