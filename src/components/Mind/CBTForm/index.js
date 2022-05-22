import React, { useState, useEffect } from "react";
import Typography from "components/Typography";
import Input from "components/Input";
import styles from "./CBTForm.module.scss";
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
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  Title: Yup.string().required("Required"),
  Duration: Yup.number("Invalid").required("Required"),
});

const CBTForm = ({ onSave = () => {}, dates }) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    Title: "",
    Description: "",
    Duration: "",
    ImageFile: "",
  });

  const saveCbt = async (postData) => {
    try {
      const formData = new FormData();
      for (let key in postData) {
        formData.append(key, postData[key]);
      }
      const { data: res } = await apiFormData.post(
        API_URLS.mind.cbt.create,
        formData
      );
      if (res) {
        toast.success("CBT uploaded successfully");
        onSave();
        return res.vidId;
      }
      return null;
    } catch (ex) {
      throw ex;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          setLoading(true);
          const postData = { ...values };
          if (dates) {
            postData.DateFrom = dates.DateFrom;
            postData.DateTo = dates.DateTo;
          }
          const cbtId = await saveCbt(postData);
        } catch (ex) {
          console.error("Error in saving cbt", ex.mesage);
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
        const handleVideoChange = (file) => {
          if (file) {
            setFieldValue("IvideoFile", file);
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
                    setFieldValue={setFieldValue}
                    error={touched["ImageFile"] && errors["ImageFile"]}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Title"
                    name="Title"
                    value={values["Title"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched["Title"] && errors["Title"]}
                  />
                  <TextArea
                    placeholder="Description"
                    name="Description"
                    value={values["Description"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched["Description"] && errors["Description"]}
                  />
                  <Input
                    placeholder="Duration"
                    type="number"
                    name="Duration"
                    value={values["Duration"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched["Duration"] && errors["Duration"]}
                  />
                  <AVUploader text="Upload File" onChange={handleVideoChange} />
                </div>
              </div>
              <div className={styles.actions}>
                <Button disabled={loading} size="sm">
                  <Typography variant="label">
                    {loading ? "Please wait..." : "Save"}
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

export default CBTForm;
