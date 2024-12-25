import React from 'react'
import styles from './style.module.css';

interface DateInputProps {
    onDateChange: (event:any) => void,
    isDateDisable: boolean,
    initialValue: Date
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange: onChange, isDateDisable, initialValue }: DateInputProps) => {
    return (
        <input className={`${styles.dateInput}`} value={initialValue.toISOString().split("T")[0]} onChange={onChange} type='date' disabled={isDateDisable} />
    )
}

export default DateInput