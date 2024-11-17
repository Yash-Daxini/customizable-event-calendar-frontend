import React from 'react'

interface FormInputProps {
    type: string,
    placeholder: string,
    value: string,
    onChange: any,
    labelValue: string
}

const FormInput: React.FC<FormInputProps> = ({ type, placeholder, value, onChange, labelValue }: FormInputProps) => {
    return (
        <div className="form-floating mb-3">
            <input
                id={`floatingInput${placeholder}`}
                className={`form-control`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={`floatingInput${placeholder}`}>{labelValue}</label>
        </div>
    )
}

export default FormInput