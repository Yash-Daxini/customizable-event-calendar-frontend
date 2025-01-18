import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Select from "react-select";
import DateWrapper from "../../util/DateUtil";
import { DropdownInput } from "../../common/types";
import { EventRequestModel } from "../../models/EventRequestModel";

interface YearlyRecurrencePatternInputProps {
  date: string,
  event: EventRequestModel,
  updateEvent: React.Dispatch<React.SetStateAction<EventRequestModel>>;
}

const YearlyRecurrencePatternInput: React.FC<YearlyRecurrencePatternInputProps> = ({ date, event: recurringEvent, updateEvent }: YearlyRecurrencePatternInputProps) => {
  const [isMonthDayPattern, setIsMonthDayPattern] = useState(true);
  const [isWeekOrderPattern, setIsWeekOrderPattern] = useState(false);

  const intervals: DropdownInput[] = [];

  const dateWrapper = new DateWrapper(date);

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i.toString() });
  }

  const [interval, setInterval] = useState<number>(intervals[0].value);

  useEffect(() => {
    if (recurringEvent.recurrencePattern.interval)
      setInterval(recurringEvent.recurrencePattern.interval);

    if (recurringEvent.recurrencePattern.byMonthDay) {
      setIsMonthDayPattern(true);
      setIsWeekOrderPattern(false);
    }
    else {
      setIsMonthDayPattern(false);
      setIsWeekOrderPattern(true);
    }
  }, []);


  useEffect(() => {
    updateEvent({
      ...recurringEvent,
      recurrencePattern: {
        ...recurringEvent.recurrencePattern,
        interval: interval,
        byMonth: dateWrapper.getMonth(),
        byMonthDay: isMonthDayPattern ? dateWrapper.getDayOfMonth() : null,
        weekOrder: isWeekOrderPattern ? dateWrapper.getWeekNumber() : null,
        byWeekDay: isWeekOrderPattern ? [dateWrapper.getDayNumberFromDate()] : [],
      },
    });
  }, [isMonthDayPattern, isWeekOrderPattern]);

  return (
    <div>
      <div className={`${styles.patternSelectionDiv}`}>
        <Select
          value={intervals.find((i) => i.value === interval)}
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
            checked={isMonthDayPattern}
            onChange={() => {
              setIsMonthDayPattern(true);
              setIsWeekOrderPattern(false);
            }}
          />
          <label htmlFor="interval">On day {dateWrapper.getDate()}</label>
        </div>
        <div>
          <input
            className={`${styles.radioBtn}`}
            type="radio"
            name="patternType"
            checked={isWeekOrderPattern}
            value={``}
            onChange={() => {
              setIsMonthDayPattern(false);
              setIsWeekOrderPattern(true);
            }}
          />
          <label htmlFor="weekday">
            On the {dateWrapper.getWeekOfMonth()}{" "}
            {dateWrapper.getWeekDayName()}
          </label>
        </div>
      </div>
    </div>
  );
};

export default YearlyRecurrencePatternInput;
