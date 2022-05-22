import React, { useState } from "react";
import ImageUploader from "components/molecules/ImageUploader/Vertical";
import styles from "./AddEditForm.module.scss";
import Typography from "components/Typography";
import Input from "components/Input";
import Select from "components/Select";
import Button from "components/Button";
import Switch from "components/Switch/Switch";
import { confirmAlert } from "react-confirm-alert";
import { Formik } from "formik";
import * as Yup from "yup";
import api, { apiFormData } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import toast from "react-hot-toast";

const DEPS = [{ Name: "Nutrition" }, { Name: "Technician" }];

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Required"),
  Department: Yup.string().required("Required"),
  Code: Yup.string().required("Required"),
  Email: Yup.string().email("Invalid email").required("Required"),
  Password: Yup.string().required("Password"),
});

const Clearance = ({ label, onChange = () => {}, checked }) => {
  const handleChange = (e) => {
    onChange(label, e.target.checked);
  };

  return (
    <div className={styles["clearance-base"]}>
      <Typography>{label}</Typography>
      <Switch onChange={handleChange} checked={checked} />
    </div>
  );
};

export const handleDelete = async (Id, onSave = () => {}) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      const onDelete = async () => {
        try {
          const { data } = await api.delete(API_URLS.staff.delete(Id));
          if (data) {
            toast.success("Staff deleted successfully");
            onClose();
            onSave();
          }
        } catch (ex) {
          toast.error(ex.message);
        }
      };
      return (
        <div className={styles.confirmation}>
          <Typography variant="body_bold" block className="mb-2">
            Attention!
          </Typography>
          <Typography block className="mb-2">
            Are you sure you want to delete the user?
          </Typography>
          <div className={styles.actions}>
            <Button onClick={onClose} variant="default" size="sm" outlined>
              <Typography variant="small">No</Typography>
            </Button>
            <Button variant="danger" outlined size="sm" onClick={onDelete}>
              <Typography variant="small">Yes</Typography>
            </Button>
          </div>
        </div>
      );
    },
  });
};

const AddEditForm = ({ staff, onSave = () => {} }) => {
  let staffId;
  if (staff) {
    staffId = staff.Id;
  }
  const roles = [
    { title: "Diet" },
    { title: "Exercise" },
    { title: "Mind" },
    { title: "Questions" },
    { title: "Blogs" },
    { title: "Staff" },
    { title: "Coupons" },
    { title: "Customers" },
    { title: "Chat" },
    { title: "Restaurants" },
  ];
  const [loading, setLoading] = useState(false);
  const getRoles = () => {
    try {
      if (staff) {
        if (typeof JSON.parse(staff.Roles) == "object")
          return JSON.parse(staff.Roles);
        return {};
      }
      return {};
    } catch (ex) {
      return {};
    }
  };
  const defaultValues = {
    Name: staff?.Name || "",
    Email: staff?.Email || "",
    Password: staff?.Password || "",
    Code: staff?.Code || "",
    Department: staff?.Department || "",
    Preview: staff?.ImageFile || null,
    Roles: getRoles(),
  };
  const [initialValues, setInitialValues] = useState(defaultValues);

  return (
    <div className={styles.base}>
      <Typography variant="body_bold">
        {staffId ? "Edit" : "Add"} Staff Member
      </Typography>
      <Formik
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const postData = { ...values };
            postData.Roles = JSON.stringify(postData.Roles);
            const formData = new FormData();
            for (let key in postData) {
              formData.append(key, postData[key]);
            }
            let url = API_URLS.staff.create;
            if (staffId) {
              url = API_URLS.staff.update;
              formData.append("Id", staffId);
            }
            const { data } = await apiFormData.post(url, formData);
            if (data && data.response) {
              toast.success(data.response);
              onSave();
            }
          } catch (ex) {
            toast.error(ex.message);
          } finally {
            setLoading(false);
          }
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          setFieldValue,
          errors,
          touched,
        }) => {
          const handleRoleChange = (title, checked) => {
            setFieldValue(`Roles[${title}]`, checked);
          };

          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.top}>
                <ImageUploader
                  forUser
                  setFieldValue={setFieldValue}
                  preview={values.Preview}
                />
                <div className={styles.inputs}>
                  <Input
                    placeholder="Staff Name"
                    name="Name"
                    value={values["Name"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched["Name"] && errors["Name"]}
                  />
                  <Input
                    placeholder="Code"
                    name="Code"
                    value={values["Code"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched["Code"] && errors["Code"]}
                  />
                  <div>
                    <Input
                      placeholder="Email"
                      name="Email"
                      type="email"
                      value={values["Email"]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched["Email"] && errors["Email"]}
                    />
                    <Input
                      placeholder="Password"
                      name="Password"
                      value={values["Password"]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      error={touched["Password"] && errors["Password"]}
                    />
                  </div>
                </div>
                <div className={styles.selects}>
                  <Select
                    placeholder="Department"
                    name="Department"
                    value={values["Department"]}
                    onChange={handleChange}
                    options={DEPS}
                    idParam="Name"
                    onBlur={handleBlur}
                    error={touched["Department"] && errors["Department"]}
                  />
                </div>
                <div className={styles.actions}>
                  <Button disabled={loading} size="sm" type="submit">
                    <Typography variant="small">
                      {loading ? "Please wait..." : "Save"}
                    </Typography>
                  </Button>
                  {staffId && (
                    <Button
                      type="button"
                      onClick={() => handleDelete(staffId, onSave)}
                      size="sm"
                      outlined
                      variant="danger"
                    >
                      <Typography variant="small">Delete</Typography>
                    </Button>
                  )}
                </div>
              </div>

              <div className={styles.roles}>
                <Typography variant="body_bold">Staff Clearance</Typography>

                <div className={styles.list}>
                  {roles.map((m) => (
                    <Clearance
                      key={m.title}
                      label={m.title}
                      checked={values.Roles[m.title]}
                      onChange={handleRoleChange}
                    />
                  ))}
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEditForm;
