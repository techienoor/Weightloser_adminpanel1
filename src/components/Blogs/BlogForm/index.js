import { useEffect, useState } from "react";
import styles from "./BlogForm.module.scss";
import Typography from "components/Typography";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Input from "components/Input";
import Select from "components/Select";
import api, { apiFormData } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import ImageUploader from "components/molecules/ImageUploader/Linear";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "components/Button";
import classNames from "classnames";
import { find, values } from "lodash";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "redux/reducers/blogs.reducer";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";

const validationSchema = Yup.object().shape({
  BlogTypeId: Yup.number("Invalid value").required("Required"),
  Title: Yup.string().required("Required"),
  Description: Yup.string().required("Required"),
  Content: Yup.string().required("Required"),
});

const BlogForm = ({ onClose = () => {}, id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [blogTypes, setBlogTypes] = useState([]);
  const [initialValues, setInitialValues] = useState({
    BlogTypeId: "",
    Title: "",
    Description: "",
    Content: "",
    ImageFile: null,
    Category: "",
  });
  useEffect(() => {
    (async () => {
      const { data: res } = await api.get(API_URLS.blog.types);
      setBlogTypes(res.blogTypes);
    })();
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      if (!id) {
        return false;
      }
      const { data: res } = await api.get(API_URLS.blog.getById(id));
      if (res) {
        setInitialValues({
          BlogTypeId: res.BlogTypeId,
          Title: res.Title,
          Description: res.Description,
          Content: res.Content,
          FileName: res.FileName,
          Category: res.Category,
        });
      }
    } catch (ex) {
      console.error("Error in fetching blog details", ex.message);
    }
  };

  const save = async (values, resetForm = () => {}) => {
    try {
      setLoading(true);
      let url = API_URLS.blog.create;
      const postData = {
        ...values,
        Category: find(blogTypes, (e) => e.Id == values.BlogTypeId)?.Name,
      };
      if (id) {
        postData.Id = id;
        url = API_URLS.blog.update;
      }
      const formData = new FormData();
      for (let key in postData) {
        formData.append(key, postData[key]);
      }
      const { data: res } = await apiFormData.post(url, formData);
      if (res) {
        toast.success("Blog has been saved");
        dispatch(fetchBlogs());
        resetForm();
        onClose();
      } else {
        toast.error("An error occurred, Try again");
      }
    } catch (ex) {
      console.error(ex.message);
      toast.error(ex.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.base}>
      <Typography variant="body_bold" block className="mb-1">
        Blog
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={async (values) => {
          try {
            await save(values);
          } catch (ex) {}
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          handleBlur,
          touched,
          setFieldValue,
        }) => {
          const getPreview = () => {
            if (values.FileName) {
              return process.env.REACT_APP_IMAGES_URL + values.FileName;
            }
            return CARD_PLACEHOLDER_IMAGE;
          };
          return (
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <ImageUploader
                  preview={getPreview()}
                  setFieldValue={setFieldValue}
                  error={touched["ImageFile"] && errors["ImageFile"]}
                />
              </div>
              <div className="d-flex mb-1 gap-1">
                <Input
                  placeholder="Blog Title"
                  name="Title"
                  value={values["Title"]}
                  error={touched["Title"] && errors["Title"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Select
                  placeholder="Category"
                  options={blogTypes}
                  name="BlogTypeId"
                  value={values["BlogTypeId"]}
                  error={touched["BlogTypeId"] && errors["BlogTypeId"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="mb-2">
                <Input
                  error={touched["Description"] && errors["Description"]}
                  placeholder="Description"
                  name="Description"
                  value={values["Description"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className={classNames(styles.container_editor, "mb-2")}>
                <CKEditor
                  editor={ClassicEditor}
                  data={values.Content}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setFieldValue("Content", data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              </div>
              <div>
                <Button disabled={loading} type="submit" size="sm">
                  <Typography variant="body_bold">
                    {loading ? "Please wait..." : "Save Blog"}
                  </Typography>
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BlogForm;
