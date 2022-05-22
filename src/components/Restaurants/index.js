import React, { useState, useEffect, useMemo, useRef } from "react";
import Button from "components/Button";
import Typography from "components/Typography";
import styles from "./Restaurants.module.scss";
import { SearchInput } from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  setShowAddForm,
  fetchRestaurants,
} from "redux/reducers/restaurants.reducer";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import NewRestaurantForm from "./RestaurantForm/New";
const Card = React.lazy(() => import("components/Card"));
const Modal = React.lazy(() => import("components/ModalDefault"));
const RestaurantForm = React.lazy(() => import("./RestaurantForm"));
const RestaurantLabel = React.lazy(() => import("./RestaurantLabel"));
const RestaurantsListing = React.lazy(() => import("./RestaurantsListing"));

const Restaurants = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const allData = useSelector((state) => state.restaurants.data);
  const [data, setData] = useState([]);
  const isModalOpen = useSelector((state) => state.restaurants.showAddForm);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    dispatch(fetchRestaurants());
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (searchRef && searchRef.current) {
      filterData(searchRef.current.value);
    } else {
      setData(allData);
    }
  }, [allData]);

  const fetchDashboard = async () => {
    try {
      const { data: res } = await api.get(API_URLS.diet.dashboard);
      setDashboard(res);
    } catch (ex) {
      console.error("Error in fetching diet dashboard", ex.message);
    }
  };
  const filterData = (search) => {
    const filteredData = allData.filter(
      (f) => f.Name.toLowerCase().trim().indexOf(search.toLowerCase()) > -1
    );
    setData(filteredData);
  };

  const handleSearchExercises = (e) => {
    filterData(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearchExercises, 500);
  }, [allData]);

  const onModalClose = () => {
    dispatch(setShowAddForm({ visibility: false }));
    dispatch(fetchRestaurants());
  };
  const onNewModalClose = () => {
    setIsNewModalOpen(false);
  };

  return (
    <>
      <Typography className="mb-2" block>
        Restaurants
      </Typography>
      <Card className="mb-2">
        <div className={styles.base}>
          <div className={styles.left}>
            <Button onClick={() => setIsNewModalOpen(true)}>
              <Typography>Add New</Typography>
            </Button>
            {/* <Button outlined fullWidth>
              <Typography>Edit</Typography>
            </Button> */}
          </div>
          <div className={styles.right}>
            <RestaurantLabel
              title="Total Restaturants"
              count={dashboard.totalRestaurants}
            />
            <RestaurantLabel
              title="Total Recipes"
              count={dashboard.followedPlans}
            />
            <RestaurantLabel
              title="Keto Restaturants"
              count={dashboard.ketoRestaurants}
            />
            <RestaurantLabel
              title="Keto Restaturants"
              count={dashboard.ketoRestaurants}
            />
            <RestaurantLabel
              title="Keto Restaturants"
              count={dashboard.ketoRestaurants}
            />
            <RestaurantLabel
              title="Active Restaturants"
              count={dashboard.activePlans}
            />
            <RestaurantLabel
              title="In-Active Restaturants"
              count={dashboard.inactiveRestaurants}
            />
            <RestaurantLabel
              title="Vegan Restaturants"
              count={dashboard.veganRestaurants}
            />
            <RestaurantLabel
              title="Vegan Restaturants"
              count={dashboard.vegetarianRestaurants}
            />
            <RestaurantLabel
              title="Vegan Restaturants"
              count={dashboard.desiRestaurants}
            />
          </div>
        </div>
      </Card>

      <Card>
        <SearchInput inputRef={searchRef} onChange={debouncedResults} />{" "}
        {/* <Typography variant="body_bold" className="ml-3">
          Sort By
        </Typography> */}
        {/* <RestaurantsListing title="Top Restaurants" /> */}
        <RestaurantsListing title="All Restaurants" data={data} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          dispatch(fetchRestaurants());
          onModalClose();
        }}
      >
        <RestaurantForm />
      </Modal>

      <Modal
        isOpen={isNewModalOpen}
        onClose={() => {
          dispatch(fetchRestaurants());
          onNewModalClose();
        }}
      >
        <NewRestaurantForm />
      </Modal>
    </>
  );
};

export default Restaurants;
