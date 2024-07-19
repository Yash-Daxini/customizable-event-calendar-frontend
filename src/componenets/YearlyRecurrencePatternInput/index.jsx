import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Select from 'react-select'

const YearlyRecurrencePatternInput = ({ date, event, updateEvent }) => {
  const [isMonthDayPattern, setIsMonthDayPattern] = useState(true);
  const [isWeekOrderPattern, setIsWeekOrderPattern] = useState(false)

  const intervals = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i });
  }

  const [interval, setInterval] = useState(intervals[0].value);

  const getWeekNumber = (date) => (0 | date.getDate() / 7) + 1;

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

  const getDayNumberFromDate = (date) => {
    let day = date.getDay()

    if (day == 0) return 7;
    return day;
  }

  useEffect(() => {
    updateEvent({
      ...event, recurrencePattern: {
        ...event.recurrencePattern, interval: interval,
        byMonthDay: isMonthDayPattern ? date.getDate() : null,
        weekOrder: isWeekOrderPattern ? getWeekNumber(date) : null,
        byWeekDay: isWeekOrderPattern ? [getDayNumberFromDate(date)] : []
      }
    })
  }, [isMonthDayPattern, isWeekOrderPattern, interval])

  return (
    <div>
      <div className={`${styles.patternSelectionDiv}`}>
        <Select
          defaultValue={intervals}
          onChange={e => setInterval(e.value)}
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
          setIsMonthDayPattern(false);
          setIsWeekOrderPattern(true);
        }} />
        <label htmlFor="weekday">On the {getWeekOfMonth(date)} {date.toLocaleDateString('en-us', { weekday: "long" })}</label>
      </div>
    </div>
  )
}

export default YearlyRecurrencePatternInput