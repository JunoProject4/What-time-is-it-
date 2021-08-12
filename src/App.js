import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Welcome from "./Welcome"
import { motion } from "framer-motion";

//Our Starting point, will hold the Welcome screen with 2 options that Grant suggested (in progress and not showing).  For now it houses 3 components, timezone/set up(likely to be merged) and meetings, they render depending on the URL path.  There are 5 buttons at the bottom that either select a URL path and renders a component, or changes theme or restarts 

//Houses Header, footer and Main
function App() {
  const buttonArray = ['theme', 'restart']
  const [welcome, setWelcome] = useState(true)
  const [darkMode, setDarkMode] = useState("app darkMode")
  const history = useHistory()

  //Button Functionality
  const handleClick = (e) => {
    if (e.target.className === 'theme') {
      darkMode === "app darkMode" ? setDarkMode("app lightMode") : setDarkMode("app darkMode")
    } else {
      setWelcome(true)
      history.push("/" + e.target.className)
    }
  }

  return (
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
            <button key={i} className={button} onClick={handleClick}>{button[0].toUpperCase() + button.slice(1).toLowerCase()}<fa-undo/></button>
          )
        })
      }
      <footer>
        <motion.p 
        initial={{ opacity: 0, x: -250 }}
        animate={{ opacity: 1, x: -10 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="footerText">Created at <a href="https://junocollege.com/">Juno College</a> with <a href="http://worldtimeapi.org/">World Time API</a></motion.p>
      </footer>
    </div>
  );
}

export default App;
