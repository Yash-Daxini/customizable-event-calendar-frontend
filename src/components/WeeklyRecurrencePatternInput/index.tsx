import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./style.module.css";
import Select from "react-select";
import LabelledCheckbox from "../LabelledCheckbox";
import { DropdownInput } from "../../common/types";
import { WeekDayAlias } from "../../enums/WeekDayAlias";
import { EventRequestModel } from "../../models/EventRequestModel";

interface WeeklyRecurrencePatternInputProps {
  recurringEvent: EventRequestModel,
  updateEvent: React.Dispatch<React.SetStateAction<EventRequestModel>>
}

const WeeklyRecurrencePatternInput: React.FC<WeeklyRecurrencePatternInputProps> = ({ recurringEvent: event, updateEvent }: WeeklyRecurrencePatternInputProps) => {
  const intervals: DropdownInput[] = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i.toString() });
  }

  const [interval, setInterval] = useState<number>(intervals[0].value);
  const [weekDay, setWeekDay] = useState<number[]>([]);

  useEffect(() => {
    if (event.recurrencePattern.byWeekDay)
      setWeekDay(event.recurrencePattern.byWeekDay);

    if (event.recurrencePattern.interval)
      setInterval(event.recurrencePattern.interval);
  }, []);


  useEffect(() => {
    updateEvent({
      ...event,
      recurrencePattern: {
        ...event.recurrencePattern,
        interval: interval,
        byWeekDay: weekDay,
      },
    });
  }, [weekDay, interval]);

  const changeWeekDayArray = (e: any) => {
    if (e.target.checked) setWeekDay([...weekDay, parseInt(e.target.value)]);
    else setWeekDay(weekDay.filter((x) => x != e.target.value));
  };

  return (
    <div>
      <div className={`${styles.patternSelectionDiv}`}>
        <label htmlFor="interval">Every </label>
        <Select
          value={intervals.find((i) => i.value === interval)}
          onChange={(e: any) => setInterval(e.value)}
          options={intervals}
          className={`${styles.dropdown}`}
        />
        Week(s)
      </div>
      <div className={`${styles.patternSelectionDiv}`}>
        <label htmlFor="weekday">Select weekdays</label>

        <LabelledCheckbox
          labelValue={WeekDayAlias.Mon.toString()}
          inputValue={"1"}
          isChecked={weekDay.includes(1)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)}
        />
        <LabelledCheckbox
          labelValue={WeekDayAlias.Tue.toString()}
          inputValue={"2"}
          isChecked={weekDay.includes(2)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)}
        />
        <LabelledCheckbox
          labelValue={WeekDayAlias.Wed.toString()}
          inputValue={"3"}
          isChecked={weekDay.includes(3)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)}
        />
        <LabelledCheckbox
          labelValue={WeekDayAlias.Thu.toString()}
          inputValue={"4"}
          isChecked={weekDay.includes(4)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)}
        />
        <LabelledCheckbox
          labelValue={WeekDayAlias.Fri.toString()}
          inputValue={"5"}
          isChecked={weekDay.includes(5)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)}
        />
        <LabelledCheckbox
          labelValue={WeekDayAlias.Sat.toString()}
          inputValue={"6"}
          isChecked={weekDay.includes(6)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)}
        />
        <LabelledCheckbox
          labelValue={WeekDayAlias.Sun.toString()}
          inputValue={"7"}
          isChecked={weekDay.includes(7)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)}
        />
      </div>
    </div>
  );
};

export default WeeklyRecurrencePatternInput;
