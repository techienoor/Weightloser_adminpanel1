import React from "react";
import classNames from "classnames";
import styles from "./RestaurantsListing.module.scss";
import RestaurantCard from "../RestaurantCard";
const Typography = React.lazy(() => import("components/Typography"));
const GridFiller = React.lazy(() => import("components/GridFiller"));

const RestaurantsListing = ({ title, data = [] }) => {
  return (
    <>
      <Typography className="mt-3" block variant="body_bold">
        {title}
      </Typography>
      <section className={classNames(styles.diets_listing_container)}>
        {data.map((m, index) => (
          <RestaurantCard key={m.Id || index} diet={m} />
        ))}
        {data.length ? (
          <GridFiller />
        ) : (
          <Typography className="d-block text-center text-disabled">
            No restaurants added
          </Typography>
        )}
      </section>
    </>
  );
};

export default RestaurantsListing;
