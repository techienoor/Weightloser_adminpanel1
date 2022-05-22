import React, { useState, useEffect } from "react";
import styles from "./RestaurantForm.module.scss";
import ImageUploader from "./ImageUploader";
import Typography from "components/Typography";
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
import FoodCard from "./FoodCard";
import * as _ from "lodash";
import GridFiller from "components/GridFiller";
import IconButton from "components/IconButton";
import Plus from "icons/Plus";
import Modal from "components/Modal";
import SelectFood from "../SelectFood";
import Select from "components/Select";
import useCategories from "hooks/useCategories";
import useCousines from "hooks/useCousines";

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Required"),
  Description: Yup.string().required("Required"),
  Cuisine: Yup.string().required("Required"),
  Category: Yup.string().required("Required"),
});

export const TIMES = [
  { label: "Breakfast", time: "08:30" },
  { label: "Lunch", time: "12:30" },
  { label: "Dinner", time: "20:30" },
  { label: "Snacks" },
];

const RestaurantForm = ({ viewOnly }) => {
  const dispatch = useDispatch();
  const categories = useCategories();
  const cousines = useCousines();
  const [restaurantId, setRestaurantId] = useState(
    useSelector((state) => state.restaurants.planId)
  );
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cuisines, setCuisines] = useState([]);
  const [categotries, setCategories] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [numOfDays, setNumOfDays] = useState(null);
  const [editMode, setEditMode] = useState(restaurantId ? false : true);
  const [initialValues, setInitialValues] = useState({
    Title: "",
    Description: "",
    ImageFile: "",
    Cuisine: "",
    Category: "",
  });
  const allRestaurants = useSelector((state) => state.restaurants.data);
  const [count, setCount] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {}, [count]);

  useEffect(() => {
    getPlan(restaurantId);
  }, [restaurantId]);

  useEffect(() => {
    fetchCuisines();
    fetchCategories();
    fetchItems();
  }, []);

  const fetchCuisines = async () => {
    try {
      const { data: res } = await api.get(API_URLS.cuisine.list);
      setCuisines(res);
    } catch (ex) {
      console.error("Error in fetching cuisines", ex.message);
    }
  };
  const fetchCategories = async () => {
    try {
      const { data: res } = await api.get(API_URLS.category.list);
      setCategories(res);
    } catch (ex) {
      console.error("Error in fetching cuisines", ex.message);
    }
  };

  const fetchItems = async () => {
    try {
      if (!restaurantId) {
        return false;
      }
      const { data: res } = await api.get(
        API_URLS.restaurants.items(restaurantId)
      );
      if (res && res.foodDetails) {
        setItems(res.foodDetails);
      }
    } catch (ex) {
      console.error("Error in fetching restuarant items", ex.message);
      setItems([]);
    }
  };

  const getPlan = (restaurantId) => {
    if (!restaurantId) {
      return false;
    }
    try {
      const diet = allRestaurants.find((f) => f.Id == restaurantId);
      setInitialValues({
        Name: diet.Name,
        Description: diet.Description,
        Image: diet.Image,
        Cuisine: diet.Cuisine,
        Category: diet.Category,
      });
      setNumOfDays(diet.duration);
    } catch (ex) {
      console.error(ex.message);
    }
  };

  const savePlan = async (planPostData) => {
    try {
      planPostData.Id = restaurantId;
      let planFormData = new FormData();
      for (let key in planPostData) {
        planFormData.append(key, planPostData[key]);
      }
      const { data } = await apiFormData.post(
        API_URLS.restaurants.update,
        planFormData
      );
      if (data) {
        setRestaurantId(data);
        toast.success("Restaurant saved");
      } else {
        toast.error("Something went wrong. Try again");
      }
    } catch (ex) {
      throw ex;
    }
  };

  const getPreview = () => {
    try {
      if (restaurantId) {
        return initialValues.Image
          ? `${process.env.REACT_APP_IMAGES_URL}${initialValues.Image}`
          : CARD_PLACEHOLDER_IMAGE;
      }
    } catch (ex) {}
  };
  const handleFoodAdd = () => {
    setIsOpen(false);
    fetchItems();
  };
  const handleFoodDelete = () => {
    fetchItems();
  };
  const handleFoodEdit = (food) => {
    setIsOpen(true);
    setSelectedFood(food);
  };

  return (
    <div className={styles.base}>
      <Formik
        onSubmit={async (values) => {
          try {
            toast("Saving restaurant");
            const planPostData = {
              ...values,
            };
            delete planPostData.Image;
            await savePlan(planPostData);
          } catch (ex) {
            toast.error(ex.message);
            console.error(ex.message);
          }
        }}
        validationSchema={validationSchema}
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
                  error={touched["Name"] && errors["Name"]}
                  name="Name"
                  size="lg"
                  as="textarea"
                  variant="no-border"
                  value={values["Name"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Restaurant Name"
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
              <section className="d-flex gap-1 align-center">
                <Select
                  previewMode={!editMode}
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
                  previewMode={!editMode}
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
              </section>
            </form>
          );
        }}
      </Formik>
      <section className={styles.foods}>
        {items?.map((m) => (
          <FoodCard
            viewOnly={!editMode}
            data={m}
            key={m.Id}
            onDelete={handleFoodDelete}
            onEdit={() => handleFoodEdit(m)}
          />
        ))}

        {editMode && (
          <div className={styles.btn_add}>
            <IconButton size="lg" onClick={handleOpen}>
              <Plus />
            </IconButton>
            <Typography variant="label">Add Item</Typography>
          </div>
        )}
        <GridFiller />
      </section>
      <Modal isOpen={isOpen} size="lg" onClose={() => setIsOpen(false)}>
        <SelectFood
          onFoodAdd={handleFoodAdd}
          onClose={() => setIsOpen(false)}
          restaurantId={restaurantId}
          selectedFood={selectedFood}
        />
      </Modal>
    </div>
  );
};

export default React.memo(RestaurantForm);
