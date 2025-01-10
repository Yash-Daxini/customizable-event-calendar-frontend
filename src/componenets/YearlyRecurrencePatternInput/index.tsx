import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Select from "react-select";
import { getDate, getDayNumberFromDate, getDayOfMonth, getWeekDayName, getWeekNumber, getWeekOfMonth } from "../../util/DateUtil";
import { DateType, DropdownInput } from "../../common/types";
import { EventRequestModel } from "../../models/EventRequestModel";

interface YearlyRecurrencePatternInputProps {
  date: DateType,
  recurringEvent: EventRequestModel,
  updateEvent: React.Dispatch<React.SetStateAction<EventRequestModel>>;
}

const YearlyRecurrencePatternInput: React.FC<YearlyRecurrencePatternInputProps> = ({ date, recurringEvent, updateEvent }: YearlyRecurrencePatternInputProps) => {
  const [isMonthDayPattern, setIsMonthDayPattern] = useState(true);
  const [isWeekOrderPattern, setIsWeekOrderPattern] = useState(false);

  const intervals: DropdownInput[] = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i.toString() });
  }

  const [interval, setInterval] = useState<number>(intervals[0].value);

  useEffect(() => {
    updateEvent({
      ...recurringEvent,
      recurrencePattern: {
        ...recurringEvent.recurrencePattern,
        interval: interval,
        byMonthDay: isMonthDayPattern ? getDayOfMonth(date) : null,
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
          <label htmlFor="interval">On day {getDate(date)}</label>
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
            {getWeekDayName(date)}
          </label>
        </div>
      </div>
    </div>
  );
};

export default YearlyRecurrencePatternInput;
