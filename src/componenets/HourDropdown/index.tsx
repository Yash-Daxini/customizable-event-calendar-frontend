import React, { useState } from 'react'
import Select from 'react-select';
import styles from './style.module.css'

interface HourDropdownProps {
    onChange: any,
    initialValue: number
}

const HourDropdown: React.FC<HourDropdownProps> = ({ onChange, initialValue }: HourDropdownProps) => {

    const hours = [];

    hours.push({ value: 0, label: `12:00 AM` });

    for (let i = 1; i < 12; i++) {
        const hour = i < 10 ? `0${i}:00 AM` : `${i}:00 AM`;
        hours.push({ value: i, label: hour });
    }

    hours.push({ value: 12, label: `12:00 PM` });

    for (let i = 1; i <= 11; i++) {
        const hour = i < 10 ? `0${i}:00 PM` : `${i}:00 PM`;
        hours.push({ value: i + 12, label: hour });
    }

    const [selectedTime, setSelectedTime] = useState(hours.filter(hour => hour.value == initialValue));

    const handleChange = (selectedOption: any) => {
        setSelectedTime(selectedOption);
        onChange(selectedOption.value);
    }

    return (
        <div>
            <Select
                defaultValue={selectedTime}
                onChange={handleChange}
                options={hours}
                className={`${styles.dropdown}`}
            />
        </div>
    )
}

export default HourDropdown