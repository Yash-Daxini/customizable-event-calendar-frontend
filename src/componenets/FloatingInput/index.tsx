import React from 'react'

interface FormInputProps {
    type: string,
    placeholder: string,
    value: string,
    onChange: (event: any) => void,
    labelValue: string,
    autoComplete?: string
}

const FloatingInput: React.FC<FormInputProps> = ({ type, placeholder, value, onChange, labelValue, autoComplete }: FormInputProps) => {
    return (
        <div className="form-floating mb-3">
            <input
                id={`floatingInput${placeholder}`}
                className={`form-control`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
            />
            <label htmlFor={`floatingInput${placeholder}`}>{labelValue}</label>
        </div>
    )
}

export default FloatingInput