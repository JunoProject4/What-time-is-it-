import firebase from "./firebase";
import Swal from 'sweetalert2';
import { FaCalendarPlus, FaTrashAlt, FaRegHandshake } from 'react-icons/fa';

//This is where all the meetings are made.  They are passed props object with all the firebase info of each meeting, and uses that info to populate the information.  It also has a Double API call allowing users to Pick a random place.  There is also a submit button that connects user to Google Calendar.
const IndividualMeetings = (props) => {
    const { info, id } = props
    
    //Google API Vars
    const gapi = window.gapi
    const email = "friendlypirat3@gmail.com"
    const CLIENT_ID = '602044477009-updm2dii3nkt1culsmak0bvjahl4f90s.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyDhDasC0ZkvGKYTs6KZhLLNE2O9Espwc3g';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.events";

    //If clicked, runs a modal asking user if they are sure they want to delete for double confirmation
    const handleClickDelete = (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                const dbRef = firebase.database().ref();
                dbRef.child(id).remove();
            }
        })
    }

    //When clicked, runs two APIs, one two get Locations Longitude/Latitude, the next to pick a random place close to that location.  It then adds the value in firecase according to ID.
    const handleClickPlace = (e) => {
        const dbRef = firebase.database().ref();

        const doubleAPICall = async (city, continent) => {
            const url = new URL("https://proxy.hackeryou.com")
            const requestedURL = 'http://api.positionstack.com/v1/forward'
            url.search = new URLSearchParams({
                reqUrl: requestedURL,
                'params[access_key]': "c63db7673c0364a276e740c39d28f688",
                'params[query]': city,
                'params[continent]': continent
            })

            const firstAPI = await fetch(url).then(res => res.json()).then(res => `${res.data[0].latitude}, ${res.data[0].longitude}`)

            const endingAPICall = async (points) => {
                const url2 = new URL('https://www.mapquestapi.com/search/v2/search')
                url2.search = new URLSearchParams({
                    "key": "A7nNTuYa0Q2rEtx3QWCApAtca3kCCqaW",
                    "shapePoints": points,
                    "units": "k",
                    "radius": "100",
                })

                await fetch(url2).then(res => res.json())
                    .then(res => {
                        let results = res.searchResults
                        if (results !== undefined) {
                            dbRef.child(id).update({ Place: results[Math.floor(Math.random() * results.length)].name })
                        } else {
                            dbRef.child(id).update({ Place: "No suggestions available" })
                        }

                    })
            }
            endingAPICall(firstAPI)
        }

        dbRef.once('value')
            .then(snapshot => {
                let value = [snapshot.val()[id].location[0], snapshot.val()[id].location[1]]
                doubleAPICall([...value])
            })
    }

    //When clicked, uses Google Calendar API to record meeting to User's Google Calendar
    //and send out invites via email (We put a dummy email for now to not cause junk) but users can change it in their events tab in Google Calendar
    const handleClickCalendar = (e) => {
        const dbRef = firebase.database().ref();
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3')
            gapi.auth2.getAuthInstance().signIn()
                .then(() => {

                    const event = {
                        'summary': info.title,
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
                            { 'email': email },
                            { 'email': 'grantskinner@junoCEO.com' },
                            { 'email': 'the_makaarina_nieminen@losdelrio.com' },
                            { 'email': 'StefanKaragiozov@animationKing.com' }
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 }
                            ]
                        }
                    }

                    const request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event
                    });

                    request.execute(function (event) {
                        window.open(event.htmlLink)
                    });

                    dbRef.child(id).update({ Status: 'Sent' })
                })
        })
    }

    return (
        <div className="meetingStatus">
            <div className={info.Status === undefined ? "eachMeeting notSent" : "eachMeeting wasSent"}>
                <p>{info.title}</p>
                <p>{info.location[0]}, {info.location[1]}</p>
                <p>{info.meetingDate}, at {info.meetingTime[0] === "0" ? info.meetingTime.slice(1) : info.meetingTime}</p>
                {
                    info.Place === undefined
                        ? <button name="choose meeting" onClick={handleClickPlace}><FaRegHandshake className="handshakeIcon" /></button>
                        : <p className="meetingPlace">Meeting Place: {info.Place}</p>
                }
                {
                    info.Status === undefined
                        ? <button name="set calendar" onClick={handleClickCalendar}><FaCalendarPlus /></button>
                        : <p>Invitations sent</p>
                }
                <button name="delete" onClick={handleClickDelete}><i><FaTrashAlt /></i></button>
            </div>
        </div>
    )
}

export default IndividualMeetings