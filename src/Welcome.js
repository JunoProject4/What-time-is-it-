import TimeZone from "./TimeZone"
// import Setup from "./Setup"
import Meetings from "./Meetings"
import { Route, Link, useHistory } from "react-router-dom"
import { useState, useEffect } from 'react'
import firebase from './firebase'



const Welcome = (props) => {
    const { welcome, setWelcome } = props
    const history = useHistory()
    // const [welcome, setWelcome] = useState(true)
    const [meetingNumberInput, setMeetingNumberInput] = useState("")
    const [timeZones, setTimeZones] = useState([])

    const handleChange = (e) => {
        setMeetingNumberInput(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (e.target.name === "newMeeting") {
            setWelcome(false)
            history.push('/timezone')
        } else {
            const dbRef = firebase.database().ref();
            // dbRef.child('Test5').set("setting random value")

            dbRef.on('value', (snapshot) => {
                if (snapshot.child(meetingNumberInput).exists()) {
                    console.log('it worked')
                    history.push('/meetings/' + meetingNumberInput)
                    setMeetingNumberInput("")
                } else {
                alert("Meeting does not exist")
                }
            })
        }
    }

    return (
        <div className="component Welcome">
            { welcome
                ? <div>
                    <button name="newMeeting" onClick={handleClick}>New Meeting</button>
                    <form action="submit">
                        <label htmlFor="meetingNumber">Existing Meeting:</label>
                        <input
                            type="text"
                            name="meetingNumber"
                            value={meetingNumberInput}
                            onChange={handleChange}
                            required
                        />
                        <button name="meetingCheck" onClick={handleClick}>Check</button>
                    </form>
                </div>
                : <div>
                    <Route exact path="/timezone" render={() => <TimeZone setWelcome={setWelcome} welcome={welcome} />} />
                    {/* <Route exact path="/setup" render={() => <Setup setWelcome={setWelcome} welcome={welcome} />} /> */}
                    <Route exact path="/meetings" render={() => <Meetings setWelcome={setWelcome} welcome={welcome} />} />
                </div>
            }
        </div>
    )
}

export default Welcome;