import React from 'react'
import styles from './style.module.css';
import DailyRecurrencePatternInput from '../DailyRecurrencePatternInput'
import WeeklyRecurrencePatternInput from '../WeeklyRecurrencePatternInput';
import MonthlyRecurrencePatternInput from '../MonthlyRecurrencePatternInput'
import YearlyRecurrencePatternInput from '../YearlyRecurrencePatternInput';
import { RecurringEventRequest } from '../../models/RecurringEventRequest';
import { Frequency } from '../../enums/Frequency';

interface RecurrencePatternInputProps {
  eventObj: RecurringEventRequest,
  date: Date,
  updateEvent: (recurringEvent: RecurringEventRequest) => void
}

const RecurrencePatternInput: React.FC<RecurrencePatternInputProps> = ({ eventObj, date, updateEvent }: RecurrencePatternInputProps) => {

  const renderAppropriateComponent = () => {

    switch (eventObj.recurrencePattern.frequency) {
      case Frequency.Daily:
        return <DailyRecurrencePatternInput event={eventObj} updateEvent={updateEvent} />
      case Frequency.Weekly:
        return <WeeklyRecurrencePatternInput recurringEvent={eventObj} updateEvent={updateEvent} />
      case Frequency.Monthly:
        return <MonthlyRecurrencePatternInput event={eventObj} updateEvent={updateEvent} date={date} />
      case Frequency.Yearly:
        return <YearlyRecurrencePatternInput recurringEvent={eventObj} updateEvent={updateEvent} date={date} />
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