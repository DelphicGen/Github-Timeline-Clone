import React from 'react'

const Rectangle = ({ empty, freq }) => {
    return (
        <div className="flex">
            {
                empty && <div style={{width: '10px', height: '10px'}} className='mr-1 mb-1'>

                </div>
            }
            <div style={{width: '10px', height: '10px'}} className={`${freq === 0 ? 'bg-black' : (freq <= 5 ? 'bg-green-300' : freq <= 7 ? 'bg-yellow' : 'bg-green-400')} mr-1 mb-1 cursor-pointer`}>

            </div>
        </div>
    )
}

export default Rectangle
