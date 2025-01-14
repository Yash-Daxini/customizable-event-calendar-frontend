import React from 'react'
import styles from './style.module.css'

interface LabelledCheckboxProps {
    labelValue: string,
    inputValue: string,
    isChecked: boolean,
    onChange: React.Dispatch<React.SetStateAction<any>>
}

const LabelledCheckbox: React.FC<LabelledCheckboxProps> = ({ labelValue, inputValue, isChecked, onChange }: LabelledCheckboxProps) => {
    return (
        <label className={`${styles.labelledCheckbox}`}>
            <input type='checkbox' checked={isChecked} value={inputValue} onChange={onChange} />
            <span>{labelValue}</span>
        </label>
    )
}

export default LabelledCheckbox