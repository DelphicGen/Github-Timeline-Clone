import React, { useState, useEffect } from 'react'
import { month } from '../../constants/constants'

const Rectangle = ({ empty, freq, stringDate, clickHandler }) => {

    return (
        <div className="flex">
            {
                empty && <div style={{width: '10px', height: '10px'}} className='mr-1 mb-1'></div>
            }
            
            <div 
                style={{width: '10px', height: '10px'}} 
                className={`${freq === 0 ? 'bg-black' : (freq <= 5 ? 'bg-green-300' : freq <= 7 ? 'bg-yellow-400' : 'bg-green-400')} mr-1 mb-1 cursor-pointer relative group rounded-sm`} 
                onClick={clickHandler}
            >
                <p 
                    style={{ top: '150%', right: '-400%' }} 
                    className={`absolute text-xs z-10 bg-gray-900 rounded-md text-white text-center p-2 hidden group-hover:block w-40`}
                >
                    { stringDate }, {freq === 0 ? ' no contribution' : ` ${freq} contribution(s)`}
                </p>
            </div>
        </div>
    )
}

export default Rectangle
