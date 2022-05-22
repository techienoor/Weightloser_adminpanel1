import Typography from "components/Typography";
import RestaurantCard from "../RestaurantCard";
import styles from "./RestaurantListing.module.scss";

const RestaurantListing = ({ title, counts, className, data = [] }) => {
  return (
    <div className={className}>
      <Typography variant="body_bold" block className="mb-1">
        {title}
      </Typography>
      {!data.length ? (
        <Typography>No data</Typography>
      ) : (
        <div className={styles.list}>
          {data.map((m) => (
            <RestaurantCard data={m} />
          ))}
          {counts < 6 &&
            Array.from({ length: 6 }, (_, i) => i + 1).map((m) => (
              <div key={m}></div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantListing;
