import React from 'react'

const Rectangle = ({ empty, freq, date }) => {
    return (
        <div className="flex">
            {
                empty && <div style={{width: '10px', height: '10px'}} className='mr-1 mb-1'>

                </div>
            }
            <div style={{width: '10px', height: '10px'}} className={`${freq === 0 ? 'bg-black' : (freq <= 5 ? 'bg-green-300' : freq <= 7 ? 'bg-yellow-400' : 'bg-green-400')} mr-1 mb-1 cursor-pointer relative group`}>
                <p style={{ top: '150%', right: '-800%' }} className={`absolute text-xs z-50 bg-gray-900 rounded-md text-white text-center p-2 hidden group-hover:block w-40`}>
                    { date }, { freq } {freq === 0 ? ' commit' : ' commits'}
                </p>
            </div>
        </div>
    )
}

export default Rectangle
