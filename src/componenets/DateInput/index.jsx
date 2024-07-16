import React from 'react'
import styles from './style.module.css';

const DateInput = ({ onChange }) => {
    return (
        <input className={`${styles.dateInput}`} onChange={onChange} type='date' />
    )
}

export default DateInput