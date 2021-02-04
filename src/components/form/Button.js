import React from 'react'

const Button = ({ className, buttonText, clickHandler }) => {
    return (
        <button className={`${className && className} bg-blue-600 text-white px-5 py-2 rounded-md`} onClick={clickHandler}>
            { buttonText }
        </button>
    )
}

export default Button
