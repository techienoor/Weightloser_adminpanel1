import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Button from "components/Button";
import Typography from "components/Typography";
import Card from "components/Card";
import styles from "./Exercises.module.scss";
import { SearchInput } from "components/Header";
import ExerciseForm from "./ExerciseForm";
import Modal from "components/Modal";
import api, { getImage } from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  fetchExercises,
  setShowAddForm,
} from "redux/reducers/exercises.reducer";
import GridFiller from "components/GridFiller";
import EditForm from "./ExerciseForm/EditForm";
import ListPlaceholder from "components/ListPlaceholder";
import { get } from "lodash";
import ExerciseLabel from "components/Diets/DietLabel";
import ContextMenu from "components/molecules/ContextMenu";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";

const EXERCISE_CARD_IMAGE_THUMBNAIL =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const exercises = [
  {
    title: "Total Exercises",
    count: 103,
    key: "totalExercise",
  },
  {
    title: "Exercises Being Followed",
    count: 81,
    key: "followedPlans",
  },
  {
    title: "Keto Exercises",
    count: 81,
    key: "Cuisine.Test",
  },
  {
    title: "Keto Exercises",
    count: 81,
    key: "Cuisine.Test",
  },
  {
    title: "Keto Exercises",
    count: 81,
    key: "Cuisine.Test",
  },
  {
    title: "Active Exercises",
    count: 99,
    key: "activePlans",
  },
  {
    title: "In-Active Exercises",
    count: 4,
    key: "inActivePlans",
  },
  {
    title: "Vegan Exercises",
    count: 4,
    key: "Cuisine.Vegan",
  },
  {
    title: "Vegetarian Exercises",
    count: 4,
    key: "Cuisine.Vegeterian",
  },
  {
    title: "Vegan Exercises",
    count: 4,
  },
];

const ExerciseCard = ({ exercise = {} }) => {
  const dispatch = useDispatch();
  const [counts, setCounts] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    confirmAlert({
      title: "Delete Exercise",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const { data: res } = await api.post(
                API_URLS.exercise.delete(exercise.Id)
              );
              if (res) {
                toast.success("Exercise deleted successfully");
                setIsDeleted(true);
              } else {
                toast.error("An unknow error occurred!");
              }
            } catch (ex) {
              console.error("Error in deleting exercise", ex.message);
              toast.error(ex.message);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const getCounts = useCallback(async () => {
    const { data } = await api.get(API_URLS.exercise.getCounts(exercise.Id));
    if (data) {
      setCounts(data.count);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!exercise.Id) {
        return false;
      }
      await getCounts();
    })();
  });

  const handleClick = () => {
    dispatch(
      setShowAddForm({
        visibility: true,
        planId: exercise.Id,
      })
    );
  };
  if (!exercise.Id) {
    return <div></div>;
  }
  if (isDeleted) {
    return null;
  }

  return (
    <div className={styles.exercise_card__base}>
      <ContextMenu>
        <li onClick={handleDelete}>
          <Typography variant="small">Delete</Typography>
        </li>
      </ContextMenu>
      <div className={styles.img_top} onClick={handleClick}>
        <img
          src={getImage(exercise.FileName)}
          onError={(el) => {
            el.target.src = EXERCISE_CARD_IMAGE_THUMBNAIL;
          }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <Typography variant="small" className={styles.title}>
            {exercise.Title || "N/A"}
          </Typography>
          <Typography variant="extra_small" className={styles.duration}>
            {exercise.duration} {exercise.duration > 1 ? "days" : "day"}
          </Typography>
        </div>
        <Typography variant="extra_small" className={styles.follow_label}>
          People following
        </Typography>
        <Typography variant="extra_small" className={styles.follow_counts}>
          {counts}
        </Typography>
      </div>
    </div>
  );
};

const ExercisesListing = ({ title, data = [] }) => {
  return (
    <>
      <Typography className="mt-3" block variant="body_bold">
        {title}
      </Typography>
      <section className={styles.exercises_listing_container}>
        {data && data.length ? (
          <>
            {data.map((m) => (
              <ExerciseCard key={m.Id} exercise={m} />
            ))}
            <GridFiller />
          </>
        ) : (
          <ListPlaceholder text="No exercises added" />
        )}
      </section>
    </>
  );
};

const Exercises = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const allData = useSelector((state) => state.exercises.data);
  const [data, setData] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const searchRef = useRef(null);
  const showEditForm = useSelector((state) => state.exercises.showAddForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExercises());
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (searchRef && searchRef.current) {
      filterData(searchRef.current.value);
    } else {
      setData(allData);
    }
  }, [allData]);

  const filterData = (search) => {
    const filteredData = allData.filter(
      (f) => f.Title?.toLowerCase().trim().indexOf(search?.toLowerCase()) > -1
    );
    setData(filteredData);
  };
  const fetchDashboard = async () => {
    try {
      const { data: res } = await api.get(API_URLS.exercise.dashboard);
      const Cuisine = {};
      if (res) {
        for (let item of res.CuisineCounts) {
          Cuisine[item["Cuisine"]] = item["CuisineCount"];
        }
      }
      setDashboard({ ...res, Cuisine });
    } catch (ex) {
      console.error("Error in fetching exercises dashboard");
    }
  };
  const handleSearchExercises = (e) => {
    filterData(e.target.value);
  };
  const debouncedResults = useMemo(() => {
    return debounce(handleSearchExercises, 500);
  }, [allData]);

  const onModalClose = () => {
    dispatch(setShowAddForm({ visibility: false }));
    dispatch(fetchExercises());
  };

  const onNewModalClose = () => {
    setIsModalVisible(false);
    dispatch(fetchExercises());
  };

  return (
    <>
      <Typography className="mb-2" block>
        Exercise
      </Typography>
      <Card className="mb-2">
        <div className={styles.base}>
          <div className={styles.left}>
            <Button onClick={() => setIsModalVisible(true)}>
              <Typography>Create New Plan</Typography>
            </Button>
            {/* <Button outlined>
              <Typography>Edit Exercise</Typography>
            </Button> */}
          </div>
          <div className={styles.right}>
            {exercises.map((item, index) => (
              <ExerciseLabel
                title={item.title}
                count={get(dashboard, item.key)}
                key={item.title + index}
              />
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className={styles.head}>
          <SearchInput inputRef={searchRef} onChange={debouncedResults} />{" "}
          {/* <Typography variant="body_bold" className="ml-3">
            Sort By
          </Typography> */}
          <Link to="/exercises/stats">
            <Button
              size="sm"
              outlined
              className={styles.btn_stats}
              variant="secondary"
            >
              <Typography variant="small">Stats for Exercise</Typography>
            </Button>
          </Link>
        </div>
        {/* <ExercisesListing title="Top Exercises" /> */}
        <ExercisesListing title="All Exercises" data={data} />
      </Card>

      <Modal isOpen={isModalVisible} onClose={onNewModalClose}>
        <ExerciseForm />
      </Modal>

      <Modal isOpen={showEditForm} onClose={onModalClose} size="lg">
        <EditForm onClose={onModalClose} />
      </Modal>
    </>
  );
};

export default Exercises;
