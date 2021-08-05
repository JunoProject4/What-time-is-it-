import Meetings from "./Meetings";
import { Route, useHistory } from "react-router-dom";
import { useState } from "react";
import { FaCalendarTimes, FaStopwatch } from "react-icons/fa";
import { motion } from "framer-motion";
import TimeZone from "./TimeZone";
// import MeetingDetails from "./MeetingDetails"
// // import Setup from "./Setup"
//  JSFunctionality
// import Meetings from "./Meetings"
// import { Route, Link, useHistory } from "react-router-dom"
// import { useState, useEffect } from 'react'
// import firebase from "./firebase";
import Calendar from "./Calendar";
// const Welcome = (props) => {
//     const { welcome, setWelcome } = props
//     const history = useHistory()
//     // const [welcome, setWelcome] = useState(true)
//     const [meetingNumberInput, setMeetingNumberInput] = useState("")
//     const [timeZones, setTimeZones] = useState([])
// =======
const Welcome = (props) => {
  const { welcome, setWelcome } = props;
  const history = useHistory();
  // const [welcome, setWelcome] = useState(true)
  // const [meetingNumberInput, setMeetingNumberInput] = useState("");
  const [apiFinal, setApiFinal] = useState([]);

  // const [checkMeeting, setCheckMeeting] = useState([])

  const [meetingInfo, setMeetingInfo] = useState([])
  const [meetingName, setMeetingName] = useState("")

  // const handleChange = (e) => {
  //   setMeetingNumberInput(e.target.value);
  // };

  // console.log(meetingInfo)

  const handleClick = (e) => {
    e.preventDefault();
    e.target.name === "newMeeting" ? history.push("/timezone") : history.push("/meetings")
    setWelcome(false);
  }


  // const handleClick2 = (e) => {
  //   e.preventDefault()
  //   let checkMeetingState = []
  //   const dbRef = firebase.database().ref();
  //   // dbRef.child('Test5').set("setting random value")

  //   dbRef.on("value", (snapshot) => {
  //     if (snapshot.child(meetingNumberInput).exists()) {
  //       console.log("it worked")

  //       dbRef.on("value", (response) => {
  //         const data = response.val()
  //         for (let key in data) {
  //           if (meetingNumberInput === key) {
  //             checkMeetingState.push({ key: key, info: data[key] })
  //           }
  //         }
  //         // console.log(checkMeetingState)
  //         setCheckMeeting(checkMeetingState)
  //       })
  //       setWelcome(false)
  //       history.push("/meetingdetails")
  //       // history.push("/meetings/" + meetingNumberInput);
  //       // setMeetingNumberInput("");
  //     } else {
  //       alert("Meeting does not exist")
  //     }
  //   });
  // }


  return (
    <div className="component Welcome">
      {welcome ? (
        <div className="newMeetingSection">
          <motion.div
            className="newMeeting"
            initial={{ opacity: 0, y: -250 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <p>Create New Meeting Time:</p>
            <FaStopwatch className="icons stopWatch" />
            <button name="newMeeting" onClick={handleClick}>
              New Meeting
            </button>
          </motion.div>
          <motion.form
            action="submit"
            className="newMeetingForm"
            initial={{ opacity: 0, y: -250 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <label htmlFor="meetingNumber">View Existing Meetings:</label>
            <FaCalendarTimes className="icons calendarTimes" />
            <button name="meetingCheck" onClick={handleClick}>
              Check
            </button>
          </motion.form>
        </div>
      ) : (
        <div>
          <Route
            exact
            path="/timezone"
            render={() => (
              <TimeZone
                setWelcome={setWelcome}
                welcome={welcome}
                setApiFinal={setApiFinal}
                apiFinal={apiFinal}
              />
            )}
          />
          <Route
            exact
            path="/calendar"
            render={() => (
              <Calendar
                setWelcome={setWelcome}
                welcome={welcome}
                apiFinal={apiFinal}
                setMeetingInfo={setMeetingInfo}
                setMeetingName={setMeetingName}
              />
            )}
          />

          <Route
            exact
            path="/meetings"
            render={() => (
              <Meetings setWelcome={setWelcome} welcome={welcome} meetingInfo={meetingInfo} setMeetingInfo={setMeetingInfo} meetingName={meetingName}/>
            )}
          />

          {/* <Route
            exact
            path="/meetingdetails"
            render={() => (
              <MeetingDetails info={checkMeeting} />
            )}
          /> */}
        </div>
      )}
    </div>
  );
};
export default Welcome;
