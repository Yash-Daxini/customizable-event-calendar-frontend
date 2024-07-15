import React from 'react'
import styles from './style.module.css'

const FormButton = ({ buttonText , onClick }) => {
    return (
        <div>
            <button type="submit" className={`${styles.formBtn}`} onClick={(e) => onClick(e)}>{buttonText}</button>
        </div>
    )
}

export default FormButton