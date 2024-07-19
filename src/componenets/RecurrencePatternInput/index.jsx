import React from 'react'
import styles from './style.module.css';
import DailyRecurrencePatternInput from '../DailyRecurrencePatternInput'
import WeeklyRecurrencePatternInput from '../WeeklyRecurrencePatternInput';
import MonthlyRecurrencePatternInput from '../MonthlyRecurrencePatternInput'
import YearlyRecurrencePatternInput from '../YearlyRecurrencePatternInput';

const RecurrencePatternInput = ({ eventObj, date }) => {

  const renderAppropriateComponent = () => {
    switch (eventObj.frequency) {
      case "Daily":
        return <DailyRecurrencePatternInput />
      case "Weekly":
        return <WeeklyRecurrencePatternInput />
      case "Monthly":
        return <MonthlyRecurrencePatternInput date={date} />
      case "Yearly":
        return <YearlyRecurrencePatternInput date={date} />
      default:
        return <></>;
    }
  }

  return (
    <div className={`${styles.mainDiv}`}>
      {renderAppropriateComponent()}
    </div>
  )
}

export default RecurrencePatternInput