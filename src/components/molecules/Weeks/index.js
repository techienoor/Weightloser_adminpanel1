import styles from "./Weeks.module.scss";
import classNames from "classnames";

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

const Week = ({ title, days = [], selectedDay, setSelectedDay, viewOnly }) => {
  return (
    <>
      {days.length ? (
        <div className={classNames(styles.base, "d-flex align-center gap-1")}>
          {!viewOnly && <label>{title}</label>}
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

const Weeks = ({ numOfDays, selectedDay, setSelectedDay, viewOnly }) => {
  let DAYS = Array.from({ length: numOfDays }, (_, i) => i + 1);
  let days = DAYS.slice(0, numOfDays);

  const daysArray = [];
  let i = 7;
  if (numOfDays < i) {
    daysArray.push(days.slice(0, numOfDays));
  }
  while (i <= numOfDays) {
    daysArray.push(days.slice(i - 7, i));
    if (i + 7 > numOfDays) {
      daysArray.push(days.slice(i, numOfDays));
    }
    i = i + 7;
  }

  return (
    <div className="d-flex gap-2">
      {daysArray.map((m, i) => (
        <Week
          viewOnly={viewOnly}
          title={`Week ${i + 1}`}
          days={m}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      ))}
    </div>
  );
};

export default Weeks;
