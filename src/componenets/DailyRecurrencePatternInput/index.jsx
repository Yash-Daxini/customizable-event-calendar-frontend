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
        <label htmlFor="interval">Every </label>
        <Select
          defaultValue={intervals}
          onChange={e => setInterval(e)}
          options={intervals}
          className={`${styles.dropdown}`}
        />
        day(s)
      </div>

      <div className={`${styles.patternSelectionDiv}`}>
        <div className={`${styles.checkboxDiv}`}>
          <input className={`${styles.radioBtn}`} type='radio' name='patternType' value={`Every week day`} />
          <label htmlFor="weekday">Every weekday</label><br></br>
          <input type='checkbox' value={1} name='a' id={`${styles.mon}`} />
          <input type='checkbox' value={2} id={`${styles.tue}`} />
          <input type='checkbox' value={3} id={`${styles.wed}`} />
          <input type='checkbox' value={4} id={`${styles.thu}`} />
          <input type='checkbox' value={5} id={`${styles.fri}`} />
          <input type='checkbox' value={6} id={`${styles.sat}`} />
          <input type='checkbox' value={7} id={`${styles.sun}`} />

          <label htmlFor={`${styles.mon}`}>Mon</label>
          <label htmlFor={`${styles.tue}`}>Tue</label>
          <label htmlFor={`${styles.wed}`}>Wed</label>
          <label htmlFor={`${styles.thu}`}>Thu</label>
          <label htmlFor={`${styles.fri}`}>Fri</label>
          <label htmlFor={`${styles.sat}`}>Sat</label>
          <label htmlFor={`${styles.sun}`}>Sun</label>

        </div>
      </div>
    </div>
  )
}

export default DailyRecurrencePatternInput