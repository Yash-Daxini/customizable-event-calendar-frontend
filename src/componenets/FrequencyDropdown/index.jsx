import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import styles from './style.module.css'

const FrequencyDropdown = ({ onChange, initialValue }) => {

    let frequencies = [
        { value: "None", label: "No Repeat" },
        { value: "Daily", label: "Daily" },
        { value: "Weekly", label: "Weekly" },
        { value: "Monthly", label: "Monthly" },
        { value: "Yearly", label: "Yearly" }
    ];

    const [selectedFrequency, setSelectedFrequency] = useState(frequencies.find(freq => freq.value === initialValue));

    const customStyles = {
        control: (defaultStyles) => ({
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
        onChange(selectedFrequency.value)
    }, [])

    const handleChange = (selectedOption) => {
        setSelectedFrequency(selectedOption)
        onChange(selectedOption.value);
    };

    return (
        <Select
            defaultValue={selectedFrequency}
            onChange={handleChange}
            options={frequencies}
            className={`${styles.dropdown}`}
            styles={customStyles}
        />
    )
}

export default FrequencyDropdown