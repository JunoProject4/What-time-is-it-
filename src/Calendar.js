import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars'

const TimeZone = (props) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectTime, setSelectTime] = useState(null);
    const [startDateAndTime, setStartDateAndTime] = useState(null);

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

    return (
        <div className="component timeZoneContainer">
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
    )
}

export default TimeZone;