import styles from "./Weeks.module.scss";
import classNames from "classnames";

let DAYS = Array.from({ length: 17 }, (_, i) => i + 1);

const Day = ({ dayCount, selectedDay, setSelectedDay }) => {
  return (
    <div
      className={classNames(
        styles.day,
        `${selectedDay === dayCount ? styles.selected : ""}`
      )}
      onClick={() => setSelectedDay(dayCount)}
    >
      Day {dayCount}
    </div>
  );
};

const Week = ({ title, days = [], selectedDay, setSelectedDay }) => {
  return (
    <>
      {days.length ? (
        <div className={classNames(styles.base, "d-flex align-center gap-1")}>
          <label>{title}</label>
          {days.map((m) => (
            <Day
              key={m}
              dayCount={m}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

const Weeks = ({ numOfDays, selectedDay, setSelectedDay }) => {
  const days = DAYS.slice(0, numOfDays);
  return (
    <div className="d-flex gap-2">
      <Week
        title="Week 1"
        days={days.slice(0, 7)}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <Week
        title="Week 2"
        days={days.slice(7, 14)}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <Week
        title="Week 3"
        days={days.slice(14, 17)}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
    </div>
  );
};

export default Weeks;
