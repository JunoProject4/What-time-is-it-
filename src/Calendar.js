import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars'

const TimeZone = (props) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectTime, setSelectTime] = useState(null);
    const [startDateAndTime, setStartDateAndTime] = useState(null);

    const { apiFinal } = props
    const [localTime, setLocalTime] = useState("")
    const [difference, setDifference] = useState([])

    const startTime = () => {
        const newDate = new Date(selectedDate).toDateString()
        const newTime = new Date(selectTime).toLocaleTimeString().split(' ')[0]
        const definedDate = new Date(`${newDate} ${newTime}`)
        setStartDateAndTime(definedDate)
    }

    console.log(startDateAndTime);


    // useEffect(() => {
    //     props.setWelcome(false)
    // }, [])
    useEffect(() => {
        let time = [Date().substring(16, 24), Date().substring(28,33)]
        let timeDifference = apiFinal.filter(x => x.length === 3).map(y => y = [y[0] , y[1] , (y[2] - time[1] )])
        
        setDifference(timeDifference)
    }, [])


    useEffect(() => {
        let time = Date().substring(16, 24)
        setLocalTime(time)
    }, [])

    return (
        <div className="component finalizingMeetingsContainer">
            <div className="calendar">
                <form action="#" method="#" className="myForm" name="myForm">
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        minDate={new Date()}
                    />
                </form>

                <form action="#"></form>
                <TimePickerComponent
                    selected={selectTime}
                    onChange={time => setSelectTime(time.value)}
                    placeholder="Select a Time"
                />

                <button onClick={startTime}></button>
            </div>
            <div className="timeApiInfo">
                {/* <h3>{difference[0]} {difference[1]} {difference[2]}</h3> */}
                {
                    difference.map((x, index) => {
                        return (
                            <h3 key={index}>The time at {x[0]} is {x[1]} and the difference is {x[2]}</h3>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default TimeZone;