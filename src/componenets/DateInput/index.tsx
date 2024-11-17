import React from 'react'
import styles from './style.module.css';

interface DateInputProps {
    onChange: any,
    isDateDisable: any,
    initialValue: any
}

const DateInput: React.FC<DateInputProps> = ({ onChange, isDateDisable, initialValue }: DateInputProps) => {
    return (
        <input className={`${styles.dateInput}`} value={initialValue.toISOString().split("T")[0]} onChange={onChange} type='date' disabled={isDateDisable} />
    )
}

export default DateInput