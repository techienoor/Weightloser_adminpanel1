import { useState, useEffect } from "react";
import Typography from "components/Typography";
import styles from "./TopCities.module.scss";
import Location from "icons/Location";
import Stats from "./Stats";
import ArrowRightAltSvg from "assets/svg/ArrowRightAlt";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const TopCities = () => {
  const [counts, setCounts] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchCounts = async () => {
    try {
      let { data: res } = await api.get(API_URLS.dashboard.customerCounts);
      if (res && res.users) {
        res.users.sort((a, b) => {
          return b.TotalUsers - a.TotalUsers;
        });
        res.users = res.users.filter((f) => f.Country);
        const numbers = res.users.map((m) => m.TotalUsers);
        setTotal(
          numbers.reduce((total, sum) => {
            return total + sum;
          })
        );
        setCounts(res.users);
      }
    } catch (ex) {
      console.error("Error in fetching cities customers counts", ex.message);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);
  return (
    <div className={styles.container__top_cities}>
      <Typography block variant="body_bold">
        Top Countries With Customers
      </Typography>
      <Location className="text-center" />
      {counts && counts.length && (
        <div className="text-center">
          <Typography variant="h3" block>
            {Number(counts[0].TotalUsers).toLocaleString()}
          </Typography>
          <Typography variant="label" dark>
            {counts[0].Country}
          </Typography>
        </div>
      )}
      {counts.map((m) => (
        <Stats
          key={m.Country}
          count={m.TotalUsers}
          title={m.Country}
          total={total}
        />
      ))}
      {/* <ArrowRightAltSvg className="text-center" /> */}
    </div>
  );
};

export default TopCities;
