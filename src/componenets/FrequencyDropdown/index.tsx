import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import styles from './style.module.css'
import { Frequency } from '../../enums/Frequency'
import { DropdownInput } from '../../common/types'

interface FrequencyDropdownProps {
    onChange: React.Dispatch<React.SetStateAction<string>>
    initialValue: string
}

const FrequencyDropdown: React.FC<FrequencyDropdownProps> = ({ onChange, initialValue }: FrequencyDropdownProps) => {

    let frequencies: DropdownInput[] = [
        { value: Frequency.None, label: "No Repeat" },
        { value: Frequency.Daily, label: "Daily" },
        { value: Frequency.Weekly, label: "Weekly" },
        { value: Frequency.Monthly, label: "Monthly" },
        { value: Frequency.Yearly, label: "Yearly" }
    ];

    const [selectedFrequency, setSelectedFrequency] = useState<DropdownInput | undefined>(frequencies[0]);

    const customStyles = {
        control: (defaultStyles: any) => ({
            ...defaultStyles,
            '::before': {
                fontFamily: 'Material Symbols Outlined',
                content: "'\\Eb7B'",
                position: 'absolute',
                left: 0,
                fontSize: `30px`,
                color: `#000`,
                padding: '0px'
            },
            paddingLeft: '30px'
        }),
    };

    useEffect(() => {
        setSelectedFrequency(frequencies.find(freq => freq.value == initialValue))
        onChange(selectedFrequency!.value)
    }, [initialValue])

    const handleChange = (selectedOption: any) => {
        setSelectedFrequency(selectedOption)
        onChange(selectedOption.value);
    };

    return (
        <Select
            value={selectedFrequency}
            onChange={handleChange}
            options={frequencies}
            className={`${styles.dropdown}`}
            styles={customStyles}
        />
    )
}

export default FrequencyDropdown