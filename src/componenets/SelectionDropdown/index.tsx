import React from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import styles from './style.module.css';
import { DropdownInput } from '../../common/types';

interface SelectionDropdownProps {
    isCloseMenuOnSelect: boolean,
    value: DropdownInput[],
    isMultiSelect: boolean,
    options: DropdownInput[],
    placeholder: string,
    icon: any,
    onChange: (value: any) => void
}

const SelectionDropdown: React.FC<SelectionDropdownProps> = ({ isCloseMenuOnSelect, value, isMultiSelect, options, placeholder, icon, onChange
}) => {

    const animatedComponents = makeAnimated();

    return (
        <div className={`${styles.inputDiv}`}>
            {icon}
            <Select
                closeMenuOnSelect={isCloseMenuOnSelect}
                components={animatedComponents}
                value={value}
                isMulti={isMultiSelect}
                options={options}
                placeholder={placeholder}
                className={`${styles.dropdown}`}
                onChange={onChange}
            />
        </div>
    )
}

export default SelectionDropdown
