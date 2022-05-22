import { useState, useEffect } from "react";
import Typography from "components/Typography";
import Status from "./Status";
import Statistics from "./Statistics";
import CustomerSvg from "assets/svg/Customer.svg";
import RevenueSvg from "assets/svg/Revenue.svg";
import RatingSvg from "assets/svg/Rating.svg";
import styles from "./Dashboard.module.scss";
import Earnings from "./Earnings";
import Social from "./Social";
import Activities from "./Activities";
import TopCities from "./TopCities";
import CustomerProgression from "./CustomerProgression";
import Transactions from "./Transactions";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    userCount: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  });

  const getCounts = async () => {
    try {
      const { data: res } = await api.get(API_URLS.dashboard.counts);
      if (res) {
        setCounts(res);
      }
    } catch (ex) {
      console.error("Error in fetching the dashboard counts", ex.message);
    }
  };

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <>
      <Typography className="mb-2" block>
        DASHBOARD
      </Typography>
      <div className={styles.section_bio}>
        <div className={styles.left}>
          <Status />
          <Earnings count={counts.totalRevenue || 0} />
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <Statistics
              title="Customers"
              icon={CustomerSvg}
              count={counts.userCount || 0}
            />
            <Statistics
              title="Revenue"
              icon={RevenueSvg}
              count={counts.totalRevenue || 0}
              currency
            />
            <Statistics title="Rating" icon={RatingSvg} count={4.9} />
          </div>
          <CustomerProgression />
        </div>
      </div>
      <div className={styles.bottom}>
        <Social />
        {/* <Activities /> */}
        <TopCities />
      </div>
      <Transactions />
    </>
  );
};

export default Dashboard;
