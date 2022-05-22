import React, { useState } from "react";
import styles from "./CouponCard.module.scss";
import Edit from "icons/Edit";
import Modal from "components/Modal";
import CouponForm from "../CouponForm";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

const CouponCard = ({ data = {} }) => {
  const dispatch = useDispatch();
  const {
    Id,
    Number,
    Amount,
    Percent,
    DiscountAmount,
    CreatedAt,
    ExpireDate,
    FileName,
  } = data;
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className={styles.base}>
      <Edit
        className={styles.icon_edit}
        clickable
        onClick={() => dispatch(setIsFormOpen(true))}
      />
      <img
        src={`${process.env.REACT_APP_IMAGES_URL}${FileName}`}
        onError={(el) => {
          el.target.src = CARD_PLACEHOLDER_IMAGE;
        }}
      />
      <h4 className={styles.title}>Instagram Influencer</h4>
      <div className={styles.code}>
        Code: <span>{Number}</span>
      </div>
      <div className={styles.date}>
        Started from :{" "}
        {CreatedAt ? dayjs(CreatedAt).format("DD/MM/YYYY") : "N/A"}
      </div>
      <div className={styles.date}>
        Expiers on :{" "}
        {ExpireDate ? dayjs(ExpireDate).format("DD/MM/YYYY") : "N/A"}
      </div>
      <div className={styles.traffic}>Traffic from the coupon : {Amount}</div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <CouponForm couponId={Id} onClose={() => setIsFormOpen(false)} />
      </Modal>
    </div>
  );
};

export default CouponCard;
