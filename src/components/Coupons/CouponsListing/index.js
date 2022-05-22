import { useEffect } from "react";
import styles from "./CouponsListing.module.scss";
import CouponCard from "../CouponCard";
import Typography from "components/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons } from "redux/reducers/coupons.reducer";

const CouponsListing = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coupons.data);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, []);

  return (
    <>
      <Typography className="mt-3" block variant="body_bold">
        All Coupons
      </Typography>
      <div className={styles.coupons__listing_container}>
        {data.map((m) => (
          <CouponCard key={m.Id.toString()} data={m} />
        ))}
        {data.length
          ? data.length < 6 &&
            Array.from({ length: 6 }, (_, i) => i + 1).map((m) => (
              <div key={m.toString()}></div>
            ))
          : null}
      </div>
    </>
  );
};

export default CouponsListing;
