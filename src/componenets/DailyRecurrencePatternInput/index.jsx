import React, { useState } from 'react'
import styles from './style.module.css'
import Select from 'react-select';
import LabelledCheckbox from '../LabelledCheckbox'

const DailyRecurrencePatternInput = () => {

  const [isIntervalPattern, setIsIntervalPattern] = useState(false);
  const [isWeekDayPattern, setIsWeekDayPattern] = useState(false)

  const intervals = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i });
  }

  const [interval, setInterval] = useState(intervals[0].value);

  return (
    <>
      <div className={`${styles.patternSelectionDiv}`}>
        <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={`Every nth day`} onChange={(e) => {
          setIsIntervalPattern(true)
          setIsWeekDayPattern(false);
        }} />
        <label htmlFor="interval">Every </label>

        {isIntervalPattern ?
          <>
            <Select
              defaultValue={intervals}
              onChange={e => setInterval(e)}
              options={intervals}
              className={`${styles.dropdown}`}
            />
            day(s)
          </>
          : <></>
        }
      </div>

      <div className={`${styles.patternSelectionDiv}`}>
        <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={`Every week day`} onChange={(e) => {
          setIsWeekDayPattern(true)
          setIsIntervalPattern(false);
        }} />
        <label htmlFor="weekday">Every weekday</label>
        {isWeekDayPattern ?
          <>
            <LabelledCheckbox labelValue={"Mon"} inputValue={1} onChange={(e) => console.warn(e.target.checked)} />
            <LabelledCheckbox labelValue={"Tue"} inputValue={2} onChange={(e) => console.warn(e.target.checked)} />
            <LabelledCheckbox labelValue={"Wed"} inputValue={3} onChange={(e) => console.warn(e.target.checked)} />
            <LabelledCheckbox labelValue={"Thu"} inputValue={4} onChange={(e) => console.warn(e.target.checked)} />
            <LabelledCheckbox labelValue={"Fri"} inputValue={5} onChange={(e) => console.warn(e.target.checked)} />
            <LabelledCheckbox labelValue={"Sat"} inputValue={6} onChange={(e) => console.warn(e.target.checked)} />
            <LabelledCheckbox labelValue={"Sun"} inputValue={7} onChange={(e) => console.warn(e.target.checked)} />
          </>
          : <></>
        }
      </div>
    </>
  )
}

export default DailyRecurrencePatternInput