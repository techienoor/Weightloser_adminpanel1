import React, { useState, useEffect } from "react";
import Input from "components/Input";
import styles from "./FoodForm.module.scss";
import ImageUploader from "./ImageUploader";
import Select from "components/Select";
import Typography from "components/Typography";
import classNames from "classnames";
import { Formik } from "formik";
import Button from "components/Button";
import toast from "react-hot-toast";
import { apiFormData } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import api from "api/RequestInterceptor";

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Required"),
  Description: Yup.string().required("Required"),
  Cuisine: Yup.string().required("Required"),
  Calories: Yup.number().required("Required").typeError("Invalid number"),
  fat: Yup.number().required("Required").typeError("Invalid number"),
  Carbs: Yup.number().required("Required").typeError("Invalid number"),
  Protein: Yup.number().required("Required").typeError("Invalid number"),
  ServingSize: Yup.number().required("Required").typeError("Invalid number"),
  duration: Yup.number().required("Required").typeError("Invalid number"),
  ImageFile: Yup.mixed().required("Required"),
});

const FoodForm = ({ onFoodAdd = () => {} }) => {
  const [cuisines, setCuisines] = useState([]);
  const [initialValues, setInitialValues] = useState({
    Name: "",
    Description: "",
    duration: "",
    ImageFile: null,
    Calories: "",
    Cuisine: "",
    Carbs: "",
    ServingSize: "",
    Protein: "",
    fat: "",
  });

  useEffect(() => {
    fetchCuisines();
  }, []);

  const fetchCuisines = async () => {
    try {
      const { data: res } = await api.get(API_URLS.cuisine.list);
      setCuisines(res);
    } catch (ex) {
      console.error(ex.message);
    }
  };

  const savePlan = async (values) => {
    try {
      const foodPostData = { ...values, Unit: "gm" };
      foodPostData.Cuisine = cuisines.find(
        (f) => f.Id == values.Cuisine
      )?.CuisineName;
      let foodFormData = new FormData();
      for (let key in foodPostData) {
        foodFormData.append(key, foodPostData[key]);
      }
      const { data } = await apiFormData.post(API_URLS.food.new, foodFormData);
      if (data) {
        toast.success("Food saved");
        onFoodAdd();
      } else {
        toast.error("Something went wrong. Try again");
      }
    } catch (ex) {
      throw ex;
    }
  };

  return (
    <div className={styles.base}>
      <Formik
        onSubmit={async (values) => {
          try {
            toast("Saving food");
            await savePlan(values);
          } catch (ex) {
            toast.error(ex.message);
            console.error(ex.message);
          }
        }}
        validationSchema={validationSchema}
        initialValues={initialValues}
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
              <section className={styles.section_top}>
                <ImageUploader
                  setFieldValue={setFieldValue}
                  error={touched["ImageFile"] && errors["ImageFile"]}
                />
                <div className={styles.inputs}>
                  <Input
                    error={touched["Name"] && errors["Name"]}
                    name="Name"
                    value={values["Name"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Name"
                  />
                  <Input
                    error={touched["Description"] && errors["Description"]}
                    placeholder="Description"
                    name="Description"
                    value={values["Description"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className={styles.selects}>
                  <Input
                    error={touched["Calories"] && errors["Calories"]}
                    placeholder="Calories"
                    type="number"
                    value={values["Calories"]}
                    name="Calories"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Select
                    fullWidth
                    name="Cuisine"
                    error={touched["Cuisine"] && errors["Cuisine"]}
                    value={values["Cuisine"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Select Cuisine"
                    label="CuisineName"
                    options={cuisines}
                  />
                </div>
              </section>
              <CKEditor
                editor={ClassicEditor}
                data=""
                onReady={(editor) => {}}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFieldValue("Details", data);
                }}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
              />
              <section className={styles.nutrition}>
                <Typography variant="body_bold" className="mb-1" block>
                  Nutritions
                </Typography>
                <div>
                  <Input
                    error={touched["fat"] && errors["fat"]}
                    placeholder="Fat"
                    type="number"
                    value={values["fat"]}
                    name="fat"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    error={touched["Carbs"] && errors["Carbs"]}
                    placeholder="Carbs"
                    type="number"
                    value={values["Carbs"]}
                    name="Carbs"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    error={touched["Protein"] && errors["Protein"]}
                    placeholder="Protein"
                    type="number"
                    value={values["Protein"]}
                    name="Protein"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </section>
              <section className="mt-1">
                <div className={classNames("d-flex gap-1 align-center mb-3")}>
                  {/* <Input placeholder="Select no. of weeks" />
                  <Typography variant="small">or</Typography> */}
                  <Input
                    error={touched["duration"] && errors["duration"]}
                    type="number"
                    placeholder="Select no. of days"
                    name="duration"
                    value={values["duration"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    <Input
                      placeholder="Serving Size"
                      error={touched["ServingSize"] && errors["ServingSize"]}
                      onBlur={handleBlur}
                      variant="outlined"
                      unit="grams"
                      name="ServingSize"
                      type="number"
                      value={values["ServingSize"]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>
              <section>
                <Button size="sm" type="submit">
                  <Typography variant="small_bold">Save Food</Typography>
                </Button>
              </section>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FoodForm;
