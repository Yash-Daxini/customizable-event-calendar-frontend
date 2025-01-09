import React from 'react'
import styles from './style.module.css';
import DailyRecurrencePatternInput from '../DailyRecurrencePatternInput'
import WeeklyRecurrencePatternInput from '../WeeklyRecurrencePatternInput';
import MonthlyRecurrencePatternInput from '../MonthlyRecurrencePatternInput'
import YearlyRecurrencePatternInput from '../YearlyRecurrencePatternInput';
import { Frequency } from '../../enums/Frequency';
import { EventRequestModel } from '../../models/EventRequestModel';
import { DateType } from '../../common/types';

interface RecurrencePatternInputProps {
  event: EventRequestModel,
  date: DateType,
  updateEvent: React.Dispatch<React.SetStateAction<EventRequestModel>>
}

const RecurrencePatternInput: React.FC<RecurrencePatternInputProps> = ({ event: eventObj, date, updateEvent }: RecurrencePatternInputProps) => {

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