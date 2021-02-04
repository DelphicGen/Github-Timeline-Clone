import React, { useEffect, useState, useMemo } from 'react'
import { month } from '../constants/constants'
import Rectangle from './atomic/Rectangle';
import styles from './Contribution.module.css'

const Contribution = ({ commits }) => {
    const [dateHelper, setDateHelper] = useState({})
    const [timeline, setTimeLine] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)

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

    const convertDate = (date) => {
        const stringDate = `${date.slice(8,10)} ${month[date.slice(5, 7)]}, ${date.slice(0,4)}`
        return stringDate
    }

    const getTimeLine = (date) => {
        const tempTimeLine = []
        commits[date]?.forEach(commit => {
            tempTimeLine.push({time: commit.time.slice(11,19), message: commit.message})            
        })
        tempTimeLine.sort((a,b) => (a.time > b.time) ? -1 : ((b.time > a.time) ? 1 : 0))
        setTimeLine(tempTimeLine)
        setSelectedDate(convertDate(date))
    }

    return (
        <div className="max-w-full w-fit-content mx-auto mt-10 ">

            <div className="border border-gray-400 px-5 rounded-md">
                <div className="pt-10 pb-4 overflow-x-hidden overflow-y-hidden">
                    <div className="float-right flex">
                        <div className="flex flex-col text-white mr-5" style={{ fontSize: '10px' }}>
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
                                                        <div key={date} className="relative">
                                                            {dateKey === '0' && (month[date.slice(5, 7)] !== prevMonth ? prevMonth = month[date.slice(5, 7)] : false) && <span className="text-xs text-white absolute" style={{ top: '-180%', fontSize: '10px' }} >{month[date.slice(5, 7)]}</span>}
                                                            <Rectangle empty={(index === 0 && date !== firstD && !gotFirstD)} freq={commits[date] ? commits[date].length : 0} stringDate={convertDate(date)} clickHandler={() => getTimeLine(date)} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-white text-sm">Learn how we count contributions</p>
                                <div className="flex items-center">
                                    <span className="text-white mr-3 text-sm">Less</span>
                                    <div style={{width: '10px', height: '10px'}} className={`mx-1 bg-black`}></div>
                                    <div style={{width: '10px', height: '10px'}} className={`mx-1 bg-green-300`}></div>
                                    <div style={{width: '10px', height: '10px'}} className={`mx-1 bg-yellow-400`}></div>
                                    <div style={{width: '10px', height: '10px'}} className={`mx-1 bg-green-400`}></div>
                                    <span className="text-white ml-3 text-sm">More</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {
                timeline && (
                    <div className="timeline text-white mt-8">
                        <h3 className="font-bold text-xl border-b-4 border-blue-600 pb-2 mb-5">{selectedDate}</h3>
                            {
                                timeline.length === 0 ? <h5>Not commits during this period.</h5> : (
                                    <ul>
                                        {
                                            timeline.map((commit, index) => (
                                                <li key={index} className={`${styles.timeline__commit} relative w-1 pt-10 bg-blue-600`}>
                                                    <div className={`${styles.timeline__content} relative w-80 bg-blue-600 text-white font-bold py-5 px-10 ml-8 rounded-md`}>
                                                        <h5>{commit.time}</h5>
                                                        <h5>{commit.message}</h5>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                    </div>
                )
            }
        </div>
    )
}

export default Contribution
