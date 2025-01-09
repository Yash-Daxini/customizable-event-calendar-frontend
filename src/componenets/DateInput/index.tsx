import React from 'react'
import styles from './style.module.css';
import { DateType } from '../../common/types';

interface DateInputProps {
    onDateChange: React.Dispatch<React.SetStateAction<any>>,
    isDateDisable: boolean,
    initialValue: DateType
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange: onChange, isDateDisable, initialValue }: DateInputProps) => {
    return (
        <input className={`${styles.dateInput}`} value={initialValue.toISOString().split("T")[0]} onChange={onChange} type='date' disabled={isDateDisable} />
    )
}

export default DateInput