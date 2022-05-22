import React, { useState } from "react";
import Input from "components/Input";
import styles from "./ExerciseForm.module.scss";
import ImageUploader from "components/molecules/ImageUploader/Linear";
import Select from "components/Select";
import Typography from "components/Typography";
import Time from "./Time";
import { Formik } from "formik";
import Button from "components/Button";
import toast from "react-hot-toast";
import { apiFormData } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import * as Yup from "yup";
import useCousines from "hooks/useCousines";
import useCategories from "hooks/useCategories";
import FoodCard from "../FoodCard";
import api from "api/RequestInterceptor";

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Required"),
  Description: Yup.string().required("Required"),
  ImageFile: Yup.mixed().required("Required"),
  Cuisine: Yup.string().required("Required"),
  Category: Yup.string().required("Required"),
});

const TIMES = ["Item 1", "Item 2", "Item 3"];

const ExerciseForm = () => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [times, setTimes] = useState(TIMES);
  const [loading, setLoading] = useState(false);
  const cousines = useCousines();
  const categories = useCategories();
  const [items, setItems] = useState([]);

  const [initialValues, setInitialValues] = useState({
    Name: "",
    Description: "",
    ImageFile: null,
    Cuisine: "",
    Category: "",
  });

  const fetchItems = async () => {
    try {
      if (!restaurantId) {
        return false;
      }
      const { data: res } = await api.get(
        API_URLS.restaurants.items(restaurantId)
      );
      setItems(res.foodDetails);
    } catch (ex) {
      console.error("Error in fetching restuarant items", ex.message);
      setItems([]);
    }
  };

  const handleFoodAdd = () => {
    fetchItems();
  };

  const saveRestaurant = async (planPostData) => {
    try {
      let url = API_URLS.restaurants.create;
      if (restaurantId) {
        planPostData.Id = restaurantId;
        url = API_URLS.restaurants.update;
      }
      let planFormData = new FormData();
      for (let key in planPostData) {
        planFormData.append(key, planPostData[key]);
      }
      const { data: res } = await apiFormData.post(url, planFormData);
      return res.restuarantId;
    } catch (ex) {
      throw ex;
    }
  };

  const handleAddItem = () => {
    setTimes((prev) => [...prev, "Item " + (prev.length + 1)]);
  };

  return (
    <div className={styles.base}>
      <Formik
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const data = await saveRestaurant({ ...values });
            if (data) {
              setRestaurantId(data);
              toast.success("Restuarant saved");
            } else {
              toast.error("Something went wrong. Try again");
            }
          } catch (ex) {
            toast.error(ex.message);
            console.error(ex.message);
          } finally {
            setLoading(false);
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
                    placeholder="Restaurant Name"
                  />
                  <Input
                    error={touched["Description"] && errors["Description"]}
                    placeholder="Restaurant Type"
                    name="Description"
                    value={values["Description"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className={styles.selects}>
                  <Select
                    placeholder="Category"
                    name="Category"
                    value={values["Category"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched["Category"] && errors["Category"]}
                    options={categories}
                    idParam="Name"
                  />
                  <Select
                    name="Cuisine"
                    value={values["Cuisine"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Cuisine"
                    options={cousines}
                    idParam="CuisineName"
                    label="CuisineName"
                    error={touched["Cuisine"] && errors["Cuisine"]}
                  />
                </div>
                <div className={styles.actions}>
                  <Button disabled={loading} size="sm" type="submit">
                    <Typography variant="small_bold">
                      {loading ? "Please wait..." : "Save"}
                    </Typography>
                  </Button>
                </div>
              </section>
            </form>
          );
        }}
      </Formik>
      <section>
        <div className={styles.times}>
          {times.map((m, i) => {
            if (items[i]) {
              return (
                <>
                  <Typography block className="mb-1" variant="body_bold">
                    {m}
                  </Typography>
                  <FoodCard key={m.Id} data={items[i]} viewOnly={true} />
                </>
              );
            }
            return (
              <Time
                onFoodAdd={handleFoodAdd}
                key={m}
                label={m}
                restaurantId={restaurantId}
                selectedDay={selectedDay}
              />
            );
          })}
          <Button size="sm" shape="rect" onClick={handleAddItem}>
            <Typography variant="small">Add Item</Typography>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ExerciseForm;
