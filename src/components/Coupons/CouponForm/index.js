import React, { useState, useEffect } from "react";
import Input from "components/Input";
import styles from "./CouponForm.module.scss";
// import ImageUploader from "./ImageUploader";
// import Select from "components/Select";
import Typography from "components/Typography";
import classNames from "classnames";
import { Formik } from "formik";
import Button from "components/Button";
import toast from "react-hot-toast";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fetchCoupons } from "redux/reducers/coupons.reducer";
import UserSearch from "./UserSearch";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  Percent: Yup.number("Invalid value").required("Required"),
  ExpireDate: Yup.date().required("Required"),
  Name: Yup.string().required("Required"),
});

const CouponForm = ({ couponId, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    Name: "",
    Percent: "",
    ExpireDate: "",
  });

  useEffect(() => {
    if (couponId) {
      (async () => {
        try {
          const { data: res } = await api.get(
            API_URLS.coupons.getById(couponId)
          );
          if (res) {
            setInitialValues({
              Name: res.Name,
              Percent: res.Percent,
              ExpireDate: res.ExpireDate
                ? dayjs(res.ExpireDate).format("YYYY-MM-DD")
                : "",
              Number: res.Number,
              CreatedAt: res.CreatedAt
                ? dayjs(res.CreatedAt).format("YYYY-MM-DD")
                : "",
              UserId: res.UserId,
            });
          }
        } catch (ex) {}
      })();
    }
  }, [couponId]);

  const Edited = ({ children }) => {
    if (!couponId) {
      return null;
    }
    return <>{children}</>;
  };

  const save = async (values, resetForm) => {
    try {
      setLoading(true);
      const postData = {
        UserId: values.UserId,
        Name: values.Name,
        Percent: values.Percent,
        ExpireDate: values.ExpireDate,
      };
      const { data } = await api.post(API_URLS.coupons.create, postData);
      if (data) {
        toast.success("Coupon saved");
        dispatch(fetchCoupons());
        resetForm();
        onClose();
      } else {
        toast.error("Something went wrong. Try again");
      }
    } catch (ex) {
      toast.error(ex.message);
      console.error(ex.message);
    } finally {
      setLoading(false);
    }
  };

  const update = async (values, resetForm) => {
    try {
      setLoading(true);
      const postData = {
        ...values,
        Id: couponId,
      };
      const { data } = await api.post(API_URLS.coupons.update, postData);
      if (data) {
        toast.success("Coupon updated");
        dispatch(fetchCoupons());
        resetForm();
        onClose();
      } else {
        toast.error("Something went wrong. Try again");
      }
    } catch (ex) {
      toast.error(ex.message);
      console.error(ex.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.base}>
      <Formik
        onSubmit={async (values, { resetForm }) => {
          if (!couponId) {
            await save(values, resetForm);
          } else {
            await update(values, resetForm);
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
            <form
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if ((e.charCode || e.keyCode) === 13) {
                  e.preventDefault();
                }
              }}
            >
              <section className={styles.section_top}>
                {/* <ImageUploader /> */}
                <div className={styles.inputs}>
                  <Input
                    error={touched["Name"] && errors["Name"]}
                    name="Name"
                    value={values["Name"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Coupon Name"
                  />
                  {!couponId && (
                    <UserSearch
                      setSelectedUser={(user) =>
                        setFieldValue("UserId", user.Id)
                      }
                      placeholder="Owner Name"
                    />
                  )}
                </div>
                {/* <div className={styles.selects}>
                  <Select placeholder="Category" />
                  <Select
                    name="Type"
                    value={values["Type"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Type"
                  />
                </div> */}
              </section>
              <section>
                <Typography variant="body_bold" className="mb-1" block>
                  Time
                </Typography>
                <div className={styles.parameters}>
                  <Edited>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                      name="CreatedAt"
                      value={values["CreatedAt"]}
                      error={touched["CreatedAt"] && errors["CreatedAt"]}
                      placeholder="Start Date"
                      type="date"
                    />
                  </Edited>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="ExpireDate"
                    value={values["ExpireDate"]}
                    error={touched["ExpireDate"] && errors["ExpireDate"]}
                    placeholder="Expiry Date"
                    type="date"
                  />
                  <Edited>
                    <Input
                      disabled
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="Number"
                      value={values["Number"]}
                      error={touched["Number"] && errors["Number"]}
                      placeholder="Coupon Code"
                    />
                  </Edited>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="Percent"
                    value={values["Percent"]}
                    error={touched["Percent"] && errors["Percent"]}
                    placeholder="Percent Off"
                    type="number"
                  />
                </div>
                <div className={classNames("d-flex gap-1 align-center mb-3")}>
                  <Button disabled={loading} size="sm" type="submit">
                    <Typography variant="small_bold">
                      {loading ? "Please wait..." : "Save Coupon"}
                    </Typography>
                  </Button>
                </div>
              </section>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CouponForm;
