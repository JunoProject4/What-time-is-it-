import Meetings from "./Meetings";
import { Route, useHistory } from "react-router-dom";
import { useState } from "react";
import { FaCalendarTimes, FaStopwatch } from "react-icons/fa";
import { motion } from "framer-motion";
import TimeZone from "./TimeZone";
import Calendar from "./Calendar";

//Welcome is where the user starts, he/she/they can go to start a new meeting or check current meetings.  Welcome holds a couple states that are passed around by the child as they need it.
const Welcome = (props) => {
  const { welcome, setWelcome } = props;
  const history = useHistory();
  const [apiFinal, setApiFinal] = useState([]);
  const [meetingInfo, setMeetingInfo] = useState([])
  const [meetingName, setMeetingName] = useState("")

  //Buttons to choose which path user takes
  const handleClick = (e) => {
    e.preventDefault();
    e.target.name === "newMeeting" ? history.push("/timezone") : history.push("/meetings")
    setWelcome(false);
  }

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
              <Meetings
                meetingInfo={meetingInfo}
                setMeetingInfo={setMeetingInfo}
                meetingName={meetingName} />
            )}
          />
        </div>
      )}
    </div>
  );
};
export default Welcome;
