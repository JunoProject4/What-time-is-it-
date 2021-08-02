import { useState } from 'react'
// import TimeZone from "./TimeZone"
// import Setup from "./Setup"
// import Meetings from "./Meetings"
import Welcome from "./Welcome"
// import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { useHistory } from 'react-router-dom';



//Our Starting point, will hold the Welcome screen with 2 options that Grant suggested (in progress and not showing).  For now it houses 3 components, timezone/set up(likely to be merged) and meetings, they render depending on the URL path.  There are 5 buttons at the bottom that either select a URL path and renders a component, or changes theme or restarts 

function App() {

  //Arrary set up for button and darkMode stage
  // const buttonArray = ['timeZone', 'setup', 'meetings', 'theme', 'restart']
  const buttonArray = ['timeZone', 'meetings', 'theme', 'restart']

  const [welcome, setWelcome] = useState(true)
  const [darkMode, setDarkMode] = useState("app lightMode")
  const history = useHistory()

  // const [test, setTest] = useState("ayyooooo")


//Function to handle different buttons, right now it only affects the theme, but will have more functionality for clicking the "Links" when we decide.
  const handleClick = (e) => {
    e.preventDefault()
    if (e.target.className !== "theme" && e.target.className !== "restart") {
      history.push("/" + e.target.className)
    }
    e.target.className === "theme"
      ? darkMode === "app darkMode" ? setDarkMode("app lightMode") : setDarkMode("app darkMode")
      : e.target.className === "restart"
        ? setWelcome(true)
        : setWelcome(false)

  }


  return (
    // <Router>
      <div className={darkMode}>
        <header className="App-header">
          <h1>Timeless</h1>
          <p>created by juno</p>
        </header>
        <main>
          <Welcome welcome={welcome} setWelcome={setWelcome}/>
        </main>
        
        <footer>        
          {
            buttonArray.map(button => {
              return (
                  <button className={button} onClick={handleClick}>{button[0].toUpperCase() + button.slice(1).toLowerCase()}</button>
              )
            })
          }
        </footer>
      </div>
    // </Router>
  );
}

export default App;
