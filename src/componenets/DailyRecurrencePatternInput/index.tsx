import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Select from 'react-select';
import LabelledCheckbox from '../LabelledCheckbox'
import { RecurringEventRequest } from '../../models/RecurringEventRequest';

interface DailyRecurrencePatternInputProps {
  event: RecurringEventRequest,
  updateEvent: (event: RecurringEventRequest) => void
}

type SelectionBoxOptionType = {
  value: number,
  label: number
}

const DailyRecurrencePatternInput: React.FC<DailyRecurrencePatternInputProps> = ({ event, updateEvent }: DailyRecurrencePatternInputProps) => {

  const [isIntervalPattern, setIsIntervalPattern] = useState<boolean>(false);
  const [isWeekDayPattern, setIsWeekDayPattern] = useState<boolean>(false)

  const [weekDay, setWeekDay] = useState<number[]>([]);

  const intervals: SelectionBoxOptionType[] = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i });
  }

  const [interval, setInterval] = useState<number>(intervals[0].value);

  useEffect(() => {
    updateEvent({ ...event, recurrencePattern: { ...event.recurrencePattern, interval: isIntervalPattern ? interval : 1, byWeekDay: isWeekDayPattern ? weekDay : [] } })
  }, [weekDay, interval])

  const changeWeekDayArray = (e: any): void => {
    if (e.target.checked)
      setWeekDay([...weekDay, e.target.value])
    else
      setWeekDay(weekDay.filter(x => x != e.target.value))
  };

  return (
    <>
      <div className={`${styles.patternSelectionDiv}`}>
        <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={`Every nth day`} onChange={() => {
          setIsIntervalPattern(true);
          setIsWeekDayPattern(false);
        }} />
        <label htmlFor="interval">Every </label>

        {isIntervalPattern ?
          <>
            <Select
              defaultValue={intervals}
              onChange={(e: any) => setInterval(e.value)}
              options={intervals}
              className={`${styles.dropdown}`}
            />
            day(s)
          </>
          : <></>
        }
      </div>

      <div className={`${styles.patternSelectionDiv}`}>
        <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={`Every week day`} onChange={() => {
          setIsWeekDayPattern(true);
          setIsIntervalPattern(false);
        }} />
        <label htmlFor="weekday">Every weekday</label>
        {isWeekDayPattern ?
          <>
            <LabelledCheckbox labelValue={"Mon"} inputValue={1 + ""} onChange={(e: any) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={"Tue"} inputValue={2 + ""} onChange={(e: any) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={"Wed"} inputValue={3 + ""} onChange={(e: any) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={"Thu"} inputValue={4 + ""} onChange={(e: any) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={"Fri"} inputValue={5 + ""} onChange={(e: any) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={"Sat"} inputValue={6 + ""} onChange={(e: any) => changeWeekDayArray(e)} />
            <LabelledCheckbox labelValue={"Sun"} inputValue={7 + ""} onChange={(e: any) => changeWeekDayArray(e)} />
          </>
          : <></>
        }
      </div>
    </>
  )
}

export default DailyRecurrencePatternInput