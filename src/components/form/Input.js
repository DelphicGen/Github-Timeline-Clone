import React from 'react'

const Input = ({ name, type, required, value, onChange, placeholder, className }) => {
    return (
        <>
            <input 
                name={name} 
                value={value} 
                onChange={onChange}
                placeholder={placeholder}
                className={`border-b border-blue-600 ${className && className} focus:outline-none p-2 bg-transparent block text-white w-max-full`} 
                id={name} 
                type={type ? type : 'text'} 
                required={required ? true : false} 
            /> 
            <div className={`transform scale-x-0 focused-sibling:scale-x-100 focused-sibling:origin-right border-b border-blue-600 duration-200 ease-in-out ${className && className}`}></div>
        </>
    )
}

export default Input
