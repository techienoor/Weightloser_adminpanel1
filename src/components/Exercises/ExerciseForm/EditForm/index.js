import React, { useState, useEffect } from "react";
import Input from "components/Input";
import styles from "./EditForm.module.scss";
import Typography from "components/Typography";
import classNames from "classnames";
import Weeks from "components/molecules/Weeks";
import Time from "../Time";
import ImageUploader from "components/molecules/ImageUploader";
import { Formik } from "formik";
import Button from "components/Button";
import toast from "react-hot-toast";
import api, {
  apiFormData,
  CARD_PLACEHOLDER_IMAGE,
} from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "components/TextArea";
import Select from "components/Select";
import * as _ from "lodash";
import useBurnerTypes from "hooks/useBurnerTypes";
import useCategories from "hooks/useExerciseCategories";
import useCousines from "hooks/useCousines";

const validationSchema = Yup.object().shape({
  Title: Yup.string().required("Required"),
  Description: Yup.string().required("Required"),
  duration: Yup.number().required("Required").typeError("Invalid number"),
  ImageFile: Yup.mixed().required("Required"),
  Cuisine: Yup.string().required("Required"),
});

const validationSchemaForUpdate = Yup.object().shape({
  Title: Yup.string().required("Required"),
  Description: Yup.string().required("Required"),
  duration: Yup.number().required("Required").typeError("Invalid number"),
  Cuisine: Yup.string().required("Required"),
});

export const TIMES = [
  { label: "SET 1", time: "08:30" },
  { label: "SET 2", time: "12:30" },
  { label: "SET 3", time: "20:30" },
  { label: "SET 4" },
];

