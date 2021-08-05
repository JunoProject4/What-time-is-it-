import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { useHistory } from 'react-router'

const TimeZone = (props) => {

    console.log(props)

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectStartTime, setSelectStartTime] = useState(null);
    const [selectEndTime, setSelectEndTime] = useState(null);
    const [arrayOfTimes, setArrayOfTimes] = useState([]);
    const [approvedTime, setApprovedTime] = useState(false);

    const history = useHistory()

    console.log(approvedTime)
    console.log(arrayOfTimes)

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

        const arrOfTimesToState = [];

        difference.forEach(array => {
            const startTimeZone = new Date(definedStartDate)
            const endTimeZone = new Date(definedEndDate)
            startTimeZone.setHours(startTimeZone.getHours()+array[2]/100)
            endTimeZone.setHours(endTimeZone.getHours()+array[2]/100)
            const timeObj = {
                    location: array[0], 
                    meetingDate: `${startTimeZone.toString().substring(0, 15)}`,
                    meetingTime: `${startTimeZone.toString().substring(16, 24)}`,
                    startTimeIso: startTimeZone.toISOString(),
                    endTimeIso: endTimeZone.toISOString(),
                    startTime: startTimeZone,
                    endTime: endTimeZone,
                    timeDifference: array[2]/100
                }
            arrOfTimesToState.push(timeObj)
        })
        setArrayOfTimes(arrOfTimesToState);

        arrOfTimesToState.forEach(arr => {
            if(arr.startTime.getHours() < 8) {
                alert(`This time is too early for ${arr.location}.  We suggest moving the meeting forward by ${8-arr.startTime.getHours()} hours to accomodate for the time difference.`)
            }
            if (arr.endTime.getHours() > 19) {
                alert(`This time is too late for ${arr.location}.  We suggest moving the meeting back by ${arr.endTime.getHours()-19} hours to accomodate for the time difference.`)
            }
        })

        const checker = (array) => array.every(arr => {
            return arr.startTime.getHours() >= 8 && arr.endTime.getHours() <= 19;
        });
        if(checker(arrOfTimesToState)) {
            alert(`The meeting falls within the alloted time in all timezones`)
        }
        setApprovedTime(checker(arrOfTimesToState));
    }

    const onSubmitDates = () => {
        history.push('/Meetings');
        props.setMeetingInfo(arrayOfTimes)
    }

    // useEffect(() => {
    //     props.setWelcome(false)
    // }, [])
    useEffect(() => {
        let time = [Date().substring(16, 24), Date().substring(28,33)]
        let timeDifference = apiFinal.filter(x => x.length === 3).map(y => y = [y[0] , y[1] , (y[2] - time[1] )])
        
        setDifference(timeDifference)
    }, [apiFinal])


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
                        required
                    />
                </form>


                <div className="timePicker">

                
                    <TimePickerComponent
                    className="timePicker"
                        selected={selectStartTime}
                        onChange={time => {
                            setSelectStartTime(time.value)
                            setApprovedTime(false)
                        }}
                        placeholder="Select a Start Time"
                        min={minTime}
                        max={maxTime}
                    />

                {
                    selectStartTime ?
                    <TimePickerComponent
                        selected={selectEndTime}
                        onChange={time => {
                            setSelectEndTime(time.value)
                            setApprovedTime(false)
                        }}
                        placeholder="Select an End Time"
                        min={selectStartTime}
                        max={maxTime}
                    /> :
                    null
                }

                {
                    approvedTime ?
                    <button onClick={onSubmitDates}>Set Meeting</button> : 
                    <button onClick={defineTime} className="setMeeting">Check Availability</button>
                }

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