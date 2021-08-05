import { useState } from 'react';
import firebase from "./firebase";
import Swal from 'sweetalert2';

const IndividualMeetings = (props) => {
    const { info, id } = props
    const [warning, setWarning] = useState(true)

    // // Modal alert for delete verification: NOTE: built with assistance from www.sweetalert2.github.io 
    const handleClick = (e) => {
        e.preventDefault()
        if (warning === true) {
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
                }
              })
        //     alert("Are you sure you want to delete?")
        //     setWarning(false)
        // } else {
        //     const dbRef = firebase.database().ref();
        //     dbRef.child(e.target.name).remove();
        //     setWarning(true)
        }
    }

    const handleClick2 = (e) => {
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
                        dbRef.child(e.target.name).update({Place: results[Math.floor(Math.random() * results.length)].name})
                    })
            }
            endingAPICall(firstAPI)
        }
        
        dbRef.once('value')
            .then(snapshot => {
                let value = [snapshot.val()[e.target.name].Where.City, snapshot.val()[e.target.name].Where.Continent]
                doubleAPICall([...value])
        })
    }

    return (
        <div className="meetingStatus">
            {
                info.Status === "Pending"
                    ? <div className="eachMeeting pending">
                        <h3>{info.Who}</h3>
                        <h3>{info.When}, {info.Time}</h3>
                        <h3>{info.Where.City}, {info.Where.Continent}</h3>
                        <h3>PENDING</h3>
                        {
                            info.Place === undefined
                                ? <button name={id} onClick={handleClick2}>Pick a place</button>
                                : <h3 className="meetingPlace">Suggested Meeting Place: 
                                <br/>{info.Place}</h3>
                        }
                        <button name={id} onClick={handleClick}>Delete</button>
                    </div>
                    : info.Status === "Accepted"
                        ? <div className="eachMeeting accepted">
                            <h3>{info.Who}</h3>
                            <h3>{info.When}, {info.Time}</h3>
                            <h3>{info.Where.City}, {info.Where.Continent}</h3>
                            <h3>ACCEPTED</h3>
                            {
                                info.Place === undefined
                                    ? <button name={id} onClick={handleClick2}>Pick a place</button>
                                    : <h3 className="meetingPlace">Suggested Meeting Place:
                                    <br/>{info.Place}</h3>
                            }
                            <button name={id} onClick={handleClick}>Delete</button>
                        </div>
                        : <div className="eachMeeting rejected">
                            <h3>{info.Who}</h3>
                            <h3>{info.When}, {info.Time}</h3>
                            <h3>{info.Where.City}, {info.Where.Continent}</h3>
                            <h3>REJECTED</h3>
                            {
                                info.Place === undefined
                                    ? <button name={id} onClick={handleClick2}>Pick a place</button>
                                    : <h3 className="meetingPlace">Suggested Meeting Place: <br/>{info.Place}</h3>
                            }
                            <button name={id} onClick={handleClick}>Delete</button>
                        </div>

            }
        </div>
    )
}

export default IndividualMeetings



