import React, { ChangeEvent } from 'react'
import styles from './style.module.css';

interface DateInputProps {
    onDateChange: (event: ChangeEvent<HTMLInputElement>) => void,
    isDateDisable: boolean,
    initialValue: string
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange: onChange, isDateDisable, initialValue }: DateInputProps) => {
    return (
        <input className={`${styles.dateInput}`}
            value={initialValue}
            onChange={onChange}
            type='date'
            disabled={isDateDisable}
        />
    )
}

export default DateInput