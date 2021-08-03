import TimeZone from "./TimeZone";
// import Setup from "./Setup"
import Meetings from "./Meetings";
import { Route, Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { FaCalendarTimes, FaStopwatch, FaGlobeEurope } from "react-icons/fa";
import { motion } from "framer-motion";

const Welcome = (props) => {
  const { welcome, setWelcome } = props;
  const history = useHistory();
  // const [welcome, setWelcome] = useState(true)
  const [meetingNumberInput, setMeetingNumberInput] = useState("");

  const handleChange = (e) => {
    setMeetingNumberInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === "newMeeting") {
      setWelcome(false);
      history.push("/timezone");
    } else {
      console.log("check for verification, firebase datatbase");
    }
  };

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
            <p>Create New Meeting Time</p>
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
            transition={{ delay: .5, type: "spring" }}
          >
            <label htmlFor="meetingNumber">View Existing Meeting:</label>
            <FaCalendarTimes className="icons calendarTimes" />
            <input
              type="text"
              name="meetingNumber"
              value={meetingNumberInput}
              onChange={handleChange}
              required
            />
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
              <TimeZone setWelcome={setWelcome} welcome={welcome} />
            )}
          />
          {/* <Route exact path="/setup" render={() => <Setup setWelcome={setWelcome} welcome={welcome} />} /> */}
          <Route
            exact
            path="/meetings"
            render={() => (
              <Meetings setWelcome={setWelcome} welcome={welcome} />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Welcome;
