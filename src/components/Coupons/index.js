import React, { useState, useEffect } from "react";
import CouponsListing from "./CouponsListing";
import Card from "components/Card";
import Typography from "components/Typography";
import Button from "components/Button";
import styles from "./Coupons.module.scss";
import Modal from "components/Modal";
import DietForm from "./CouponForm";
import { useDispatch, useSelector } from "react-redux";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
const Label = React.lazy(() => import("components/Diets/DietLabel"));

const Coupons = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data: res } = await api.get(API_URLS.coupons.dashboard);
        setDashboard(res);
      } catch (ex) {
        console.error("Error in fetching coupons dashboard", ex.message);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <>
      <Typography variant="body_bold" className="mb-2" block>
        Coupons
      </Typography>
      <Card className="mb-2">
        <div className={styles.base}>
          <div className={styles.left}>
            <Button onClick={() => setIsFormOpen(true)}>
              <Typography>Create New Coupon</Typography>
            </Button>
            {/* <Button outlined>
              <Typography>Edit Coupon</Typography>
            </Button> */}
          </div>
          <div className={styles.right}>
            <Label title="Total Coupons" count={dashboard.total || 0} />
            <Label title="Active Coupons" count={dashboard.active || 0} />
            <Label
              title="Inactive Coupons"
              count={(dashboard.total || 0) - (dashboard.active || 0)}
            />
          </div>
        </div>
      </Card>
      <CouponsListing />
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} size="xs">
        <DietForm onClose={() => setIsFormOpen(false)} />
      </Modal>
    </>
  );
};

export default Coupons;
