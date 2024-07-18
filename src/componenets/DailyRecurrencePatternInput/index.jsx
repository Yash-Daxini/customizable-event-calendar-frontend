import React, { useState } from 'react'
import styles from './style.module.css'
import Select from 'react-select';

const DailyRecurrencePatternInput = () => {
  const intervals = [];

  for (let i = 1; i <= 5; i++) {
    intervals.push({ value: i, label: i });
  }

  const [interval, setInterval] = useState(intervals[0].value);

  return (
    <div>
      <div className={`${styles.patternSelectionDiv}`}>
        <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={`Every nth day`} />
        <label for="interval">Every </label>
        <Select
          defaultValue={intervals}
          onChange={e => setInterval(e)}
          options={intervals}
          className={`${styles.dropdown}`}
        />
      </div>

      <br></br>
      <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={`Every week day`} />
      <label for="weekday">Every weekday</label><br></br>
    </div>
  )
}

export default DailyRecurrencePatternInput