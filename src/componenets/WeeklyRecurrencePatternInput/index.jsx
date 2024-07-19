import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Select from 'react-select'
import LabelledCheckbox from '../LabelledCheckbox';

const WeeklyRecurrencePatternInput = ({ event, updateEvent }) => {

    const intervals = [];

    for (let i = 1; i <= 5; i++) {
        intervals.push({ value: i, label: i });
    }

    const [interval, setInterval] = useState(intervals[0].value);
    const [weekDay, setWeekDay] = useState([]);

    useEffect(() => {
        updateEvent({ ...event, recurrencePattern: { ...event.recurrencePattern, interval: interval, byWeekDay: weekDay } })
    }, [weekDay, interval])

    const changeWeekDayArray = (e) => {
        if (e.target.checked)
            setWeekDay([...weekDay, e.target.value])
        else
            setWeekDay(weekDay.filter(x => x != e.target.value))
    };

    return (
        <div>
            <div className={`${styles.patternSelectionDiv}`}>
                <label htmlFor="interval">Every </label>
                <Select
                    defaultValue={intervals}
                    onChange={e => setInterval(e.value)}
                    options={intervals}
                    className={`${styles.dropdown}`}
                />
                Week(s)
            </div>
            <div className={`${styles.patternSelectionDiv}`}>
                <label htmlFor="weekday">Select weekdays</label>

                <LabelledCheckbox labelValue={"Mon"} inputValue={1} onChange={(e) => changeWeekDayArray(e)} />
                <LabelledCheckbox labelValue={"Tue"} inputValue={2} onChange={(e) => changeWeekDayArray(e)} />
                <LabelledCheckbox labelValue={"Wed"} inputValue={3} onChange={(e) => changeWeekDayArray(e)} />
                <LabelledCheckbox labelValue={"Thu"} inputValue={4} onChange={(e) => changeWeekDayArray(e)} />
                <LabelledCheckbox labelValue={"Fri"} inputValue={5} onChange={(e) => changeWeekDayArray(e)} />
                <LabelledCheckbox labelValue={"Sat"} inputValue={6} onChange={(e) => changeWeekDayArray(e)} />
                <LabelledCheckbox labelValue={"Sun"} inputValue={7} onChange={(e) => changeWeekDayArray(e)} />

            </div>
        </div>
    )
}

export default WeeklyRecurrencePatternInput