import { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import styles from "./BlogsListing.module.scss";
import Typography from "components/Typography";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "redux/reducers/blogs.reducer";
import ListPlaceholder from "components/ListPlaceholder";
import GridFiller from "components/GridFiller";

const BlogsListing = ({ search, onEdit = () => {} }) => {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.blogs.data);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    setData(
      allData.filter(
        (f) => f.Title.toLowerCase().indexOf(search.toLowerCase()) > -1
      )
    );
  }, [search]);

  const filteredData = !search ? allData : data;

  return (
    <>
      <Typography className="mt-3" block variant="body_bold">
        All
      </Typography>
      {filteredData?.length ? (
        <div className={styles.base}>
          {filteredData.map((m) => (
            <BlogCard key={m.Id} data={m} onEdit={() => onEdit(m.Id)} />
          ))}
          <GridFiller />
        </div>
      ) : (
        <ListPlaceholder text="No data available" />
      )}
    </>
  );
};

export default BlogsListing;
