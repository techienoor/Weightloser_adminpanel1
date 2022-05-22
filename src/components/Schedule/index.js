import { useState, useEffect } from "react";
import styles from "./Schedule.module.scss";
import PersonAlt from "icons/PersonAlt";
import Typography from "components/Typography";
import Tabs from "./Tabs";
import PlanCard from "./PlanCard";
import Calendar from "components/Calendar";
import { useSelector } from "react-redux";
import BlogCard from "components/Blogs/BlogCard";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "redux/reducers/blogs.reducer";
import MindListing from "./MindListing";
import RestaurantListing from "./RestaurantListing";
import CuisineCard from "./CuisineCard";
import api from "api/RequestInterceptor";
import { API_URLS } from "utils/API_URLS";
import { get } from "lodash";
import ExerciseListing from "./ExerciseListing";
import DietForm from "components/Diets/DietForm";
import ExerciseForm from "components/Exercises/ExerciseForm/EditForm";
import RestaurantForm from "components/Restaurants/RestaurantForm";
import MindForm from "components/Mind/MeditationForm/EditForm";
import BlogForm from "components/Blogs/Details";
import { setShowAddForm as setShowAddFormFood } from "redux/reducers/diets.reducer";
import { setShowAddForm as setShowAddFormExercise } from "redux/reducers/exercises.reducer";
import { setShowAddForm as setShowAddFormRestaurant } from "redux/reducers/restaurants.reducer";
import { setShowAddForm as setShowAddFormMind } from "redux/reducers/mind.reducer";
import { setShowForm as setShowFormBlog } from "redux/reducers/blogs.reducer";
import Modal from "components/Modal";
import { toUserFriendlyText, toForcedArray } from "utils/text";

const Label = ({ label, value }) => {
  return (
    <div className={styles.container_label}>
      <Typography className="text-disabled" variant="label">
        {label}
      </Typography>
      <Typography variant="body_bold">{toUserFriendlyText(value)}</Typography>
    </div>
  );
};

export const MODULES = {
  EXERCISE: "Exercise",
  DIET: "Diet",
  MIND: "Mind",
  BLOGS: "Blogs",
  PAYMENT: "Payment",
};

const Bio = [
  {
    dataKey: "profileVMs.Gender",
    label: "Gender",
    value: "Male",
  },
  {
    dataKey: "profileVMs.JoiningDate",
    label: "Joining Date",
    value: "07 Oct, 2019",
  },
  {
    dataKey: "profileVMs.StartWeight",
    label: "Joining BMI",
    value: 34.21,
  },
  {
    dataKey: "profileVMs.Height",
    label: "Height",
    value: "172 cm",
  },
  // {
  //   dataKey: "profileVMs.CallDuration",
  //   label: "Days Logged",
  //   value: "87 / 91",
  // },
  {
    dataKey: "profileVMs.Age",
    label: "Age",
    value: 34,
  },
  {
    dataKey: "profileVMs.StartWeight",
    label: "Joining Weight",
    value: "89.00 kg",
  },
  {
    dataKey: "profileVMs.Currentweight",
    label: "Current Weight",
    value: "80.00 kg",
  },
  {
    dataKey: "profileVMs.Currentweight",
    label: "Current BMI",
    value: "27.02",
  },
  // {
  //   dataKey: "profileVMs.responseDto",
  //   label: "Medical Condition",
  //   value: "None",
  // },
];

const plan = [
  // {
  //   label: "Activity Level",
  //   default: "Moderator",
  // },
  {
    label: "Activity Time",
    default: "240 min a day",
  },
  {
    label: "Gym",
    default: "1 hr",
  },
  {
    label: "Calories Budget",
    default: "1500 cal",
  },
  {
    label: "Rest",
    default: "3hr",
  },
  {
    label: "Completion Rate",
    default: "89 %",
  },
  {
    label: "Distance",
    default: "21 miles",
  },
  {
    label: "Steps Taken",
    default: 4570,
  },
  {
    label: "Cardio",
    default: "15 min",
  },
  {
    label: "Calories Burned",
    default: "900 cal",
  },
];

