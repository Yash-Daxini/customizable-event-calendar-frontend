import React from 'react';
import styles from "./style.module.css";

interface IconedTextareaProps {
    icon: any,
    placeholder: string,
    inputValue: string,
    textAreaRows: number,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const IconedTextarea: React.FC<IconedTextareaProps> = ({ icon, placeholder, inputValue, textAreaRows, onChange }: IconedTextareaProps) => {
    return (
        <div className={`${styles.inputDiv}`}>
            {icon}
            <textarea
                className={`${styles.textarea}`}
                value={inputValue}
                typeof={"textarea"}
                rows={textAreaRows}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

export default IconedTextarea
