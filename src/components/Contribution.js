import React, { useEffect, useState, useMemo } from 'react'
import Rectangle from './atomic/Rectangle';

const Contribution = ({ commits }) => {
    const [dateHelper, setDateHelper] = useState({})

    const currentD = useMemo(() => new Date(), [])
    
    const temp = useMemo(() => {
        const currentYear = currentD.getFullYear(), currentMonth = currentD.getMonth(), currentDate = currentD.getDate()
        return new Date(currentYear - 1, currentMonth, currentDate)
    }, [currentD])

    const firstD = useMemo(() => {
        const tempY = temp.getFullYear(), tempM = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : (temp.getMonth() + 1), tempD = temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()
        return `${tempY}-${tempM}-${tempD}`
    }, [temp])

    let prevMonth = ''
    let gotFirstD = false
    
    const month = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Des'
    }

    useEffect(() => {
        
        const tempDateHelper = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: []
        }

        for (let d = temp; d <= currentD; d.setDate(d.getDate() + 1)) {
            const year = d.getFullYear(), month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1), date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
            const result = `${year}-${month}-${date}`
            
            tempDateHelper[d.getDay()].push(result)
        }
        setDateHelper(tempDateHelper)

    }, [])

    return (
        <div className="mt-10 border border-gray-400 pt-10 pl-5 pb-4 pr-4 w-fit-content mx-auto rounded-md flex">
            <div className="flex flex-col text-white text-xs mr-5">
                <span style={{width: '10px', height: '10px'}}></span>
                <span className="mb-1">Mon</span>
                <span style={{width: '10px', height: '10px'}}></span>
                <span className="mb-1">Wed</span>
                <span style={{width: '10px', height: '10px'}}></span>
                <span className="mb-1">Fri</span>
                <span style={{width: '10px', height: '10px'}}></span>
            </div>

            <div>
                {
                    Object.keys(dateHelper).map((dateKey) => {
                        return (
                            <div key={dateKey} className="flex">
                                {
                                    dateHelper[dateKey].map((date, index) => {
                                        if(date === firstD) gotFirstD = true
                                        return (
                                            <div 
                                            key={date}className="relative">
                                                {dateKey === '0' && (month[date.slice(5, 7)] !== prevMonth ? prevMonth = month[date.slice(5, 7)] : false) && <span className="text-xs text-white absolute" style={{top: '-180%'}} >{month[date.slice(5, 7)]}</span>}
                                                <Rectangle empty={(index === 0 && date !== firstD && !gotFirstD)} freq={commits[date] ? commits[date].length : 0} date={date} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                <div className="flex justify-end items-center mt-2">
                    <span className="text-white mr-3 text-sm">Less</span>
                    <div style={{width: '10px', height: '10px'}} className={`mx-1 bg-black`}></div>
                    <div style={{width: '10px', height: '10px'}} className={`mx-1 bg-green-300`}></div>
                    <div style={{width: '10px', height: '10px'}} className={`mx-1 bg-yellow-400`}></div>
                    <div style={{width: '10px', height: '10px'}} className={`mx-1 bg-green-400`}></div>
                    <span className="text-white ml-3 text-sm">More</span>
                </div>
            </div>
        </div>
    )
}

export default Contribution
