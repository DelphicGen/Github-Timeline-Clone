import React, { useEffect, useState, useMemo } from 'react'
import { month } from '../constants/constants'
import Rectangle from './atomic/Rectangle';

const Contribution = ({ commits }) => {
    const [dateHelper, setDateHelper] = useState({})
    const [timeline, setTimeLine] = useState(null)

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

    const getTimeLine = (date) => {
        
    //     axios
    //         .get('https://api.github.com/search/commits?q=committer-name:DelphicGen committer-date:2021-02-03', {
    //             "headers": {
    //                 "Accept" : "application/vnd.github.cloak-preview"
    //             }
    //         })
    //         .then(response => {
    //         })
        const tempTimeLine = []
        commits[date].forEach(commit => {
            tempTimeLine.push({time: commit.time.slice(11,19), message: commit.message})            
        })
        tempTimeLine.sort((a,b) => (a.time > b.time) ? -1 : ((b.time > a.time) ? 1 : 0))
        console.log(tempTimeLine)
    }

    return (
        <>
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
                                                        <Rectangle empty={(index === 0 && date !== firstD && !gotFirstD)} freq={commits[date] ? commits[date].length : 0} date={date} clickHandler={() => getTimeLine(date)} />
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
            {
                timeline && (
                    <>

                    </>
                )
            }
        </>
    )
}

export default Contribution
