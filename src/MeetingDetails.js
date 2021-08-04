import { useState } from 'react';
import firebase from "./firebase";

const MeetingDetails = (props) => {
    // const [warning, setWarning] = useState(true)
    // const [render, setRender] = useState(false)
    const { info } = props
    // console.log(props)
    // console.log(info[0].info.Place)

    const gapi = window.gapi
    console.log(gapi)

    var CLIENT_ID = '602044477009-updm2dii3nkt1culsmak0bvjahl4f90s.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyDhDasC0ZkvGKYTs6KZhLLNE2O9Espwc3g';  // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";


         const handleClick = (e) => {
            e.preventDefault()
            console.log("clicking shit")
            // if (warning === true) {
            //     alert("Are you sure you want to delete?")
            //     setWarning(false)
            // } else {
            //     const dbRef = firebase.database().ref();
            //     dbRef.child(e.target.name).remove();
            //     setWarning(true)
            // }
        }


        const apiKey = "AIzaSyDhDasC0ZkvGKYTs6KZhLLNE2O9Espwc3g"
    
        // const handleClick3 = (e) => {
        //     const dbRef = firebase.database().ref();
    
        //     const doubleAPICall = async (city, continent) => {
        //         const url = new URL('http://api.positionstack.com/v1/forward')
        //         url.search = new URLSearchParams({
        //             "access_key": "c63db7673c0364a276e740c39d28f688",
        //             "query": city,
        //             "continent": continent
        //         })
        
        //         const firstAPI = await fetch(url).then(res => res.json()).then(res => `${res.data[0].latitude}, ${res.data[0].longitude}`)
        
        //         const endingAPICall = async (points) => {
        //             const url2 = new URL('http://www.mapquestapi.com/search/v2/search')
        //             url2.search = new URLSearchParams({
        //                 "key": "A7nNTuYa0Q2rEtx3QWCApAtca3kCCqaW",
        //                 "shapePoints": points,
        //                 "units": "k",
        //                 "radius": "100",
        //             })
        
        //             const secondAPI = await fetch(url2).then(res => res.json())
        //                 .then(res => {
        //                     let results = res.searchResults
        //                     dbRef.child(e.target.name).update({Place: results[Math.floor(Math.random() * results.length)].name})
        //                 })
        //         }
        //         endingAPICall(firstAPI)
        //     }
            
        //     dbRef.once('value')
        //         .then(snapshot => {
        //             let value = [snapshot.val()[e.target.name].Where.City, snapshot.val()[e.target.name].Where.Continent]
        //             doubleAPICall([...value])
        //     })
        //     setRender(!render)
        // }

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
            <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
        </div>
    )
}

export default MeetingDetails