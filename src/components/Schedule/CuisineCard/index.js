import Typography from "components/Typography";
import styles from "./CuisineCard.module.scss";

const CuisineCard = ({ label }) => {
  return (
    <div className={styles.base}>
      {/* <img
        src="https://emangoz.com/wp-content/uploads/2017/04/ALPHONSO-MANGOES-min.png"
        alt="Cuisine"
      /> */}
      <Typography variant="label_bold">{label}</Typography>
    </div>
  );
};

export default CuisineCard;
