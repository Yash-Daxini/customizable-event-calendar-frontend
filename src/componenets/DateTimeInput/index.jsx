import React from 'react'
import styles from './style.module.css';
import HourDropdown from '../HourDropdown'
import DateInput from '../DateInput';

const DateTimeInput = ({onDateChange,onHourChange,isDateDisable,initialDateValue,initialHourValue}) => {
    return (
        <div className={`${styles.dateTimeSelectionDiv}`}>
            <DateInput onChange={onDateChange} isDateDisable={isDateDisable} initialvalue={initialDateValue} />
            <HourDropdown onChange={onHourChange} initialValue={initialHourValue} />
        </div>
    )
}

export default DateTimeInput