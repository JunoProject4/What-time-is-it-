import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { useHistory } from 'react-router'
import { FaCalendarWeek } from 'react-icons/fa';
import Swal from 'sweetalert2';

const TimeZone = (props) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectStartTime, setSelectStartTime] = useState(null);
    const [selectEndTime, setSelectEndTime] = useState(null);
    const [arrayOfTimes, setArrayOfTimes] = useState([]);
    const [approvedTime, setApprovedTime] = useState(false);
    const [meetingName, setMeetingName] = useState('');
    const history = useHistory()
    const { apiFinal } = props
    const [difference, setDifference] = useState([])
    const [errorArray, setErrorArray] = useState([])

    const minTime = (new Date('1/1/2021 8:00 AM'));
    const maxTime = (new Date('1/1/2021 7:00 PM'));

    // This runs when user clicks "check availability".  This function acts as the primary function for comparing user selected time against selected timezones.  
    const defineTime = (e) => {
        e.preventDefault();
        //Grab the selectedDate and selectedStartTime/selectedEndTime values that are saved in state from user input. These are processed through new Date functions to format them in a way that we can gather the info that we need
        const newDate = new Date(selectedDate).toDateString()
        const newStartTime = new Date(selectStartTime).toTimeString().split(' ')[0]
        const newEndTime = new Date(selectEndTime).toTimeString().split(' ')[0]
        // The above values are then processed through new Date functions that combine the selected day AND time, so we have a saved variable of the the start day and time, and the end day and time.
        const definedStartDate = new Date(`${newDate} ${newStartTime}`)
        const definedEndDate = new Date(`${newDate} ${newEndTime}`)

        const arrOfTimesToState = [];

        // We run through the difference array, which is an array that hold information from the passed it data of the api call, including designated city location, current in that area, and time difference.
        difference.forEach(array => {
            const startTimeZone = new Date(definedStartDate)
            const endTimeZone = new Date(definedEndDate)
            //Here we are comparing the user selected startTimes and endTimes against the hour time difference. This is divided by 100, because the info that was passed on was given in 100s
            startTimeZone.setHours(startTimeZone.getHours() + array[2] / 100)
            endTimeZone.setHours(endTimeZone.getHours() + array[2] / 100)
            // This is the object that will get passed forward into the meetings component through props.  It's all the information we needed to gather about the meeting, including location, meeting time, meeting date, etc.  This then gets pushed into arrOfTimesToState empty array, which is then saved in state.
            const timeObj = {
                location: array[0],
                meetingDate: `${startTimeZone.toString().substring(0, 15)}`,
                meetingTime: `${startTimeZone.toString().substring(16, 24)}`,
                startTimeIso: startTimeZone.toISOString(),
                endTimeIso: endTimeZone.toISOString(),
                startTime: startTimeZone,
                endTime: endTimeZone,
                timeDifference: array[2] / 100
            }
            arrOfTimesToState.push(timeObj)
        })
        setArrayOfTimes(arrOfTimesToState);

        // This is the error handling for matching the user selected time against the timezones.  We loop through the array that is holding all the info from above.
        arrOfTimesToState.forEach(arr => {
            // If the designated location time is before 8, they will be met with a modal that explains it's too early and how much to move it by
            if (arr.startTime.getHours() < 8) {
                Swal.fire({
                    title: 'Sorry!',
                    text: `This time is too early for ${arr.location}.  We suggest moving the meeting forward by ${8 - arr.startTime.getHours()} ${8 - arr.startTime.getHours() === 1 ? 'hour' : 'hours'} to accomodate for the time difference.`,
                    icon: 'error',
                    confirmButtonText: "Ok"

                })
            }
            //If the designated location time is after 7pm, they will be met with a modal that explains its too late and how much to move it by
            if (arr.endTime.getHours() > 19) {
                Swal.fire({
                    title: 'Sorry!',
                    text: `This time is too late for ${arr.location}.  We suggest moving the meeting back by ${arr.endTime.getHours() - 19} ${arr.endTime.getHours() - 19 === 1 ? 'hour' : 'hours'} to accomodate for the time difference.`,
                    icon: 'error',
                    confirmButtonText: "Ok"
                })
            }
        })

        // This function check runs to make sure that every array passes the condition of their hours being 8 or later, and 7pm  or earlier.  If all designated times pass this time, the user will be shown a modal that tells them that all times are successful for the meeting.
        const checker = (array) => array.every(arr => {
            return arr.startTime.getHours() >= 8 && arr.endTime.getHours() <= 19;
        });
        if (checker(arrOfTimesToState)) {
            Swal.fire({
                title: 'Success!',
                text: "The meeting falls within the alloted time in all timezones",
                icon: "success",
                confirmButtonText: "Ok"
            })
        }
        // this will pass to state all the arrays of times and dates and all data about each meeting only if they meet all conditions.
        setApprovedTime(checker(arrOfTimesToState));
    }

    //This runs on "Set Meeting" button.  It displays a modal that asks user for the name of meeting.  Error handling is provided to ensure info is passed through.  If infro is passed through, it'll add the title to an object of information that is passed to meeting component so that when a meeting is displayed, it'll have the purpose of the meeting appear
    const onSubmitDates = () => {

        Swal.fire({
            title: 'Enter your Meeting Name',
            input: 'text',
            inputLabel: 'Your Meeting Name',
            inputValue: "My Meeting",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter Meeting Name!'
                } else {
                    const copyArray = [...arrayOfTimes]
                    copyArray.forEach(time => {
                        time.title = value;
                    })
                    props.setMeetingName(value)
                    props.setMeetingInfo(copyArray)
                    history.push('/Meetings');
                }
            }
        })
    }

    useEffect(() => {
        let time = [Date().substring(16, 24), Date().substring(28, 33)]
        let timeDifference = apiFinal.filter(x => x.length === 3).map(y => y = [y[0], y[1], (y[2] - time[1])])
        let error = []
        apiFinal.filter(x => x.length === 2).map(y => error.push(`${y[0]}, `))
        setDifference(timeDifference)
        setErrorArray(error)
    }, [])

    return (
        <div className="component finalizingMeetingsContainer">
            <div className="calendar">

                <h2 className="calendarHeading">Calendar</h2>
                <form action="#" method="#" className="myCalendarForm" name="myForm">
                    <FaCalendarWeek className="icons calendarIcon" />
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
                            <button onClick={onSubmitDates} className="meetingSetBtn">Set Meeting</button> :
                            <button onClick={defineTime} className="setMeeting">Check Availability</button>
                    }

                </div>
                <div className="timeApiInfo">
                    {
                        difference.map((x, index) => {
                            return (
                                <div className="apiHeadings">
                                    <h3 key={index}>The time at {x[0][0]}, {x[0][1]} is {x[1]} and the difference is {x[2]/100} Hrs</h3>
                                </div>
                            )
                        })
                    }
                    {
                        errorArray.length
                            ? <div className="apiHeadings">
                                <h3>{errorArray} : N/A due to no information. Check spelling.</h3>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default TimeZone;