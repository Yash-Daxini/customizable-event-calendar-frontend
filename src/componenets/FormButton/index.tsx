import React from 'react'
import styles from './style.module.css'

interface FormButtonProps {
    buttonText: string,
    onClick: any
}

const FormButton: React.FC<FormButtonProps> = ({ buttonText, onClick }: FormButtonProps) => {
    return (
        <div>
            <button type="submit" className={`${styles.formBtn}`} onClick={(e) => onClick(e)}>{buttonText}</button>
        </div>
    )
}

export default FormButton