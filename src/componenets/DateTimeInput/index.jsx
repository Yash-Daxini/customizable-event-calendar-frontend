import React from 'react'
import styles from './style.module.css';
import HourDropdown from '../HourDropdown'
import DateInput from '../DateInput';

const DateTimeInput = ({onDateChange,onHourChange,isDateDisable}) => {
    return (
        <div className={`${styles.dateTimeSelectionDiv}`}>
            <DateInput onChange={onDateChange} isDateDisable={isDateDisable} />
            <HourDropdown onChange={onHourChange} />
        </div>
    )
}

export default DateTimeInput