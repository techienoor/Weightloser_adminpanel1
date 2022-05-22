import React from "react";
import classNames from "classnames";
import styles from "./DietsListing.module.scss";
import DietCard from "../DietCard";
import ListPlaceholder from "components/ListPlaceholder";
const Typography = React.lazy(() => import("components/Typography"));
const GridFiller = React.lazy(() => import("components/GridFiller"));

const DietsListing = ({ title, data = [] }) => {
  return (
    <>
      <Typography className="mt-3" block variant="body_bold">
        {title}
      </Typography>
      <section className={classNames(styles.diets_listing_container)}>
        {data.map((m, index) => (
          <DietCard key={m.Id || index} diet={m} />
        ))}
        {data.length ? (
          <GridFiller />
        ) : (
          <ListPlaceholder text="No diets added" />
        )}
      </section>
    </>
  );
};

export default DietsListing;
