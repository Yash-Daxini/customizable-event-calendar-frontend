import React from 'react';
import styles from "./style.module.css";

interface IconedInputProps {
    icon: any,
    placeholder: string,
    inputValue: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const IconedInput: React.FC<IconedInputProps> = ({ icon, placeholder, onChange, inputValue }: IconedInputProps) => {
    return (
        <div className={`${styles.inputDiv}`}>
            {icon}
            <input
                className={`${styles.stringInput}`}
                value={inputValue}
                type="text"
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

export default IconedInput
