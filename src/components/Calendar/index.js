import Typography from "components/Typography";
import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.scss";
import classNames from "classnames";
const { datesGenerator } = require("dates-generator");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [calendar, setCalendar] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });

  useEffect(() => {
    const body = {
      month: calendar.month,
      year: calendar.year,
    };
    const { dates, nextMonth, nextYear, previousMonth, previousYear } =
      datesGenerator(body);

    setDates([...dates]);
    setCalendar({
      ...calendar,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    });
  }, []);

  const onClickNext = () => {
    const body = { month: calendar.nextMonth, year: calendar.nextYear };
    const { dates, nextMonth, nextYear, previousMonth, previousYear } =
      datesGenerator(body);

    setDates([...dates]);
    setCalendar({
      ...calendar,
      month: calendar.nextMonth,
      year: calendar.nextYear,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    });
  };

  const onClickPrevious = () => {
    const body = { month: calendar.previousMonth, year: calendar.previousYear };
    const { dates, nextMonth, nextYear, previousMonth, previousYear } =
      datesGenerator(body);

    setDates([...dates]);
    setCalendar({
      ...calendar,
      month: calendar.previousMonth,
      year: calendar.previousYear,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    });
  };

  const onSelectDate = (date) => {
    setSelectedDate(new Date(date.year, date.month, date.date));
  };

  return (
    <div className={styles.base}>
      <div>
        <div className={styles.current_month}>
          <Typography variant="body">
            {months[calendar.month]}{" "}
            <Typography variant="body_bold">{calendar.year}</Typography>
          </Typography>
          {/* <div className={styles.navigation}>
            <Typography variant="body_bold" onClick={onClickPrevious}>
              &lt;
            </Typography>
            <Typography variant="body_bold" onClick={onClickNext}>
              &gt;
            </Typography>
          </div> */}
        </div>
        <div>
          <div>
            <table style={{ width: "100%" }}>
              <tbody>
                {dates.length > 0 &&
                  dates.map((week) => (
                    <tr key={JSON.stringify(week[0])}>
                      {week.map((each) => (
                        <td key={JSON.stringify(each)}>
                          {calendar.month !== each.month ? null : (
                            <div
                              className={classNames(
                                styles.day,
                                each.date === selectedDate.getDate()
                                  ? styles.active
                                  : ""
                              )}
                              // onClick={() => onSelectDate(each)}
                            >
                              <Typography
                                variant={
                                  each.date === selectedDate.getDate()
                                    ? "label_bold"
                                    : "label"
                                }
                              >
                                {each.date.toString().padStart(2, "0")}
                              </Typography>
                              {each.date === selectedDate.getDate() && (
                                <Typography variant="extra_small" block>
                                  {days[selectedDate.getDay()]}
                                </Typography>
                              )}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                <tr>
                  {days.map((day) => (
                    <td key={day}>
                      <Typography
                        variant="label_bold"
                        className={classNames(styles.day, "text-disabled")}
                      >
                        {day.slice(0, 1)}
                      </Typography>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* <div style={{ padding: 10 }}>
          Selected Date: {selectedDate.toLocaleString()}
        </div> */}
      </div>
    </div>
  );
};

export default Calendar;
