import React, { ChangeEvent } from 'react'
import styles from './style.module.css';
import { DateType } from '../../common/types';
import { getDisplayFormatDate } from '../../util/DateUtil';

interface DateInputProps {
    onDateChange: (event: ChangeEvent<HTMLInputElement>) => void,
    isDateDisable: boolean,
    initialValue: DateType
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange: onChange, isDateDisable, initialValue }: DateInputProps) => {
    return (
        <input className={`${styles.dateInput}`} value={getDisplayFormatDate((initialValue))} onChange={onChange} type='date' disabled={isDateDisable} />
    )
}

export default DateInput