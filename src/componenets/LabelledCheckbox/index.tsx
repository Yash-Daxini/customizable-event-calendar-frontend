import React from 'react'
import styles from './style.module.css'

interface LabelledCheckboxProps {
    labelValue: string,
    inputValue: string,
    onChange: (event: any) => void
}

const LabelledCheckbox: React.FC<LabelledCheckboxProps> = ({ labelValue, inputValue, onChange }: LabelledCheckboxProps) => {
    return (
        <label className={`${styles.labelledCheckbox}`}>
            <input type='checkbox' value={inputValue} onChange={onChange} />
            <span>{labelValue}</span>
        </label>
    )
}

export default LabelledCheckbox