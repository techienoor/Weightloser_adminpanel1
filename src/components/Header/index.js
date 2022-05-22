import React, { useEffect } from "react";
import Logo from "icons/Logo";
import { Link } from "react-router-dom";
import Breadcrumb from "icons/Breadcrumb";
import styles from "./Header.module.scss";
import Search from "icons/Search";
import Gear from "icons/Gear";
import AngleDown from "icons/AngleDown";
import Bell from "icons/Bell";
import classNames from "classnames";
import { fetchDiets } from "redux/reducers/diets.reducer";
import { fetchExercises } from "redux/reducers/exercises.reducer";
import { fetchRestaurants } from "redux/reducers/restaurants.reducer";
import { fetchMind } from "redux/reducers/mind.reducer";
import { fetchCBT } from "redux/reducers/mind.reducer";
import { useDispatch } from "react-redux";
import Typography from "components/Typography";
import Button from "components/Button";
import { useSelector } from "react-redux";
import { setUser } from "redux/reducers/user.reducer";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const SearchInput = ({ className, inputRef, ...rest }) => {
  return (
    <div className={classNames(className, styles.search_container)}>
      <Search />
      <input ref={inputRef} {...rest} placeholder="Search..." />
    </div>
  );
};

const Header = ({ toggleSidebar, onSheduleOpen, isSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(fetchDiets());
    dispatch(fetchExercises());
    dispatch(fetchRestaurants());
    dispatch(fetchMind());
    dispatch(fetchCBT());
  }, []);

  const handleLogout = () => {
    dispatch(setUser(null));
    toast.success("You have logged out");
    navigate("/login");
  };

  return (
    <div className={styles.header_container}>
      <Link to="/">
        <span
          className={classNames(
            styles.logo,
            isSidebarOpen ? styles.collapsed : ""
          )}
        >
          <Logo />
        </span>
      </Link>
      <Breadcrumb
        clickable
        onClick={toggleSidebar}
        className={styles.sidebar_toggler}
      />

      {/* <SearchInput className="for-desktop" /> */}

      {user && (
        <div className={classNames(styles.content_right, "for-desktop")}>
          {/* <div className={styles.notifications}>
          <Bell />
          <span>9+</span>
        </div> */}
          <span className={styles.username}>{user.Name || "No name"}</span>
          {/* <AngleDown className={styles.profile_toggler} clickable /> */}
          <Button size="sm" onClick={handleLogout}>
            <Typography variant="small">Logout</Typography>
          </Button>
          {/* <Link to="#">
          <Gear clickable />
        </Link> */}
        </div>
      )}
    </div>
  );
};

export default React.memo(Header);
