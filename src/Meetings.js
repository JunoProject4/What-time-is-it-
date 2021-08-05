import { useEffect, useState } from 'react'
import firebase from "./firebase";
import IndividualMeetings from "./IndividualMeetings"
// import { Route } from 'react-router-dom';


const Meetings = (props) => {
    //Take props from Welcome, which is passed on by Calendar and will populate firebase
    const [meetings, setMeetings] = useState([])
    const {meetingInfo} = props

    useEffect(() => {
      
        const dbRef = firebase.database().ref();
        // meetingInfo.map((x, index)=> dbRef.child(index).set(x))  
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