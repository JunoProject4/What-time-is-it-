import TimeZone from "./TimeZone"
// import Setup from "./Setup"
import Meetings from "./Meetings"
import { Route, Link, useHistory } from "react-router-dom"
import { useState } from 'react'


const Welcome = (props) => {
    const {welcome, setWelcome} = props
    const history = useHistory()
    // const [welcome, setWelcome] = useState(true)
    const [meetingNumberInput, setMeetingNumberInput] = useState("")

    const handleChange = (e) => {
        setMeetingNumberInput(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (e.target.name === "newMeeting") {
            setWelcome(false)
            history.push('/timezone')
        } else {
            console.log("check for verification, firebase datatbase")
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