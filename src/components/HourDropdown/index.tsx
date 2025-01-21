import React, { useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select';
import styles from './style.module.css'
import { DropdownInput } from '../../common/types';

interface HourDropdownProps {
    onHourChange: React.Dispatch<React.SetStateAction<any>>
    initialValue: number
}

const HourDropdown: React.FC<HourDropdownProps> = ({ onHourChange: onHourChange, initialValue }: HourDropdownProps) => {

    const hours: DropdownInput[] = [];

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

    const [selectedTime, setSelectedTime] = useState<DropdownInput | undefined | null>();

    const handleChange = (selectedOption: DropdownInput | null) => {
        setSelectedTime(selectedOption);
        onHourChange(selectedOption?.value);
    }

    useEffect(() => {
        setSelectedTime(hours.find(hour => hour.value === initialValue));
    }, [initialValue])
    

    return (
        <div>
            <Select
                value={selectedTime}
                onChange={(value: SingleValue<DropdownInput>) => handleChange(value)}
                options={hours}
                className={`${styles.dropdown}`}
            />
        </div>
    )
}

export default HourDropdown