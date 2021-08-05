import { useState } from 'react';
import firebase from "./firebase";

const MeetingDetails = (props) => {
    // const [warning, setWarning] = useState(true)
    // const [render, setRender] = useState(false)
    const { info } = props
    // console.log(props)
    // console.log(info[0].info.Place)

    var gapi = window.gapi
    console.log(gapi)

    var CLIENT_ID = '602044477009-updm2dii3nkt1culsmak0bvjahl4f90s.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyDhDasC0ZkvGKYTs6KZhLLNE2O9Espwc3g';
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar.events";


    const handleClick = (e) => {
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
                        'location': 'Juno College',
                        'description': "drankkkks",
                        'start': {
                            'dateTime': '2021-08-24T09:00:00-07:00',
                            'timeZone': 'America/Toronto'
                        },
                        'end': {
                            'dateTime': '2021-08-24T17:00:00-07:00',
                            'timeZone': 'America/Toronto'
                        },
                        'attendees': [
                                {'email': 'friendlypirat3@gmail.com'},
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
        <div className="component meetingDetailsContainer">
            <div className="eachMeeting pending">
                <h3>{info[0].info.Who}</h3>
                <h3>{info[0].info.When}, {info[0].info.Time}</h3>
                <h3>{info[0].info.Where.City}, {info[0].info.Where.Continent}</h3>
                <h3>{info[0].info.Status}</h3>
                {
                    info[0].info.Place === undefined
                        ? null
                        // ? <button name={info[0].key} onClick={handleClick3}>Pick a place</button>
                        : <h3 className="meetingPlace">Suggested Meeting Place: {info[0].info.Place}</h3>
                }
                <button name={info[0].key} onClick={handleClick}>Accept Meeting and add to Calendar</button>
            </div>
        </div>
    )
}

export default MeetingDetails