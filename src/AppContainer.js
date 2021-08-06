import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'

//Router is put AppContainer to allow usage of React.History in App
const AppContainer = () => {
    return (
        <Router>
            <App />
        </Router>
    )
}

export default AppContainer