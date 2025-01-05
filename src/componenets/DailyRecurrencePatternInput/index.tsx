import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './style.module.css'
import Select, { SingleValue } from 'react-select';
import LabelledCheckbox from '../LabelledCheckbox'
import { RecurringEventRequest } from '../../models/RecurringEventRequest';
import { WeekDayAlias } from '../../enums/WeekDayAlias';
import { DropdownInput } from '../../common/types';

interface DailyRecurrencePatternInputProps {
  event: RecurringEventRequest,
  updateEvent: React.Dispatch<React.SetStateAction<RecurringEventRequest>>
}

const DailyRecurrencePatternInput: React.FC<DailyRecurrencePatternInputProps> = ({ event, updateEvent }: DailyRecurrencePatternInputProps) => {

  const [isIntervalPattern, setIsIntervalPattern] = useState<boolean>(false);
  const [isWeekDayPattern, setIsWeekDayPattern] = useState<boolean>(false)

  const [weekDay, setWeekDay] = useState<number[]>([]);

  const intervals: DropdownInput[] = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i.toString() });
  }

  const [interval, setInterval] = useState<number>(intervals[0].value);

  useEffect(() => {
    updateEvent({ ...event, recurrencePattern: { ...event.recurrencePattern, interval: isIntervalPattern ? interval : 1, byWeekDay: isWeekDayPattern ? weekDay : [] } })
  }, [weekDay, interval])

  const changeWeekDayArray = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked)
      setWeekDay([...weekDay, parseInt(e.target.value)])
    else
      setWeekDay(weekDay.filter(x => x !== parseInt(e.target.value)))
  };

  return (
    <>
      <div className={`${styles.patternSelectionDiv}`}>
        <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={`Every nth day`} onChange={() => {
          setIsIntervalPattern(true);
          setIsWeekDayPattern(false);
        }} />
        <label htmlFor="interval">Every </label>

        {isIntervalPattern &&
          <>
            <Select
              defaultValue={intervals}
              onChange={(e: SingleValue<DropdownInput>) => setInterval(e?.value as number)}
              options={intervals}
              className={`${styles.dropdown}`}
            />
            day(s)
          </>
        }
      </div>

      <div className={`${styles.patternSelectionDiv}`}>
        <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={`Every week day`} onChange={() => {
          setIsWeekDayPattern(true);
          setIsIntervalPattern(false);
        }} />
        <label htmlFor="weekday">Every weekday</label>
        {isWeekDayPattern &&
          <>
            <LabelledCheckbox labelValue={WeekDayAlias.Mon.toString()} inputValue={"1"} onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={WeekDayAlias.Tue.toString()} inputValue={"2"} onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={WeekDayAlias.Wed.toString()} inputValue={"3"} onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={WeekDayAlias.Thu.toString()} inputValue={"4"} onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={WeekDayAlias.Fri.toString()} inputValue={"5"} onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={WeekDayAlias.Sat.toString()} inputValue={"6"} onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={WeekDayAlias.Sun.toString()} inputValue={"7"} onChange={(e: ChangeEvent<HTMLInputElement>) => changeWeekDayArray(e)} />
          </>
        }
      </div>
    </>
  )
}

export default DailyRecurrencePatternInput