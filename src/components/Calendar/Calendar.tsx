import { useEffect, useState } from 'react'
import './Calendar.css'

interface Props {
    date: Date,
    availableDates: [[number, number]],
    updateCalendar: (selectedDate: Date) => void
}

//array of months for calendar UI
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dayArr = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

//functional return of number of days in currently selected month - these are mapped out in the Calendar component
const monthDays = (currentMonth: number, currentYear: number) => {
    const limit = new Date(currentYear, currentMonth + 1, 0).getDate();
    let returnArr = [];
    for (let i = 1; i <= limit; i++) {
        returnArr.push(i)
    }
    return returnArr
}

const Calendar: React.FC<Props> = (props) => {
    const date = props.date;
    const [currentMonth, setCurrentMonth] = useState(date.getMonth());
    const [currentYear, setCurrentYear] = useState(date.getFullYear());
    const [tDays, setTDays] = useState<string[]>([]);

    //if incrementing through months take start and end of years into account
    const setCurrent = (num: number) => {
        if (num === 1) {
            if (currentMonth === 11) {
                setCurrentMonth(0)
                setCurrentYear(currentYear + 1)
            } else {
                setCurrentMonth(currentMonth + num)
            }
        }

        if (num === -1) {
            if (currentMonth === 0) {
                setCurrentMonth(11)
                setCurrentYear(currentYear - 1)
            } else {
                setCurrentMonth(currentMonth + num)
            }
        }
    }

    //calculate start day of the week in current Month
    useEffect(() => {
        let startDay = new Date(1, currentMonth, currentYear).getDay();

        let arr: string[] = [];
        for (let i = 0; i < dayArr.length; i++) {
            arr.push(dayArr[(i + startDay) % 7])
        }
        setTDays(arr)

    }, [currentMonth, currentYear])

    return (
        <div className="calendar">
            <div className="cal-ui-container">
                <hr />
                <div className="cal-header">
                    <button className="cal-nav-button"
                        onClick={() => setCurrent(-1)}
                    >
                        -
                    </button>

                    <h2>{months[currentMonth] + ' ' + currentYear}</h2>

                    <button className="cal-nav-button"
                        onClick={() => setCurrent(1)}
                    >
                        +
                    </button>
                </div>
                <hr />
                <div className="day-names">
                    {
                        tDays.map((day, i) => {
                            return <div key={"day-name" + i} className="day-name">{day}</div>
                        })
                    }
                </div>
                <div className="cal-days">
                    {
                        monthDays(currentMonth, currentYear).map((day, i) => {
                            let isAvailable = false;
                            props.availableDates.forEach(arr => {
                                if (arr[0] === day && arr[1] === currentMonth) {
                                    return isAvailable = true
                                }
                                return isAvailable
                            })
                            return (
                                <button
                                    className="day"
                                    key={'day' + i}
                                    onClick={() => {
                                        (isAvailable && new Date(currentYear, currentMonth, day) > new Date()) &&
                                            props.updateCalendar(new Date(currentYear, currentMonth, day))
                                    }}
                                    style={(day === date.getDate() && currentMonth === date.getMonth()) ? //if the date is the selected date
                                        { backgroundColor: 'var(--see-through)', color: 'var(--the-black)' } :
                                        (new Date(currentYear, currentMonth, day) <= new Date() || !isAvailable) ? //if the date is before todays date
                                            { color: '#999', backgroundColor: 'var(--see-through)', cursor: 'default' } :
                                            { width: '14%' }}
                                >
                                    {day}
                                </button>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Calendar