import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";


const TimeZone = (props) => {
    const [cityArray, setCityArray] = useState([])
    const [city1Input, setCity1Input] = useState("")
    const [city2Input, setCity2Input] = useState("")
    const [city3Input, setCity3Input] = useState("")
    const [showFinal, setShowFinal] = useState(false)
    const { apiFinal, setApiFinal } = props
    const history = useHistory()
    const inputArray = [['city1', 'City 1', 'city1Input'], ['city2', 'City 2', 'city2Input'], ['city3', 'City 3', 'city3Input']]
    let apiInformation = []


    //API Call to get Time from the user Inputs, user is allowed up to 3 choices, res has to be formatted back into something that is readable.  If there is an error, it returns No information Avilable.  This APICall sets the 'apiFinal' which is a state housed in Welcome and passed to Calendar to use later.
    const apiCall = async (city, continent) => {
        const url = ("https://worldtimeapi.org/api/timezone/")
        const getTimeZones = async () => {
            const res = await fetch(url + continent + "/" + city)
            const data = await res.json()
            return data
        }
        await getTimeZones()
            .then((res) => {
                let formattedCity = [city.replace("_", " ").split(" ").map(x => x[0].toUpperCase() + x.slice(1)).join(" "), continent.replace("_", " ").split(" ").map(x => x[0].toUpperCase() + x.slice(1)).join(" ")]
                apiInformation.push([formattedCity, res.datetime.substring(11, 19), res.datetime.slice(26).replace(":", "")])
                setApiFinal(apiInformation)
            })
            .catch(() => {
                let formattedCity = city.replace("_", " ").split(" ").map(x => x[0].toUpperCase() + x.slice(1)).join(" ")
                apiInformation.push([formattedCity, "no information available"])
                setApiFinal(apiInformation)
            })
        return Promise.resolve()
    }

    //Runs the ApiCall everytime CityArray is updated
    useEffect(() => {
        const getTime = async () => {
            Promise.all(cityArray.map(item => {
                apiCall(item[0], item[1])
                return Promise.resolve()
            }))
        }
        getTime()
    }, [cityArray])


    const handleChange = (e) => {
        e.target.name === "city1"
            ? setCity1Input(e.target.value)
            : e.target.name === "city2"
                ? setCity2Input(e.target.value)
                : setCity3Input(e.target.value)
    }

    //When Send is clicked, it checks to make sure if user inputted everything correctly, if not then an alert goes up and cityArray is not run.  If all continues are met then cityArray gets set and the ApiCall runs and finalize meeting appears, allowing us to move to setting the meeting parameters.
    const handleClick = (e) => {
        e.preventDefault()
        let alertCount = 0
        let emptyCount = 0
        let copyArray = []
        const check = (/(^[a-zA-Z_]+\s[a-zA-Z_]+)$/)

        if (city1Input.match(check)) {
            copyArray.push(city1Input.split(" "))
        } else if (city1Input === "") {
            emptyCount++
        } else {
            alertCount++
            alert("Invalid search parameters on City 1")
        }

        if (city2Input.match(check)) {
            copyArray.push(city2Input.split(" "))
        } else if (city2Input === "") {
            emptyCount++
        } else {
            alertCount++
            alert("Invalid search parameters on City 2")
        }

        if (city3Input.match(check)) {
            copyArray.push(city3Input.split(" "))
        } else if (city3Input === "") {
            emptyCount++
        } else {
            alertCount++
            alert("Invalid search parameters on City 3")
        }

        if (alertCount === 0 && emptyCount <= 3) {
            setCityArray(copyArray)
            setTimeout(() => {
                setShowFinal(true)
            }, 8000)
        }
    }

    const handleClick2 = () => {
        history.push('/calendar')
    }

    return (
        <div className="component timeZoneContainer">
            <div className="flexFrom">
                <h2>Enter up to 3 cities and locations (Asia, America, Africa, Europe, Australia) </h2>
                <h2>Use _ for spaces.</h2>
                <form className="cityInputForm" action="submit">
                    {
                        inputArray.map(x => {
                            return (
                                <div>
                                    <label htmlFor={x[0]}>{x[1]}</label>
                                    <input name={x[0]} value={window[x[2]]} type="text" placeholder={`${x[1]} Continent`} required onChange={handleChange} />
                                </div>
                            )
                        })
                    }
                    <button name="submitCities" onClick={handleClick}>Send</button> 
                </form>
                {
                    showFinal
                        ? <button className="finalizeMeetingBtn" name="finalizeMeeting" onClick={handleClick2}>Finalize Meetings</button>
                        : null
                }
            </div>
        </div>
    )
}

export default TimeZone;
