import { useEffect, useState, useMemo, useCallback } from "react";
import Typography from "components/Typography";
import styles from "./Time.module.scss";
import Plus from "icons/Plus";
import ExerciseVideoUploader from "components/molecules/ExerciseVideoUploader";
import ExerciseForm from "components/Exercises/SelectExercise";
import toast from "react-hot-toast";
import { get, find } from "lodash";
import { useSelector } from "react-redux";
import Modal from "components/Modal";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import BurnerCard from "components/Exercises/BurnerCard";
import Grid from "components/shared/Grid";

const Time = ({
  label,
  withLogging,
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
      console.log(
        "burners",
        burners.filter((f) => f.Day == selectedDay && f.Title == set)
      );
      return burners.filter((f) => f.Day == selectedDay && f.Title == set);
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
  const handleSaveVideo = async (data) => {
    setIsOpen(false);
    if (data.Day.length) {
      await attachBurnerToExercise(data);
    } else {
      onBurnerAdd();
    }
  };
  const attachBurnerToExercise = async (data) => {
    try {
      toast("Attaching burner to exercise");
      for (let day of data.Day) {
        await api.post(API_URLS.exercise.addExercise, {
          BurnerId: data.burnerId,
          Day: String(day),
          Sets: set,
          PlanId: planId,
          Title: String(set),
        });
      }
      toast.success("Attached burner details to exercise");
      onBurnerAdd();
    } catch (ex) {
      console.error("Error in attaching burner to exercise", ex.message);
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
              withLogging={withLogging}
              viewOnly={viewOnly}
              data={m}
              key={i.toString()}
              onEdit={() => handleEditBurner(m)}
            />
          ))}
          {!viewOnly && (
            <div className={styles.time_picker} onClick={handleOpen}>
              <Plus className={styles.icon} />
            </div>
          )}
          {!getBurners().length && (
            <Typography variant="label_bold">No Exercises</Typography>
          )}
        </Grid>
      </div>
      <Modal size="xs" isOpen={isOpen} onClose={onModalClose}>
        <ExerciseVideoUploader
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
