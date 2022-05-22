import Typography from "components/Typography";
import MindCard from "../MindCard";
import styles from "./MindListing.module.scss";

const MindListing = ({ title, counts, className, withCoverage, data = [] }) => {
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
            <MindCard withCoverage={withCoverage} data={m} />
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

export default MindListing;
