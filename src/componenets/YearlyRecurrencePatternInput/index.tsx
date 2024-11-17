import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Select from "react-select";

interface YearlyRecurrencePatternInputProps {
  date: Date,
  event: any,
  updateEvent: any
}

const YearlyRecurrencePatternInput: React.FC<YearlyRecurrencePatternInputProps> = ({ date, event, updateEvent }: YearlyRecurrencePatternInputProps) => {
  const [isMonthDayPattern, setIsMonthDayPattern] = useState(true);
  const [isWeekOrderPattern, setIsWeekOrderPattern] = useState(false);

  const intervals = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i });
  }

  const [interval, setInterval] = useState(intervals[0].value);

  const getWeekNumber = (date: Date) => (0 | (date.getDate() / 7)) + 1;

  const getWeekOfMonth = (date: Date) => {
    const weekNumber = (0 | (date.getDate() / 7)) + 1;
    switch (weekNumber) {
      case 1:
        return "first";
      case 2:
        return "second";
      case 3:
        return "third";
      case 4:
        return "fourth";
      default:
        return "last";
    }
  };

  const getDayNumberFromDate = (date: Date) => {
    let day = date.getDay();

    if (day == 0) return 7;
    return day;
  };

  useEffect(() => {
    updateEvent({
      ...event,
      recurrencePattern: {
        ...event.recurrencePattern,
        interval: interval,
        byMonthDay: isMonthDayPattern ? date.getDate() : null,
        weekOrder: isWeekOrderPattern ? getWeekNumber(date) : null,
        byWeekDay: isWeekOrderPattern ? [getDayNumberFromDate(date)] : [],
      },
    });
  }, [isMonthDayPattern, isWeekOrderPattern, interval]);

  return (
    <div>
      <div className={`${styles.patternSelectionDiv}`}>
        <Select
          defaultValue={intervals}
          onChange={(e: any) => setInterval(e.value)}
          options={intervals}
          className={`${styles.dropdown}`}
        />
        Year(s)
      </div>

      <div className={`${styles.patternSelectionDiv}`}>
        <div>
          <input
            className={`${styles.radioBtn}`}
            type="radio"
            name="patternType"
            value={``}
            checked
            onChange={() => {
              setIsMonthDayPattern(true);
              setIsWeekOrderPattern(false);
            }}
          />
          <label htmlFor="interval">On day {date.getDate()}</label>
        </div>
        <div>
          <input
            className={`${styles.radioBtn}`}
            type="radio"
            name="patternType"
            value={``}
            onChange={() => {
              setIsMonthDayPattern(false);
              setIsWeekOrderPattern(true);
            }}
          />
          <label htmlFor="weekday">
            On the {getWeekOfMonth(date)}{" "}
            {date.toLocaleDateString("en-us", { weekday: "long" })}
          </label>
        </div>
      </div>
    </div>
  );
};

export default YearlyRecurrencePatternInput;
