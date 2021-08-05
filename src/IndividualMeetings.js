import { useState } from 'react';
import firebase from "./firebase";

const IndividualMeetings = (props) => {
    const { info, id } = props
    const [warning, setWarning] = useState(true)

    const handleClickDelete = (e) => {
        e.preventDefault()
        if (warning === true) {
            alert("Are you sure you want to delete?")
            setWarning(false)
        } else {
            const dbRef = firebase.database().ref();
            dbRef.child(e.target.id).remove();
            setWarning(true)
        }
    }

    const handleClickPlace = (e) => {
        const dbRef = firebase.database().ref();

        const doubleAPICall = async (city, continent) => {
            const url = new URL('http://api.positionstack.com/v1/forward')
            url.search = new URLSearchParams({
                "access_key": "c63db7673c0364a276e740c39d28f688",
                "query": city,
                "continent": continent
            })

            const firstAPI = await fetch(url).then(res => res.json()).then(res => `${res.data[0].latitude}, ${res.data[0].longitude}`)

            const endingAPICall = async (points) => {
                const url2 = new URL('http://www.mapquestapi.com/search/v2/search')
                url2.search = new URLSearchParams({
                    "key": "A7nNTuYa0Q2rEtx3QWCApAtca3kCCqaW",
                    "shapePoints": points,
                    "units": "k",
                    "radius": "100",
                })

                const secondAPI = await fetch(url2).then(res => res.json())
                    .then(res => {
                        let results = res.searchResults
                        dbRef.child(e.target.name).update({ Place: results[Math.floor(Math.random() * results.length)].name })
                    })
            }
            endingAPICall(firstAPI)
        }

        dbRef.once('value')
            .then(snapshot => {
                let value = [snapshot.val()[e.target.name].location[0], snapshot.val()[e.target.name].location[1]]
                doubleAPICall([...value])
            })
    }

    //Uses Google Calendar API to record meeting to User's Google Calendar
    //and send out invites via email (We put a dummy email for now to not cause junk)
    //but will be adding a form input to collect invitation emails
    var gapi = window.gapi
    const email = "friendlypirat3@gmail.com"

    var CLIENT_ID = '602044477009-updm2dii3nkt1culsmak0bvjahl4f90s.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyDhDasC0ZkvGKYTs6KZhLLNE2O9Espwc3g';
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar.events";


    const handleClickCalendar = (e) => {
        const dbRef = firebase.database().ref();
        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {

                    var event = {
                        'summary': 'Testing',
                        'location': `${info.Place === undefined ? "TBD" : info.Place}`,
                        'description': "Greatest meeting",
                        'start': {
                            'dateTime': info.startTimeIso,
                            'timeZone': `${info.location[1]}/${info.location[0]}`
                        },
                        'end': {
                            'dateTime': info.endTimeIso,
                            'timeZone': `${info.location[1]}/${info.location[0]}`
                        },
                        'attendees': [
                            { 'email': email }
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 }
                            ]
                        }
                    }



                    var request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event
                    });

                    request.execute(function (event) {
                        window.open(event.htmlLink)
                    });

                    dbRef.child(e.target.name).update({ Status: 'Sent'})



                    //get events
                    // gapi.client.calendar.events.list({
                    //   'calendarId': 'primary',
                    //   'timeMin': (new Date()).toISOString(),
                    //   'showDeleted': false,
                    //   'singleEvents': true,
                    //   'maxResults': 10,
                    //   'orderBy': 'startTime'
                    // }).then(response => {
                    //   const events = response.result.items
                    //   console.log('EVENTS: ', events)
                    // })



                })
        })
    }

    return (
      <div className="eachMeeting notSent">
            <p>{info.location[0]}, {info.location[1]}</p>
            <p>{info.meetingDate}, at {info.meetingTime[0] === "0" ? info.meetingTime.slice(1) : info.meetingTime}</p>
            {
                info.Place === undefined
                    ? <button name={id} onClick={handleClickPlace}>Suggest local place</button>
                    : <p className="meetingPlace">Suggested Meeting Place: {info.Place}</p>
            }
            {
                info.Status === undefined
                    ? <button name={id}  onClick={handleClickCalendar}>Add to Calendar and send invites</button>
                    : <p>Invitations sent</p>
            }
            <button name={id} onClick={handleClickDelete}>Delete</button>
        </div>




        // <div>
        //     {
        //         info.Status === "Pending"
        //             ? <div className="eachMeeting pending">
        //                 <h3>{info.location}</h3>
        //                 <h3>{info.When}, {info.Time}</h3>
        //                 <h3>{info.Where.City}, {info.Where.Continent}</h3>
        //                 <h3>PENDING</h3>
        //                 {
        //                     info.Place === undefined
        //                         ? <button name={id} onClick={handleClick2}>Pick a place</button>
        //                         : <h3 className="meetingPlace">Suggested Meeting Place: {info.Place}</h3>
        //                 }
        //                 <button name={id} onClick={handleClick}>Delete</button>
        //             </div>
        //             : info.Status === "Accepted"
        //                 ? <div className="eachMeeting accepted">
        //                     <h3>{info.location}</h3>
        //                     <h3>{info.When}, {info.Time}</h3>
        //                     <h3>{info.Where.City}, {info.Where.Continent}</h3>
        //                     <h3>ACCEPTED</h3>
        //                     {
        //                         info.Place === undefined
        //                             ? <button name={id} onClick={handleClick2}>Pick a place</button>
        //                             : <h3 className="meetingPlace">Suggested Meeting Place: {info.Place}</h3>
        //                     }
        //                     <button name={id} onClick={handleClick}>Delete</button>
        //                 </div>
        //                 : <div className="eachMeeting rejected">
        //                     <h3>{info.location}</h3>
        //                     <h3>{info.When}, {info.Time}</h3>
        //                     <h3>{info.Where.City}, {info.Where.Continent}</h3>
        //                     <h3>REJECTED</h3>
        //                     {
        //                         info.Place === undefined
        //                             ? <button name={id} onClick={handleClick2}>Pick a place</button>
        //                             : <h3 className="meetingPlace">Suggested Meeting Place: {info.Place}</h3>
        //                     }
        //                     <button name={id} onClick={handleClick}>Delete</button>
        //                 </div>

        //     }
        // </div>
    )
}

export default IndividualMeetings



