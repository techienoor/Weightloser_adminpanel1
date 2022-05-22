import React, { useState, useEffect, useRef } from "react";
import Typography from "components/Typography";
import Input from "components/Input";
import styles from "./SelectFood.module.scss";
import classNames from "classnames";
import Button from "components/Button";
import api, { apiFormData, getImage } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import { Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { get, find, update } from "lodash";
import { useSelector } from "react-redux";
import Select from "components/Select";
import ImageUploader from "./ImageUploader";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import TextArea from "components/TextArea";
import { nutritions } from "components/Diets/SelectFood";

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Required"),
  Sugar: Yup.number().required("Required").typeError("Invalid number"),
  Fiber: Yup.number().required("Required").typeError("Invalid number"),
  Sodium: Yup.number().required("Required").typeError("Invalid number"),
  SatFat: Yup.number().required("Required").typeError("Invalid number"),
  Protein: Yup.number().required("Required").typeError("Invalid number"),
  Carbs: Yup.number().required("Required").typeError("Invalid number"),
  Calories: Yup.number().required("Required").typeError("Invalid number"),
  fat: Yup.number().required("Required").typeError("Invalid number"),
  Category: Yup.string().required("Required"),
  // ImageFile: Yup.mixed().required("Required"),
});

const SelectFood = ({
  restaurantId,
  foodId,
  selectedFood,
  onEdit = () => {},
  onFoodAdd = () => {},
  onClose = () => {},
}) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cuisines, setCuisines] = useState([]);
  const [categotries, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    Name: "",
    ImageFile: null,
    ingredients: ["", "", ""],
    Category: "",
    Sugar: "",
    Fiber: "",
    Sodium: "",
    SatFat: "",
    Protein: "",
    Carbs: "",
    Calories: "",
    fat: "",
  });

  useEffect(() => {
    fetchCuisines();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedFood) {
      const itemData = {
        Name: selectedFood.Name,
        FileName: selectedFood.FileName,
        Category: selectedFood.Category,
        Sugar: selectedFood.Sugar,
        Fiber: selectedFood.Fiber,
        Sodium: selectedFood.Sodium,
        SatFat: selectedFood.SatFat,
        Protein: selectedFood.Protein,
        Carbs: selectedFood.Carbs,
        Calories: selectedFood.Calories,
        fat: selectedFood.fat,
      };
      try {
        if (
          selectedFood.Description &&
          JSON.parse(selectedFood.Description) instanceof Array
        ) {
          itemData.ingredients = JSON.parse(selectedFood.Description);
        } else {
          itemData.ingredients = [];
        }
      } catch (ex) {
        itemData.ingredients = [];
      }
      setInitialValues(itemData);
    }
  }, [selectedFood]);

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

  const saveFood = async (values) => {
    try {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      const { data: res } = await apiFormData.post(API_URLS.food.new, formData);
      if (res) {
        if (res.response == "Food already exists") {
          toast.error(res.response);
          return null;
        } else {
          toast("Saving food plan");
          return res.foodId;
        }
      } else {
        toast.error("Some error occurred. Try again!");
      }
    } catch (ex) {
      throw ex;
    }
  };

  const updateFood = async (values) => {
    try {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      const { data: res } = await apiFormData.post(
        API_URLS.food.update,
        formData
      );
      if (res) {
        if (res.response == "Food already exists") {
          toast.error(res.response);
          return null;
        } else {
          toast("Food updated");
          return res;
        }
      } else {
        toast.error("Some error occurred. Try again!");
      }
    } catch (ex) {
      throw ex;
    }
  };

  const getPreview = () => {
    try {
      if (selectedFood) {
        return selectedFood.FileName
          ? `${process.env.REACT_APP_IMAGES_URL}${selectedFood.FileName}`
          : CARD_PLACEHOLDER_IMAGE;
      }
    } catch (ex) {}
  };
  const saveFoodPlan = async (savedFoodId) => {
    try {
      const { data: res } = await api.post(API_URLS.restaurants.addFood, {
        FoodId: savedFoodId,
        RestuarantId: restaurantId,
      });
      if (res) {
        toast.success("Food saved");
        onFoodAdd();
      } else {
        toast.error("An error occurred in saving the food details");
      }
    } catch (ex) {
      throw ex;
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (originalValues) => {
        try {
          setLoading(true);
          let values = { ...originalValues };
          values.ingredients = values.ingredients.filter((f) => f);
          let hasError = false;
          if (!values.ingredients || !values.ingredients.length) {
            hasError = true;
            toast("Please enter ingredients", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
          }
          values.Description = JSON.stringify([...values.ingredients]);
          delete values.ingredients;
          if (hasError) {
            return false;
          }
          if (selectedFood) {
            const res = await updateFood({
              ...values,
              FoodId: selectedFood.FoodId,
            });
            if (res) {
              onFoodAdd();
              // await saveFoodPlan(selectedFood.FoodId);
            }
            return false;
          }
          const savedFoodId = await saveFood(values);
          if (savedFoodId) {
            await saveFoodPlan(savedFoodId);
          }
        } catch (ex) {
          toast.error(ex.message);
          console.error(ex.message);
        } finally {
          setLoading(false);
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
              <div className={styles.actions}>
                <Button
                  outlined
                  type="button"
                  size="sm"
                  onClick={() => setPreviewMode((prev) => !prev)}
                >
                  <Typography variant="small">
                    {previewMode ? "Close Preview" : "Preview"}
                  </Typography>
                </Button>
                <Button size="sm">
                  <Typography variant="small">Save Food</Typography>
                </Button>
              </div>
              <div>
                <>
                  <div className={styles.food}>
                    <div className={styles.image}>
                      {/* <img
                        src={getImage(selectedFood?.FileName)}
                        onError={(e) => {
                          e.target.src =
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWmK9tzl5QZD04ETOLral5SFLaYOa3l4-roU7ncpGGfmnAvhR55QPUjCAPZBnF-t6hIcA&usqp=CAU";
                        }}
                      /> */}
                      <ImageUploader
                        viewOnly={previewMode}
                        preview={getPreview()}
                        setFieldValue={setFieldValue}
                        error={touched["ImageFile"] && errors["ImageFile"]}
                      />
                    </div>
                    <div className={classNames(styles.item)}>
                      <TextArea
                        previewMode={previewMode}
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched["Name"] && errors["Name"]}
                        name="Name"
                        value={values.Name}
                      />
                      <Select
                        previewMode={previewMode}
                        placeholder="Category"
                        options={categotries}
                        name="Category"
                        idParam="Name"
                        value={values["Category"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched["Category"] && errors["Category"]}
                      />
                    </div>
                  </div>

                  <div className={styles.nutrition}>
                    <Typography variant="body_bold">Nutrition Info</Typography>
                    {nutritions.map((m) => (
                      <Input
                        previewMode={previewMode}
                        previewWithLabel
                        key={m.title}
                        value={values[m.name]}
                        onChange={handleChange}
                        name={m.name}
                        onBlur={handleBlur}
                        error={touched[m.name] && errors[m.name]}
                        placeholder={m.title}
                        type="number"
                      />
                    ))}
                  </div>
                  <div className={styles.meta}>
                    <div className={classNames(styles.ingredients)}>
                      <Typography variant="body_bold">Ingredients</Typography>
                      <div>
                        {values["ingredients"].map((m, i) => (
                          <Input
                            previewMode={previewMode}
                            placeholder="Enter some description"
                            name={values["ingredients"][i]}
                            key={i.toString()}
                            onChange={(e) =>
                              setFieldValue(`ingredients[${i}]`, e.target.value)
                            }
                            value={m}
                          />
                        ))}
                        {!previewMode && (
                          <Button
                            size="sm"
                            type="button"
                            shape="rect"
                            onClick={() =>
                              setFieldValue("ingredients", [
                                ...values["ingredients"],
                                "",
                              ])
                            }
                          >
                            <Typography variant="label_bold">
                              Add Ingredient
                            </Typography>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default SelectFood;
