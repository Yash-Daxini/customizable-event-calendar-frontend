import React from 'react'

const FormInput = ({ type, placeholder, value, onChange, labelValue }) => {
    return (
        <div className="form-floating mb-3">
            <input
                id="floatingInput"
                className={`form-control`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <label htmlFor="floatingInput">{labelValue}</label>
        </div>
    )
}

export default FormInput