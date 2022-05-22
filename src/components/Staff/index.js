import { useState, useEffect } from "react";
import Button from "components/Button";
import Card from "components/Card";
import Typography from "components/Typography";
import styles from "./Staff.module.scss";
import Row from "./Row";
import Modal from "components/Modal";
import AddEditForm from "./AddEditForm/AddEditForm";
import { createRoutesFromChildren } from "react-router";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";

const Staff = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [data, setData] = useState([]);

  const handleAddStaff = () => {
    setSelectedStaff(null);
    setShowForm(true);
  };
  const handleEditStaff = (data) => {
    setSelectedStaff(data);
    setShowForm(true);
  };
  const fetchStaff = async () => {
    try {
      const { data } = await api.get(API_URLS.staff.list);
      setData(data.user);
    } catch (ex) {
      console.error("Error in fetching staff", ex.messaeg);
    }
  };
  const onSave = () => {
    setShowForm(false);
    fetchStaff();
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <>
      <Card className="mb-2">
        <div className={styles.container__actions}>
          <Button onClick={handleAddStaff}>
            <Typography>Add New</Typography>
          </Button>
          {/* <Button outlined>
            <Typography>Action 2</Typography>
          </Button> */}
        </div>
      </Card>
      <Card>
        <div>
          <Typography block className="mb-2" variant="body_bold">
            Nutrition
          </Typography>
          {data?.length ? (
            data.map((m) => (
              <Row
                key={m.Id}
                data={m}
                onEdit={() => handleEditStaff(m)}
                onDelete={onSave}
              />
            ))
          ) : (
            <Typography>No data</Typography>
          )}
        </div>
        {/* <div>
          <Typography block className="mb-2 mt-1" variant="body_bold">
            Technician
          </Typography>
          {Array.from({ length: 2 }, (_, i) => i + 1).map((m) => (
            <Row onEdit={() => handleEditStaff(m)} />
          ))}
        </div> */}
      </Card>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <AddEditForm staff={selectedStaff} onSave={onSave} />
      </Modal>
    </>
  );
};

export default Staff;
