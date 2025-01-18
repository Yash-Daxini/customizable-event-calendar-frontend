import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Select from "react-select";
import DateWrapper from "../../util/DateUtil";
import { DropdownInput } from "../../common/types";
import { EventRequestModel } from "../../models/EventRequestModel";

interface MonthlyRecurrencePatternInputProps {
  event: EventRequestModel,
  updateEvent: React.Dispatch<React.SetStateAction<EventRequestModel>>,
  date: string
}

const MonthlyRecurrencePatternInput: React.FC<MonthlyRecurrencePatternInputProps> = ({ event, updateEvent, date }: MonthlyRecurrencePatternInputProps) => {
  const [isMonthDayPattern, setIsMonthDayPattern] = useState<boolean>(true);
  const [isWeekOrderPattern, setIsWeekOrderPattern] = useState<boolean>(false);

  const dateWrapper = new DateWrapper(date); 

  const intervals: DropdownInput[] = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i.toString() });
  }

  const [interval, setInterval] = useState<number>(intervals[0].value);

  useEffect(() => {
    if (event.recurrencePattern.interval)
      setInterval(event.recurrencePattern.interval);

    if (event.recurrencePattern.byMonthDay) {
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
      ...event,
      recurrencePattern: {
        ...event.recurrencePattern,
        interval: interval,
        byMonthDay: isMonthDayPattern ? dateWrapper.getDate() : null,
        weekOrder: isWeekOrderPattern ? dateWrapper.getWeekNumber() : null,
        byWeekDay: isWeekOrderPattern ? [dateWrapper.getDayNumberFromDate()] : [],
      },
    });
  }, [isMonthDayPattern, isWeekOrderPattern, interval]);

  return (
    <div>
      <div className={`${styles.patternSelectionDiv}`}>
        <Select
          value={intervals.find((i) => i.value === interval)}
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
          <label htmlFor="interval">On day {dateWrapper.getDate()}</label>
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
            On the {dateWrapper.getWeekOfMonth()}{" "}
            {dateWrapper.getDisplayFormat()}
          </label>
        </div>
      </div>
    </div>
  );
};

export default MonthlyRecurrencePatternInput;
