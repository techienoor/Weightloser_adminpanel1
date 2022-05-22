import { useState } from "react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import styles from "./Layout.module.scss";
import classNames from "classnames";
import Modal from "components/Modal";
import Schedule from "components/Schedule";
import { useDispatch, useSelector } from "react-redux";
import { setShowForm } from "redux/reducers/schedule.reducer";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const isScheduleOpen = useSelector((state) => state.schedule.showForm);

  const handleScheduleOpen = () => {
    dispatch(
      setShowForm({
        visibility: true,
      })
    );
  };
  const handleScheduleClose = () => {
    dispatch(
      setShowForm({
        visibility: false,
      })
    );
  };

  return (
    <div>
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onSheduleOpen={handleScheduleOpen}
      />
      <div className={styles.wrapper}>
        <Sidebar
          onSheduleOpen={() => setIsOpen(true)}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={classNames(
            styles.content,
            `${isSidebarOpen ? styles.full : ""}`
          )}
        >
          {children}
        </div>
      </div>
      <Modal isOpen={isScheduleOpen} onClose={handleScheduleClose}>
        <Schedule />
      </Modal>
    </div>
  );
};

export default Layout;
