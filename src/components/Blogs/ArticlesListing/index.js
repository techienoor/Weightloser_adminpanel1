import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard";
import styles from "./ArticlesListing.module.scss";
import Typography from "components/Typography";
import { API_URLS } from "utils/API_URLS";
import api from "api/RequestInterceptor";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrendingBlogs } from "redux/reducers/blogs.reducer";
import GridFiller from "components/GridFiller";
import ListPlaceholder from "components/ListPlaceholder";

const ArticlesListing = ({ search }) => {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.blogs.trending);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchTrendingBlogs());
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
        Trending Articles
      </Typography>
      {filteredData?.length ? (
        <div className={styles.base}>
          {filteredData.map((m) => (
            <ArticleCard key={m.Id} data={m} />
          ))}
          <GridFiller />
        </div>
      ) : (
        <ListPlaceholder text="No data available" />
      )}
    </>
  );
};

export default ArticlesListing;
