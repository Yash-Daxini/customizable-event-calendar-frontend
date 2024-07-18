import React from 'react'
import styles from './style.module.css';
import DailyRecurrencePatternInput from '../DailyRecurrencePatternInput'

const RecurrencePatternInput = ({eventObj}) => {
  return (
    <div className={`${styles.mainDiv}`}>
        {eventObj.frequency === 'Daily' 
            ? <DailyRecurrencePatternInput />
            : <></>
        }
    </div>
  )
}

export default RecurrencePatternInput