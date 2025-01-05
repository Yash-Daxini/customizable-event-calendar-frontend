import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Select from "react-select";
import { RecurringEventRequest } from "../../models/RecurringEventRequest";
import { getDayNumberFromDate, getWeekNumber, getWeekOfMonth } from "../../util/DateUtil";
import { DropdownInput } from "../../common/types";

interface MonthlyRecurrencePatternInputProps {
  event: RecurringEventRequest,
  updateEvent: React.Dispatch<React.SetStateAction<RecurringEventRequest>>
  date: Date
}

const MonthlyRecurrencePatternInput: React.FC<MonthlyRecurrencePatternInputProps> = ({ event, updateEvent, date }: MonthlyRecurrencePatternInputProps) => {
  const [isMonthDayPattern, setIsMonthDayPattern] = useState<boolean>(true);
  const [isWeekOrderPattern, setIsWeekOrderPattern] = useState<boolean>(false);

  const intervals: DropdownInput[] = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i.toString() });
  }

  const [interval, setInterval] = useState<number>(intervals[0].value);

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
        Month(s)
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

export default MonthlyRecurrencePatternInput;
