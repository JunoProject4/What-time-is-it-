import { useState } from 'react'
import TimeZone from "./TimeZone"
import Setup from "./Setup"
import Meetings from "./Meetings"
// import Welcome from "./Welcome"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


//Our Starting point, will hold the Welcome screen with 2 options that Grant suggested (in progress and not showing).  For now it houses 3 components, timezone/set up(likely to be merged) and meetings, they render depending on the URL path.  There are 5 buttons at the bottom that either select a URL path and renders a component, or changes theme or restarts 

function App() {

  //Arrary set up for button and darkMode stage
  const buttonArray = ['timeZone', 'setup', 'meetings', 'theme', 'restart']
  // const [welcome, setWelcome] = useState(true)
  const [darkMode, setDarkMode] = useState("app lightMode")
  // const [test, setTest] = useState("ayyooooo")


//Function to handle different buttons, right now it only affects the theme, but will have more functionality for clicking the "Links" when we decide.
  const handleClick = (e) => {
    e.preventDefault()
    // e.target.className === "theme"
    //   ? darkMode === "app darkMode" ? setDarkMode("app lightMode") : setDarkMode("app darkMode")
    //   : e.target.className === "restart"
    //     ? setWelcome(true)
    //     : setWelcome(false)
    darkMode === "app darkMode" ? setDarkMode("app lightMode") : setDarkMode("app darkMode")
  }


  return (
    <Router>
      <div className={darkMode}>
        <header className="App-header">
          <h1>Timeless</h1>
          <p>created by juno</p>
        </header>
        <main>
        <button>START</button>
        <button>Check Meeeting</button>
          {/* {
            welcome
              ? <Welcome />
              : <Route exact path="/timezone" render={() => <TimeZone setWelcome={setWelcome} welcome={welcome}/>}/>
                <Route exact path="/setup" render={() => <Setup setWelcome={setWelcome} welcome={welcome} />} />
                <Route exact path="/meetings" render={() => <Meetings setWelcome={setWelcome} welcome={welcome} />} />
          } */}

          {/* These are the route paths that show the specific component */}
          
          <Route exact path="/timezone" component={TimeZone} />
          <Route exact path="/setup" component={Setup} />
          <Route exact path="/meetings" component={Meetings} />

        </main>
        
        <footer>
          {/* Houses the buttons, used the array on top to map each button to what to need it to do */}
        
          {
            buttonArray.map(button => {
              return (
                button === "theme" || button === "restart"
                  ? <button className={button} onClick={handleClick}>{button[0] + button.slice(1).toLowerCase()}</button>
                  : <Link to={"/" + button}>{button[0] + button.slice(1).toLowerCase()}</Link>
              )
            })
          }
        </footer>
      </div>
    </Router>
  );
}

export default App;
