import React, { useState, useEffect } from "react";
import Typography from "components/Typography";
import Input from "components/Input";
import styles from "./SelectExercise.module.scss";
import Button from "components/Button";
import api, { apiFormData } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Select from "components/Select";
import ImageUploader from "./ImageUploader";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import TextArea from "components/TextArea";
import AVUploader from "components/AVUploader";

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Required"),
});

const SelectExercise = ({
  label,
  planId,
  foodId,
  selectedDay,
  onFoodAdd = () => {},
  onClose = () => {},
}) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const plans = useSelector((state) => state.diets.plans);
  const [categories, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    Name: "",
    ImageFile: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: res } = await api.get(API_URLS.category.list);
      setCategories(res);
    } catch (ex) {
      console.error("Error in fetching categories", ex.message);
    }
  };

  const getPreview = () => {
    try {
      if (foodId) {
        return initialValues.FileName
          ? `${process.env.REACT_APP_IMAGES_URL}${initialValues.FileName}`
          : CARD_PLACEHOLDER_IMAGE;
      }
    } catch (ex) {}
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={() => {}}
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
                  <TextArea placeholder="Name" />
                  <Select placeholder="Category" options={categories} />
                  <Input placeholder="Duration" type="number" />
                  <Input placeholder="Calories Burned" type="number" />
                </div>
              </div>
              <div className={styles.actions}>
                <AVUploader />
                <Button size="sm">
                  <Typography variant="label">Save Exercise</Typography>
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default SelectExercise;
