import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars'

const TimeZone = (props) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectStartTime, setSelectStartTime] = useState(null);
    const [selectEndTime, setSelectEndTime] = useState(null);
    const [startDateAndTime, setStartDateAndTime] = useState(null);
    const [endDateAndTime, setEndDateAndTime] = useState(null);

    const { apiFinal } = props
    const [localTime, setLocalTime] = useState("")
    const [difference, setDifference] = useState([])

    const time = (new Date('01/01/2021 8:00 AM'));
    const minTime = (new Date('1/1/2021 8:00 AM'));
    const maxTime = (new Date('1/1/2021 7:00 PM'));

    const defineTime = (e) => {
        e.preventDefault();
        const newDate = new Date(selectedDate).toDateString()
        const newStartTime = new Date(selectStartTime).toTimeString().split(' ')[0]
        const newEndTime = new Date(selectEndTime).toTimeString().split(' ')[0]
        const definedStartDate = new Date(`${newDate} ${newStartTime}`)
        const definedEndDate = new Date(`${newDate} ${newEndTime}`)
        setStartDateAndTime(definedStartDate)
        setEndDateAndTime(definedEndDate)

        changeDate()
    }

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

    const changeDate = () => {
        const arrayDuplicate = [...difference]
        const arrayOfTimes = [];


        const different = arrayDuplicate.forEach(array => {
            if(array[2] > 0) {
                const timeZone = new Date(endDateAndTime)
                timeZone.setHours(timeZone.getHours()+array[2]/100)
                arrayOfTimes.push(timeZone)
            } else {
                const timeZone = new Date(startDateAndTime)
                timeZone.setHours(timeZone.getHours()+array[2]/100)
                arrayOfTimes.push(timeZone)
            }
        })
        console.log(arrayOfTimes)
    }

    return (
        <div className="component finalizingMeetingsContainer">
            <div className="calendar">
                <form action="#" method="#" className="myForm" name="myForm">
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        minDate={new Date()}
                        required
                    />
                </form>


                <div className="timePicker">

                
                    <TimePickerComponent
                    className="timePickerInput"
                        selected={selectStartTime}
                        onChange={time => setSelectStartTime(time.value)}
                        placeholder="Select a Start Time"
                        min={minTime}
                        max={maxTime}
                    />

                {
                    selectStartTime ?
                    <TimePickerComponent
                        selected={selectEndTime}
                        onChange={time => setSelectEndTime(time.value)}
                        placeholder="Select an End Time"
                        min={selectStartTime}
                        max={maxTime}
                    /> :
                    null
                }


                <button onClick={defineTime} className="setMeeting">Set Meeting</button>

                </div>
            </div>
            <div className="timeApiInfo">
                {/* <h3>{difference[0]} {difference[1]} {difference[2]}</h3> */}
                {
                    difference.map((x, index) => {
                        return (
                            <h3 key={index}>The time at {x[0][0]}, {x[0][1]} is {x[1]} and the difference is {x[2]}</h3>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default TimeZone;