const DietForm = ({ viewOnly }) => {
  const dispatch = useDispatch();
  const [currentPlanId, setCurrentPlanId] = useState(
    useSelector((state) => state.exercises.planId)
  );
  const [selectedDay, setSelectedDay] = useState(1);
  const cuisines = useCousines();
  const categories = useCategories();
  const burnerTypes = useBurnerTypes();
  const [numOfDays, setNumOfDays] = useState(null);
  const [numOfSets, setNumOfSets] = useState(0);
  const [editMode, setEditMode] = useState(currentPlanId ? false : true);
  const [burners, setBurners] = useState([]);
  const [initialValues, setInitialValues] = useState({
    Title: "",
    Description: "",
    duration: "",
    ImageFile: "",
    Cuisine: "",
    Sets: "",
  });
  const [dietData, setDietData] = useState(null);
  const allExercises = useSelector((state) => state.exercises.data);
  const [count, setCount] = useState(0);

  useEffect(() => {}, [count]);

  useEffect(() => {
    getPlan(currentPlanId);
  }, [currentPlanId]);

  const getPlan = (planId) => {
    if (!planId) {
      return false;
    }
    try {
      const diet = allExercises.find((f) => f.Id == planId);
      setInitialValues({
        Title: diet.Title,
        Description: diet.Description,
        duration: Number(diet.duration),
        Sets: diet.Sets,
        FileName: diet.FileName,
        Cuisine: diet.Cuisine,
      });
      setNumOfDays(diet.duration);
      setNumOfSets(diet.Sets);
    } catch (ex) {
      console.error(ex.message);
    }
  };

  const fetchPlanBurners = async () => {
    try {
      console.log("called");
      const { data: res } = await api.get(
        API_URLS.exercise.getPlanDetails(currentPlanId, selectedDay)
      );
      setBurners(res?.burners || []);
    } catch (ex) {
      console.error("Error in fetching exercise plan burners", ex.message);
      setBurners([]);
    }
  };

  const savePlan = async (planPostData) => {
    try {
      planPostData.Id = currentPlanId;
      let planFormData = new FormData();
      for (let key in planPostData) {
        planFormData.append(key, planPostData[key]);
      }
      const { data } = await apiFormData.post(
        API_URLS.exercise.update,
        planFormData
      );
      if (data) {
        toast.success("Plan saved");
      } else {
        toast.error("Something went wrong. Try again");
      }
    } catch (ex) {
      throw ex;
    }
  };

  const getPreview = () => {
    try {
      if (currentPlanId) {
        return initialValues.FileName
          ? `${process.env.REACT_APP_IMAGES_URL}${initialValues.FileName}`
          : CARD_PLACEHOLDER_IMAGE;
      }
    } catch (ex) {}
  };

  useEffect(() => {
    fetchPlanBurners();
  }, [selectedDay]);

  return (
    <div className={styles.base}>
      <Formik
        onSubmit={async (values) => {
          try {
            toast("Saving plan");
            const planPostData = {
              ...values,
              ImageFile: values.ImageFile,
              Details: "",
              UserId: 1,
              PlanTypeId: 2,
            };
            await savePlan(planPostData);
            setNumOfDays(values.duration);
            setNumOfSets(values.Sets);
          } catch (ex) {
            toast.error(ex.message);
            console.error(ex.message);
          }
        }}
        validationSchema={
          currentPlanId ? validationSchemaForUpdate : validationSchema
        }
        initialValues={initialValues}
        enableReinitialize={true}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          handleBlur,
          setFieldValue,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <section className={styles.head}>
                <TextArea
                  disabled={!editMode}
                  error={touched["Title"] && errors["Title"]}
                  name="Title"
                  size="lg"
                  as="textarea"
                  variant="no-border"
                  value={values["Title"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Plan Name"
                />
                {!viewOnly && (
                  <>
                    {editMode ? (
                      <Button type="submit">
                        <Typography variant="body_bold">Save</Typography>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditMode(true);
                        }}
                      >
                        <Typography variant="body_bold">Edit</Typography>
                      </Button>
                    )}
                  </>
                )}
              </section>
              <section className={styles.image}>
                <ImageUploader
                  viewOnly={!editMode}
                  preview={getPreview()}
                  setFieldValue={setFieldValue}
                  error={touched["ImageFile"] && errors["ImageFile"]}
                />
              </section>
              <section className={classNames(styles.section_top)}>
                <div className={classNames(styles.inputs)}>
                  <Select
                    previewMode={!editMode}
                    placeholder="Category"
                    idParam="Description"
                    options={categories}
                    onChange={handleChange}
                    label="Description"
                    name="Details"
                    value={values["Details"]}
                    onBlur={handleBlur}
                    error={touched["Details"] && errors["Details"]}
                  />
                  <Select
                    previewMode={!editMode}
                    placeholder="Type"
                    idParam="Name"
                    options={burnerTypes}
                    onChange={handleChange}
                    value={values["Cuisine"]}
                    name="Cuisine"
                    onBlur={handleBlur}
                    error={touched["Cuisine"] && errors["Cuisine"]}
                  />
                </div>
              </section>
              {editMode && (
                <section className="d-flex gap-1 align-center mb-3">
                  <div>
                    <Typography variant="body_bold" className="mb-1" block>
                      Select Number of Days
                    </Typography>
                    <Input
                      disabled={!editMode}
                      error={touched["duration"] && errors["duration"]}
                      type="number"
                      placeholder="Select no. of days"
                      name="duration"
                      value={values["duration"]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    <Typography variant="body_bold" className="mb-1" block>
                      Select Number of Sets
                    </Typography>
                    <Input
                      disabled={!editMode}
                      error={touched["Sets"] && errors["Sets"]}
                      type="number"
                      placeholder="Select no. of sets"
                      name="Sets"
                      value={values["Sets"]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </section>
              )}
            </form>
          );
        }}
      </Formik>
      <section>
        {currentPlanId && (
          <>
            <Weeks
              viewOnly={!editMode}
              numOfDays={numOfDays}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
            <div className={styles.times}>
              {selectedDay &&
                Array.from({ length: numOfSets }, (_, i) => i + 1).map(
                  (m, i) => {
                    return (
                      <Time
                        withLogging={viewOnly}
                        burners={burners}
                        viewOnly={!editMode}
                        setCount={() => setCount((prev) => prev + 1)}
                        count={count}
                        key={m}
                        set={m}
                        label={"SET " + m}
                        planId={currentPlanId}
                        selectedDay={selectedDay}
                        onBurnerAdd={() => fetchPlanBurners()}
                      />
                    );
                  }
                )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default React.memo(DietForm);