const dietQuestions = [
  {
    label: "Starting Weight",
    dataKey: "profileVMs.StartWeight",
  },
  {
    label: "Target Weight",
    dataKey: "profileVMs.GoalWeight",
    default: "None",
  },
  {
    label: "Alergies",
    dataKey: "dietQuestions[0].RestrictedFood",
    default: "None",
  },
  // {
  //   label: "Weight-loss Rate",
  //   dataKey: "dietQuestions.WeightLossRate",
  //   default: "0",
  // },
  // { label: "Following", dataKey: "dietQuestions.Following", default: 0 },
  // {
  //   label: "Completion Rate",
  //   dataKey: "dietQuestions.CompletionRate",
  //   default: 0,
  // },
  { label: "Body Type", dataKey: "dietQuestions[0].FoodType", default: "None" },
];
const exerciseQuestions = [
  // {
  //   label: "Activity Level",
  //   dataKey: "profileVMs.ActivityLevel",
  //   default: "None",
  // },
  // {
  //   label: "Activity Time",
  //   dataKey: "exerciseQuestions[0].ActivityTime",
  //   default: "None",
  // },
  {
    label: "Gym",
    dataKey: "exerciseQuestions[0].MemberShip",
    default: "No",
  },
  {
    label: "Calories Budget",
    dataKey: "budgetVm.TargetCalories",
    default: "0",
  },
  {
    label: "Rest",
    dataKey: "exerciseQuestions[0].Routine",
    default: "None",
  },
  // {
  //   label: "Completion Rate",
  //   dataKey: "exerciseQuestions.CompletionRate",
  //   default: "0",
  // },
  // {
  //   label: "Distance",
  //   dataKey: "exerciseQuestions.Distance",
  //   default: "0",
  // },
  // {
  //   label: "Steps Taken",
  //   dataKey: "exerciseQuestions.MemberShip",
  //   default: "0",
  // },
  {
    label: "Condition",
    dataKey: "exerciseQuestions[0].BodyType",
    default: "None",
  },
  {
    label: "Calories Burned",
    dataKey: "budgetVm.Burn_Calories",
    default: "0",
  },
];

const mindQuestions = [
  {
    label: "Free Food",
    dataKey: "mindQuestions[0].FreeFood",
    default: "Don't Agree",
  },
  {
    label: "Water Habit",
    dataKey: "mindQuestions[0].WaterHabit",
    default: "Don't Agree",
  },
  {
    label: "Latenight Habitb",
    dataKey: "mindQuestions[0].LateNightHabit",
    default: "Don't Agree",
  },
  {
    label: "Stressed Eating",
    dataKey: "mindQuestions[0].StressedEating",
    default: "Don't Agree",
  },
  {
    label: "Control",
    dataKey: "mindQuestions[0].Control",
    default: "Don't Agree",
  },
  {
    label: "Pre Occupied",
    dataKey: "mindQuestions[0].Preoccupied",
    default: "Don't Agree",
  },
];

const PlansListing = ({ title, counts, className, data = [] }) => {
  return (
    <div className={className}>
      <Typography variant="body_bold" block className="mb-1">
        {title}
      </Typography>
      {!data.length ? (
        <Typography>No data</Typography>
      ) : (
        <div className={styles.list}>
          {data.map((m) => (
            <PlanCard data={m} />
          ))}
          {counts < 6 &&
            Array.from({ length: 6 }, (_, i) => i + 1).map((m) => (
              <div key={m}></div>
            ))}
        </div>
      )}
    </div>
  );
};

