import Typography from "components/Typography";
import GridFiller from "components/GridFiller";
import CBTCard from "../CBTCard";
import ListPlaceholder from "components/ListPlaceholder";
import styles from "components/Mind/MindsListing.module.scss";

const CBTListing = ({ title, data = [] }) => {
  return (
    <>
      <Typography className="mt-3" block variant="body_bold">
        {title}
      </Typography>
      <section className={styles.minds_listing_container}>
        {data && data.length ? (
          <>
            {data.map((m) => (
              <CBTCard key={m.Id} mind={m} />
            ))}
            <GridFiller />
          </>
        ) : (
          <ListPlaceholder text="No data added" />
        )}
      </section>
    </>
  );
};

export default CBTListing;
