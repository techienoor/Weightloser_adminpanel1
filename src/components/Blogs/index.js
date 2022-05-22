import React, { useState, useMemo } from "react";
import Card from "components/Card";
import Typography from "components/Typography";
import styles from "./Blogs.module.scss";
import Button from "components/Button";
import BlogsListing from "./BlogsListing";
import ArticlesListing from "./ArticlesListing";
import { SearchInput } from "components/Header";
import Modal from "components/Modal";
import BlogForm from "./BlogForm";
import { debounce } from "lodash";
const DietLabel = React.lazy(() => import("components/Diets/DietLabel"));

const diets = [
  {
    title: "Total Blogs",
    count: 103,
  },
  {
    title: "Current Traffic",
    count: 81,
  },
  {
    title: "Fitness Blogs",
    count: 81,
  },
  {
    title: "Exercise Blogs",
    count: 81,
  },
  {
    title: "Yoga Blogs",
    count: 81,
  },
  {
    title: "Active Blogs",
    count: 99,
  },
  {
    title: "Total Traffic",
    count: 4,
  },
  {
    title: "Health Blogs",
    count: 4,
  },
  {
    title: "Meditation Blogs",
    count: 4,
  },
  {
    title: "Diet Blogs",
    count: 4,
  },
];

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearch, 500);
  }, []);
  const handleEditBlog = (id) => {
    setSelectedBlogId(id);
    setShowForm(true);
  };

  return (
    <>
      <Typography className="mb-2" block>
        Blogs
      </Typography>
      <Card className="mb-2">
        <div className={styles.base}>
          <div className={styles.left}>
            <Button onClick={() => setShowForm(true)}>
              <Typography>Create New Blog</Typography>
            </Button>
            {/* <Button outlined>
              <Typography>Edit Blog</Typography>
            </Button> */}
          </div>
          {/* <div className={styles.right}>
            {diets.map((item, index) => (
              <DietLabel
                title={item.title}
                count={item.count}
                key={item.title + index}
              />
            ))}
          </div> */}
        </div>
      </Card>

      <Card>
        <SearchInput onChange={debouncedResults} />{" "}
        {/* <Typography variant="body_bold" className="ml-3">
          Sort By
        </Typography> */}
        {/* <ArticlesListing search={search} /> */}
        <BlogsListing search={search} onEdit={handleEditBlog} />
      </Card>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <BlogForm onClose={() => setShowForm(false)} id={selectedBlogId} />
      </Modal>
    </>
  );
};

export default Blogs;
