import React from 'react'
import styles from './style.module.css'

const LabelledCheckbox = ({ labelValue, inputValue, onChange }) => {
    return (
        <label className={`${styles.labelledCheckbox}`}>
            <input type='checkbox' value={inputValue} onChange={onChange} />
            <span>{labelValue}</span>
        </label>
    )
}

export default LabelledCheckbox