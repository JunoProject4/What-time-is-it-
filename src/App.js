import { useState } from 'react'
// import TimeZone from "./TimeZone"
// import Setup from "./Setup"
// import Meetings from "./Meetings"
import Welcome from "./Welcome"
// import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { FaGlobeEurope } from 'react-icons/fa';
import { FaCalendarPlus, FaTrashAlt, FaRegHandshake, FaArrowLeft  } from 'react-icons/fa';
import { motion } from "framer-motion";


//Our Starting point, will hold the Welcome screen with 2 options that Grant suggested (in progress and not showing).  For now it houses 3 components, timezone/set up(likely to be merged) and meetings, they render depending on the URL path.  There are 5 buttons at the bottom that either select a URL path and renders a component, or changes theme or restarts 

function App() {

  //Arrary set up for button and darkMode stage
  // const buttonArray = ['timeZone', 'setup', 'meetings', 'theme', 'restart']
  const buttonArray = ['theme', 'restart']
  const [welcome, setWelcome] = useState(true)
  const [darkMode, setDarkMode] = useState("app lightMode")
  const history = useHistory()

  // const [test, setTest] = useState("ayyooooo")


  // Function to handle different buttons, right now it only affects the theme, but will have more functionality for clicking the "Links" when we decide.
  const handleClick = (e) => {
    e.preventDefault()
    if (e.target.className === 'theme') {
      darkMode === "app darkMode" ? setDarkMode("app lightMode") : setDarkMode("app darkMode")
    } else {
      setWelcome(true)
      history.push("/" + e.target.className)
    }
  }


  return (
    // <Router>
    // JSFunctionality
    <div className={darkMode}>

      <header>
        <div className="mainHead">
        <motion.h1
        initial={{ opacity: 0, x: -250 }}
        animate={{ opacity: 1, x: -10 }}
        transition={{ delay: 1.3, type: "spring" }}>Timeless</motion.h1>

        </div>
        <div className="ellipse1"></div>
        <div className="ellipse2"></div>
        <div className="ellipse3"></div>
      </header>

      <main>
        <Welcome welcome={welcome} setWelcome={setWelcome} />
      </main>

      

{
        buttonArray.map((button, i) => {
          return (
            <button key={i} id="userBtns" className={button} onClick={handleClick}>{button[0].toUpperCase() + button.slice(1).toLowerCase()}</button>
          )
        })
      }


      <footer>
        <motion.p 
        initial={{ opacity: 0, x: -250 }}
        animate={{ opacity: 1, x: -10 }}
        transition={{ delay: 1.5, type: "spring" }}
        class="footerText">Created at <a href="https://junocollege.com/">Juno College</a> with <a href="http://worldtimeapi.org/">World Time API</a></motion.p>
      </footer>
    </div>
    // </Router>
  );
}

export default App;
