import { useEffect, useState } from 'react'
import firebase from "./firebase";
import IndividualMeetings from "./IndividualMeetings"

// import { Route } from 'react-router-dom';

//Meetings holds all of our individual meetings by taking information passed from it by Calendar and setting it into firebase.  It then populates itself with meetings based on that database.  Each individual meeting has 3 buttons that can be used.  Pick a place: runs 2 apis to randomly choose a meeting place nearby.  Add calendar: allows user to open up Google Calendar, sign in and set the meeting details to emails of their choice.  The meeting details are already dynamically coded in by using the firebase data but the users have a chance to input the email they want to send out the invite to in Google Calendar.
const Meetings = (props) => {
    //Take props from Welcome, which is passed on by Calendar and will populate firebase
    const [meetings, setMeetings] = useState([])
    const {meetingInfo, setMeetingInfo} = props
    

    useEffect(() => {
        const dbRef = firebase.database().ref();
        meetingInfo.map(x=> dbRef.push(x))    
    }, [meetingInfo])

    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.on('value', (response) => {

            const newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push({ key: key, info: data[key] });
            }
            setMeetings(newState)
            
        });
    }, [])

    return (
        <div className="component meetingsContainer">
            <h2>Meetings</h2>
            <h4>Place Search, Add to Calendar/Send Invites, Delete</h4>
            <div className="meetingsGrid">
                {
                    meetings.map(x => {
                        return (
                            <IndividualMeetings className="individualMeetings" key={x.key} id={x.key} info={x.info} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Meetings;