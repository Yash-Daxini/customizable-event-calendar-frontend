import React from 'react'
import styles from './style.module.css';

const DateInput = ({ onChange, isDateDisable , initialvalue }) => {
    return (
        <input className={`${styles.dateInput}`} value={initialvalue.toISOString().split("T")[0]} onChange={onChange} type='date' disabled={isDateDisable} />
    )
}

export default DateInput