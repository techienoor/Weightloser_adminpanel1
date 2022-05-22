import { useEffect, useState } from "react";
import Typography from "components/Typography";
import styles from "./Transactions.module.scss";
import Table, { Badge, Rating } from "components/Table";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import Button from "components/Button";
import dayjs from "dayjs";
import { setShowForm } from "redux/reducers/schedule.reducer";
import { useDispatch } from "react-redux";
import { MODULES } from "components/Schedule";

const Transactions = () => {
  const dispatch = useDispatch();
  const columns = [
    {
      dataKey: "userId",
      title: "USER ID",
      render: ({ userId }) => <span>#SK{userId}</span>,
    },
    {
      dataKey: "CardHolderName",
      title: "Name",
    },
    {
      title: "Date",
      render: (data) => {
        return <span>{dayjs(data.startDate).format("DD MMM, YYYY")}</span>;
      },
    },
    {
      dataKey: "PackageName",
      title: "Plan",
    },
    {
      title: "Payment Status",
      render: (data) => <Badge status={data.PackageStatus} />,
    },
    {
      dataKey: "PackageDuration",
      title: "Duration",
    },
    {
      title: "Action",
      class: "text-center",
      render: () => {
        return (
          <Button size="sm">
            <Typography variant="small">View Details</Typography>
          </Button>
        );
      },
    },
  ];
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data: res } = await api.get(API_URLS.dashboard.transactions);
      if (res && res.paymentVMs) {
        setData(res.paymentVMs);
      }
    } catch (ex) {
      console.error("Error in fetching dashboard transactions", ex.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (data) => {
    dispatch(
      setShowForm({
        visibility: true,
        module: MODULES.DIET,
        userId: data.userId,
      })
    );
  };

  return (
    <div className={styles.container_transactions}>
      <Typography variant="body_bold" block className="mb-2">
        Latest Transactions
      </Typography>
      <Table
        onRowClick={handleRowClick}
        selectable
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default Transactions;