const Schedule = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.schedule.userId);
  const isFoodModalOpen = useSelector((state) => state.diets.showAddForm);
  const isExerciseModalOpen = useSelector(
    (state) => state.exercises.showAddForm
  );
  const isRestaurantModalOpen = useSelector(
    (state) => state.restaurants.showAddForm
  );
  const isMindModalOpen = useSelector((state) => state.mind.showAddForm);
  const isBlogModalOpen = useSelector((state) => state.blogs.showForm);
  const module = useSelector((state) => state.schedule.module);
  const [activeTab, setActiveTab] = useState(module || MODULES.DIET);
  const allBlogs = useSelector((state) => state.blogs.data);
  const [userDashboard, setUserDashboard] = useState({});
  const [exerciseDashboard, setExerciseDashboard] = useState({});
  const [mindDashboard, setMindDashboard] = useState({});

  const selectedBlogId = useSelector((state) => state.blogs.blogId);

  const onFoodModalClose = () => {
    dispatch(setShowAddFormFood({ visibility: false }));
  };
  const onExerciseModalClose = () => {
    dispatch(setShowAddFormExercise({ visibility: false }));
  };
  const onRestaurantModalClose = () => {
    dispatch(setShowAddFormRestaurant({ visibility: false }));
  };
  const onMindModalClose = () => {
    dispatch(setShowAddFormMind({ visibility: false }));
  };
  const onBlogModalClose = () => {
    dispatch(setShowFormBlog({ visibility: false }));
  };

  const onBlogCardClick = (id) => {
    dispatch(
      setShowFormBlog({
        visibility: true,
        blogId: id,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchBlogs());
    fetchUserDashboard();
    fetchUserExerciseDashboard();
    fetchUserMindDashboard();
  }, []);

  const fetchUserDashboard = async () => {
    try {
      const { data } = await api.get(API_URLS.user.dashboard(userId));
      setUserDashboard(data);
    } catch (ex) {
      console.error("Error in fetching user dashabord", ex.message);
    }
  };
  const fetchUserExerciseDashboard = async () => {
    try {
      const { data } = await api.get(API_URLS.user.exerciseDashboard(userId));
      setExerciseDashboard(data);
    } catch (ex) {
      console.error("Error in fetching user dashabord", ex.message);
    }
  };
  const fetchUserMindDashboard = async () => {
    try {
      const { data } = await api.get(API_URLS.user.mindDashboard(userId));
      setMindDashboard(data);
    } catch (ex) {
      console.error("Error in fetching user dashabord", ex.message);
    }
  };

  return (
    <div>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.image}>
            <PersonAlt />
          </div>
          <div>
            <Typography block className="text-disabled" variant="label">
              #{userDashboard?.profileVMs?.userId}
            </Typography>
            <Typography block variant="body_bold">
              {userDashboard?.profileVMs?.UserName || "N/A"}
            </Typography>
            <Typography block className="text-disabled" variant="label">
              {userDashboard?.profileVMs?.Email || "N/A"}
            </Typography>
          </div>
        </div>
        <div className={styles.right}>
          {Bio.map((m) => {
            if (m.label === "Joining Date")
              return (
                <Label
                  key={m.label}
                  label={m.label}
                  value={new Date(
                    get(userDashboard, m.dataKey)
                  )?.toLocaleDateString()}
                />
              );
            return (
              <Label
                key={m.label}
                label={m.label}
                value={get(userDashboard, m.dataKey) || "N/A"}
              />
            );
          })}
        </div>
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} module={module} />
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.schedule}>
            {(activeTab === MODULES.DIET
              ? dietQuestions
              : activeTab === MODULES.EXERCISE
              ? exerciseQuestions
              : activeTab === MODULES.MIND
              ? mindQuestions
              : mindQuestions
            ).map((m) => (
              <Label
                label={m.label}
                value={
                  get(
                    activeTab === MODULES.DIET
                      ? userDashboard
                      : activeTab === MODULES.EXERCISE
                      ? exerciseDashboard
                      : activeTab === MODULES.MIND
                      ? mindDashboard
                      : mindDashboard,
                    m.dataKey
                  ) || m.default
                }
              />
            ))}
          </div>
          <Calendar />
        </div>
        <div className={styles.right}>
          {activeTab === MODULES.EXERCISE && (
            <>
              <ExerciseListing
                className="mb-2"
                title="Plans"
                data={exerciseDashboard.plans}
                counts={3}
              />
              <ExerciseListing
                title="Previous Plans"
                data={exerciseDashboard.prevPlans}
                counts={3}
              />
            </>
          )}
          {activeTab === MODULES.DIET && (
            <>
              <PlansListing
                title="Active Plans"
                data={userDashboard.plans}
                counts={1}
                className={styles.active_plans}
              />
              <div className={styles.diets_info}>
                <RestaurantListing
                  title="Favorite Restaurants"
                  data={userDashboard.favouriteRestaurants}
                  counts={1}
                />
                <div className={styles.cuisines}>
                  <Typography variant="body_bold" block className="mb-1">
                    Favorite Cuisines
                  </Typography>
                  <div className={styles.list}>
                    {userDashboard?.dietQuestions?.length &&
                      toForcedArray(
                        userDashboard?.dietQuestions[0]?.FavCuisine
                      )?.map((m) => <CuisineCard label={m} key={m} />)}
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === MODULES.MIND && (
            <>
              <MindListing
                title="Plans"
                data={mindDashboard.plans}
                className="mb-2"
                counts={3}
              />
              <MindListing
                title="CBT Listened"
                data={mindDashboard.favoriteMindVMs}
                withCoverage
                counts={3}
              />
            </>
          )}
          {activeTab === MODULES.BLOGS && (
            <>
              <Typography variant="body_bold">Blogs Read</Typography>
              <div className={styles.blogs}>
                {allBlogs.map((m) => (
                  <BlogCard
                    viewOnly
                    data={m}
                    key={m.Id}
                    onClick={() => onBlogCardClick(m.Id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Modal isOpen={isFoodModalOpen} onClose={onFoodModalClose}>
        <DietForm viewOnly />
      </Modal>
      <Modal isOpen={isExerciseModalOpen} onClose={onExerciseModalClose}>
        <ExerciseForm viewOnly />
      </Modal>
      <Modal isOpen={isRestaurantModalOpen} onClose={onRestaurantModalClose}>
        <RestaurantForm viewOnly />
      </Modal>
      <Modal isOpen={isMindModalOpen} onClose={onMindModalClose}>
        <MindForm viewOnly />
      </Modal>
      <Modal isOpen={isBlogModalOpen} onClose={onBlogModalClose}>
        <BlogForm blogId={selectedBlogId} viewOnly />
      </Modal>
    </div>
  );
};

export default Schedule;
