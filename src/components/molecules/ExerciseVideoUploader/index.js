import React, { useState, useEffect } from "react";
import Typography from "components/Typography";
import Input from "components/Input";
import styles from "./SelectExercise.module.scss";
import Button from "components/Button";
import api, { apiFormData } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Select from "components/Select";
import ImageUploader from "./ImageUploader";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import TextArea from "components/TextArea";
import AVUploader from "components/AVUploader";
import Label from "components/Label";
import classNames from "classnames";
import useCategories from "hooks/useCategories";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Required"),
  VideoDuration: Yup.number("Invalid").required("Required"),
});

const DAYS = ["1", "2", "3", "4", "5", "6", "7"];

const ExerciseVideoUploader = ({
  label,
  planId,
  foodId,
  onSave = () => {},
  selectedDay,
  onFoodAdd = () => {},
  onClose = () => {},
  burner,
  forMind,
}) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const categories = useCategories();
  const [initialValues, setInitialValues] = useState({
    Name: "",
    ImageFile: "",
    Day: [],
    VideoDuration: "",
  });

  const getPreview = () => {
    try {
      if (burner) {
        return burner.FileName
          ? `${process.env.REACT_APP_IMAGES_URL}${burner.FileName}`
          : CARD_PLACEHOLDER_IMAGE;
      }
    } catch (ex) {}
  };

  const saveBurner = async (data) => {
    try {
      setLoading(true);
      let url = API_URLS.burner.create;
      delete data.Day;
      if (burner) {
        data.Id = burner.BurnerId;
        url = API_URLS.burner.update;
      }
      if (forMind) {
        data.Tile = data.Name;
        delete data.Name;
        data.Duration = data.VideoDuration;
        delete data.VideoDuration;
        data.UserId = 1;
        data.Description = data.Category;
        delete data.Category;
        url = API_URLS.video.create;
        data.IvideoFile = data.VideoFile;
        delete data.VideoFile;
      }
      data.duration = data.VideoDuration;
      if (forMind) {
        delete data.duration;
      }
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
      const { data: res } = await apiFormData.post(url, formData);
      if (res) {
        toast.success("Data saved");
        {
          if (forMind) {
            return res.vidId;
          }
        }
        return res.exerciseId;
      }
      return null;
    } catch (ex) {
      throw ex;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (burner) {
      setInitialValues({
        Name: burner.Name,
        VideoDuration: burner.Duration,
        Calories: burner.Calories,
        Day: [],
        FileName: burner.FileName,
      });
    }
  }, [burner]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          if (!burner && (!values.Day || !values.Day.length)) {
            toast("Please select days", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
            return false;
          }
          const postData = { ...values };
          const burnerId = await saveBurner({ ...postData });
          if (burnerId) {
            return onSave({ ...postData, burnerId });
          }
        } catch (ex) {
          console.error("Error in saving burner", ex.message);
        }
      }}
    >
      {({
        values,
        setFieldValue,
        handleBlur,
        handleSubmit,
        handleChange,
        errors,
        touched,
      }) => {
        const handleSelectDay = (day) => {
          const days = values["Day"];
          if (days.includes(day)) {
            days.splice(days.indexOf(day), 1);
          } else {
            days.push(day);
          }
          setFieldValue("Day", [...days]);
        };
        const handleVideoChange = (file) => {
          if (file) {
            setFieldValue("VideoFile", file);
          }
        };
        return (
          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.which === 13) {
                e.preventDefault();
              }
            }}
          >
            <div className={styles.base}>
              <div className={styles.top}>
                <div className={styles.image}>
                  <ImageUploader
                    viewOnly={previewMode}
                    preview={getPreview()}
                    setFieldValue={setFieldValue}
                    error={touched["ImageFile"] && errors["ImageFile"]}
                  />
                </div>
                <div>
                  <TextArea
                    placeholder="Name"
                    name="Name"
                    value={values["Name"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched["Name"] && errors["Name"]}
                  />
                  {/* <Select
                    placeholder="Category"
                    options={categories}
                    idParam="Name"
                    value={values["Category"]}
                    name="Category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched["Category"] && errors["Category"]}
                  /> */}
                  <Input
                    placeholder="Duration"
                    type="number"
                    name="VideoDuration"
                    value={values["VideoDuration"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched["VideoDuration"] && errors["VideoDuration"]}
                  />
                  {!forMind && (
                    <Input
                      placeholder="Calories Burned"
                      type="number"
                      name="Calories"
                      value={values["Calories"]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched["Calories"] && errors["Calories"]}
                    />
                  )}
                </div>
              </div>
              {!burner && (
                <div className={styles.days}>
                  <Typography variant="body_bold" className="mb-1" block>
                    Repeat on these days
                  </Typography>
                  <div className={classNames("d-flex gap-1")}>
                    {DAYS.map((m, index) => (
                      <Label
                        key={m}
                        circle
                        active={values["Day"].includes(index + 1)}
                        onClick={() => handleSelectDay(index + 1)}
                      >
                        <Typography>{m}</Typography>
                      </Label>
                    ))}
                  </div>
                </div>
              )}
              <div className={styles.actions}>
                {!burner && (
                  <AVUploader type="video" onChange={handleVideoChange} />
                )}
                <Button type="submit" size="sm">
                  <Typography variant="label">
                    {loading ? "Please wait..." : "Save Exercise"}
                  </Typography>
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ExerciseVideoUploader;
