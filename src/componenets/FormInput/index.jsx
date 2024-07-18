import React from 'react'

const FormInput = ({ type, placeholder, value, onChange, labelValue }) => {
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