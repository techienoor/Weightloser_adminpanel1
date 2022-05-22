import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Details.module.scss";
import dayjs from "dayjs";
import Time from "icons/Time";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import { fetchBlogs } from "redux/reducers/blogs.reducer";

const Details = ({ blogId }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.data);
  const data = blogs.find((f) => f.Id == blogId) || {};
  const { Title, Description, CreatedAt, Id, FileName, Content } = data;

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  return (
    <div className={styles.base}>
      <div className={styles.image}>
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}${FileName}`}
          onError={(el) => {
            el.target.src = CARD_PLACEHOLDER_IMAGE;
          }}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{Title}</h2>
        <div className="d-flex gap-1">
          <span className={styles.exercise_label}>Exercise</span>
          <span className={styles.time}>
            <Time />{" "}
            {CreatedAt ? dayjs(CreatedAt).format("MMMM DD, YYYY") : "N/A"}
          </span>
        </div>
        <p className={styles.description}>{Description}</p>
        <p
          className={styles.text_content}
          dangerouslySetInnerHTML={{ __html: Content }}
        ></p>
      </div>
    </div>
  );
};

export default Details;
