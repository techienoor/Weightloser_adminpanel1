import { useEffect, useState } from "react";
import Typography from "components/Typography";
import styles from "./Customers.module.scss";
import Table, { Rating, Badge } from "components/Table";
import IconButton from "components/IconButton";
import ContextAlt from "icons/ContextAlt";
import TrashAlt from "icons/TrashAlt";
import PencilAlt from "icons/PencilAlt";
import { SearchInput } from "components/Header";
import Gear from "icons/Gear";
import classNames from "classnames";
import dayjs from "dayjs";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import { useDispatch } from "react-redux";
import { setShowForm } from "redux/reducers/schedule.reducer";
import { MODULES } from "components/Schedule";
import Message from "icons/Message";

const TableHead = ({ onInputChange = () => {} }) => {
  return (
    <div className={styles.table_head}>
      <Typography variant="body_bold">All Customers</Typography>
      <div>
        <SearchInput onChange={onInputChange} />
        {/* <IconButton>
          <Gear />
        </IconButton>
        <IconButton>
          <ContextAlt />
        </IconButton> */}
      </div>
    </div>
  );
};

const Customers = () => {
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
    {
      title: "Action",
      class: "text-center",
      render: (data) => {
        return (
          <div className={classNames(styles.actions)}>
            <IconButton>
              <Message />
            </IconButton>
            {/* <IconButton>
              <PencilAlt />
            </IconButton>
            <IconButton>
              <TrashAlt />
            </IconButton> */}
          </div>
        );
      },
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
    <>
      <Typography block className="mb-2" variant="body_bold">
        Customers
      </Typography>
      <Table
        onRowClick={handleRowClick}
        fullHeight
        className={styles.container_table}
        columns={columns}
        data={filteredData}
        head={<TableHead onInputChange={(e) => setSearch(e.target.value)} />}
      />
    </>
  );
};

export default Customers;
