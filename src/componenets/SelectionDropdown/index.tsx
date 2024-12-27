import React from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import styles from './style.module.css';

export type OptionType = { label: string, value: string };

interface SelectionDropdownProps {
    isCloseMenuOnSelect: boolean,
    defaultValue: OptionType[],
    isMultiSelect: boolean,
    options: OptionType[],
    placeholder: string,
    icon: any
}

const SelectionDropdown: React.FC<SelectionDropdownProps> = ({ isCloseMenuOnSelect, defaultValue, isMultiSelect, options, placeholder, icon
}) => {

    const animatedComponents = makeAnimated();

    return (
        <div className={`${styles.inputDiv}`}>
          {icon}
            <Select
                closeMenuOnSelect={isCloseMenuOnSelect}
                components={animatedComponents}
                defaultValue={defaultValue}
                isMulti={isMultiSelect}
                options={options}
                placeholder={placeholder}
                className={`${styles.dropdown}`}
            />
        </div>
    )
}

export default SelectionDropdown
