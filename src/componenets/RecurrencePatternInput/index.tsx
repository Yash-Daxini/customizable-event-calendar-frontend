import React from 'react'
import styles from './style.module.css';
import DailyRecurrencePatternInput from '../DailyRecurrencePatternInput'
import WeeklyRecurrencePatternInput from '../WeeklyRecurrencePatternInput';
import MonthlyRecurrencePatternInput from '../MonthlyRecurrencePatternInput'
import YearlyRecurrencePatternInput from '../YearlyRecurrencePatternInput';

interface RecurrencePatternInputProps {
  eventObj: any,
  date: Date,
  updateEvent: any
}

const RecurrencePatternInput: React.FC<RecurrencePatternInputProps> = ({ eventObj, date, updateEvent }: RecurrencePatternInputProps) => {

  const renderAppropriateComponent = () => {

    switch (eventObj.recurrencePattern.frequency) {
      case "Daily":
        return <DailyRecurrencePatternInput event={eventObj} updateEvent={updateEvent} />
      case "Weekly":
        return <WeeklyRecurrencePatternInput event={eventObj} updateEvent={updateEvent} />
      case "Monthly":
        return <MonthlyRecurrencePatternInput event={eventObj} updateEvent={updateEvent} date={date} />
      case "Yearly":
        return <YearlyRecurrencePatternInput event={eventObj} updateEvent={updateEvent} date={date} />
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