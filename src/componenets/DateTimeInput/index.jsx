import React from 'react'
import styles from './style.module.css';
import HourDropdown from '../HourDropdown'
import DateInput from '../DateInput';

const DateTimeInput = ({onDateChange,onHourChange}) => {
    return (
        <div className={`${styles.dateTimeSelectionDiv}`}>
            <DateInput onChange={onDateChange} />
            <HourDropdown onChange={onHourChange} />
        </div>
    )
}

export default DateTimeInput