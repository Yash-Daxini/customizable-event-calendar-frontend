import React from 'react'
import styles from './style.module.css';

const DateInput = ({ onChange, isDateDisable }) => {
    return (
        <input className={`${styles.dateInput}`} onChange={onChange} type='date' disabled={isDateDisable} />
    )
}

export default DateInput