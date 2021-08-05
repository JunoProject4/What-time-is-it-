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
    let apiInformation = []

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

    useEffect(() => {
        const getTime = async () => {
            Promise.all(cityArray.map(item => {
                return apiCall(item[0], item[1])
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
            }, 7500)
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

                    <div>
                        <label htmlFor="city1">City 1:</label>
                        <input name="city1" value={city1Input} type="text" placeholder="City1 Continent" required onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="city2">City 2:</label>
                        <input name="city2" value={city2Input} type="text" placeholder="City2 Continent" required onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="city3">City 3:</label>
                        <input name="city3" value={city3Input} type="text" placeholder="City3 Continent" required onChange={handleChange} />
                    </div>

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