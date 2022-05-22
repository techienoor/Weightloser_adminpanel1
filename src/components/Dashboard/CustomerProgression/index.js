import { useEffect, useState } from "react";
import { SearchInput } from "components/Header";
import Typography from "components/Typography";
import styles from "./CustomerProgression.module.scss";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import Table from "components/Table";
import { Rating, Badge } from "components/Table";
import dayjs from "dayjs";
import { setShowForm } from "redux/reducers/schedule.reducer";
import { useDispatch } from "react-redux";
import { MODULES } from "components/Schedule";

const CustomerProgression = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const columns = [
    {
      dataKey: "userId",
      title: "USER ID",
      render: ({ userId }) => <span>#SK{userId}</span>,
    },
    {
      dataKey: "UserName",
      title: "Name",
    },
    {
      dataKey: "Email",
      title: "Email",
    },
    {
      title: "Joining Date",
      render: (data) => {
        return <span>{dayjs(data.JoiningDate).format("DD MMM, YYYY")}</span>;
      },
    },
    {
      dataKey: "PackageName",
      title: "Plan",
    },
    {
      title: "Status",
      render: (data) => <Badge status={data.PackageStatus} />,
    },
    // {
    //   title: "Rating",
    //   render: (data) => <Rating count={data.Amount} />,
    // },
    {
      title: "Weight Lost",
      render: (data) => <span>{data.StartWeight - data.CurrentWeight} kg</span>,
    },
    {
      dataKey: "PackageDuration",
      title: "Duration",
    },
  ];

  const fetchData = async () => {
    try {
      const { data: res } = await api.get(API_URLS.customer.list);
      if (data) {
        setData(res);
      }
    } catch (ex) {
      console.error("Error in fetching customers list", ex.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((f) => {
        let exists = false;
        for (let item of [
          "userId",
          "UserName",
          "Email",
          "PackageName",
          "PackageStatus",
        ]) {
          if (f[item]?.toString().toLowerCase().indexOf(search) > -1) {
            exists = true;
            break;
          }
        }
        return exists;
      })
    );
  }, [data, search]);

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
    <div className={styles.container__progression}>
      <div className="mb-2 d-flex gap-2">
        <Typography variant="body_bold">Customer Progression</Typography>{" "}
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table
        onRowClick={handleRowClick}
        columns={columns}
        data={filteredData}
      />
    </div>
  );
};

export default CustomerProgression;
