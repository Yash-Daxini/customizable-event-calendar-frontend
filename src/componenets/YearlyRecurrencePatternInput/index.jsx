import React, { useState } from 'react'
import styles from './style.module.css'
import Select from 'react-select'

const YearlyRecurrencePatternInput = ({ date }) => {
  const [isMonthDayPattern, setIsMonthDayPattern] = useState(false);
  const [isWeekOrder, setIsWeekOrderPattern] = useState(false)

  const intervals = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i });
  }

  const [interval, setInterval] = useState(intervals[0].value);

  const getWeekOfMonth = (date) => {
    const weekNumber = (0 | date.getDate() / 7) + 1;
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

  return (
    <div>
      <div className={`${styles.patternSelectionDiv}`}>
        <Select
          defaultValue={intervals}
          onChange={e => setInterval(e)}
          options={intervals}
          className={`${styles.dropdown}`}
        />
        Year(s)
      </div>

      <div className={`${styles.patternSelectionDiv}`}>

        <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={``} checked onChange={(e) => {
          setIsMonthDayPattern(true);
          setIsWeekOrderPattern(false);
        }} />
        <label htmlFor="interval">On day {date.getDate()}</label>
        <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={``} onChange={(e) => {
          setIsMonthDayPattern(true);
          setIsWeekOrderPattern(false);
        }} />
        <label htmlFor="weekday">On the {getWeekOfMonth(date)} {date.toLocaleDateString('en-us', { weekday: "long" })}</label>
      </div>
    </div>
  )
}

export default YearlyRecurrencePatternInput