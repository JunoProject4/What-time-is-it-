import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Welcome from "./Welcome"

//Houses Header, footer and Main
function App() {
  const buttonArray = ['theme', 'restart']
  const [welcome, setWelcome] = useState(true)
  const [darkMode, setDarkMode] = useState("app lightMode")
  const history = useHistory()

  //Button Functionality
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
    <div className={darkMode}>

      <header>
        <h1>Timeless</h1>
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
        <p class="footerText">Created at <a href="https://junocollege.com/">Juno College</a> with <a href="http://worldtimeapi.org/">World Time API</a></p>
      </footer>
    </div>
    // </Router>
  );
}

export default App;
