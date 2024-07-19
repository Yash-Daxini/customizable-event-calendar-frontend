import React, { useState } from 'react'
import styles from './style.module.css'
import Select from 'react-select'
import LabelledCheckbox from '../LabelledCheckbox';

const WeeklyRecurrencePatternInput = () => {

    const intervals = [];

    for (let i = 1; i <= 5; i++) {
        intervals.push({ value: i, label: i });
    }

    const [interval, setInterval] = useState(intervals[0].value);

    return (
        <div>
            <div className={`${styles.patternSelectionDiv}`}>
                <label htmlFor="interval">Every </label>
                <Select
                    defaultValue={intervals}
                    onChange={e => setInterval(e)}
                    options={intervals}
                    className={`${styles.dropdown}`}
                />
                Week(s)
            </div>
            <div className={`${styles.patternSelectionDiv}`}>
                <label htmlFor="weekday">Select weekdays</label>

                <LabelledCheckbox labelValue={"Mon"} inputValue={1} onChange={(e) => console.warn(e.target.checked)} />
                <LabelledCheckbox labelValue={"Tue"} inputValue={2} onChange={(e) => console.warn(e.target.checked)} />
                <LabelledCheckbox labelValue={"Wed"} inputValue={3} onChange={(e) => console.warn(e.target.checked)} />
                <LabelledCheckbox labelValue={"Thu"} inputValue={4} onChange={(e) => console.warn(e.target.checked)} />
                <LabelledCheckbox labelValue={"Fri"} inputValue={5} onChange={(e) => console.warn(e.target.checked)} />
                <LabelledCheckbox labelValue={"Sat"} inputValue={6} onChange={(e) => console.warn(e.target.checked)} />
                <LabelledCheckbox labelValue={"Sun"} inputValue={7} onChange={(e) => console.warn(e.target.checked)} />

            </div>
        </div>
    )
}

export default WeeklyRecurrencePatternInput