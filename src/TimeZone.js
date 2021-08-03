import { useEffect, useState } from 'react'
import Setup from './Setup'
import Calendar from './Calendar'
import { useHistory } from "react-router-dom";


const TimeZone = (props) => {
    // const [cityArray, setCityArray] = useState([["Lagos", "Africa"], ["London", "Europe"], ["Tokyo", "Asia"]])
    const [cityArray, setCityArray] = useState([])
    const [city1Input, setCity1Input] = useState("")
    const [city2Input, setCity2Input] = useState("")
    const [city3Input, setCity3Input] = useState("")
    const [infoReady, setInfoReady] = useState(false)
    const [localTime, setLocalTime] = useState("")
    let apiInformation = []
    // const [apiFinal, setApiFinal] = useState([])
    const {apiFinal, setApiFinal} = props
    const history = useHistory()
    // const [loading, setLoading] = useState(true)


    const url = ("https://worldtimeapi.org/api/timezone/")

    const apiCall = async (city, continent) => {
        const getQuotes = async () => {
            const res = await fetch(url + continent + "/" + city)
            const data = await res.json()
            return data
        }
        await getQuotes()
            .then((res) => {
                let formattedCity = city.replace("_", " ").split(" ").map(x => x[0].toUpperCase() + x.slice(1)).join(" ")
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

    useEffect(async () => {
        const getTime = async () => {
            Promise.all(cityArray.map(item => {
                apiCall(item[0], item[1])
            }))
        }
        // await getTime()
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
        let copyArray = []
        const check = (/(^[a-zA-Z_]+\s[a-zA-Z_]+)$/)

        if (city1Input.match(check)) {
            copyArray.push(city1Input.split(" "))
        } else if (city1Input === "") {
            alertCount = alertCount
        } else {
            alertCount++
            alert("Invalid search parameters on City 1")
        }

        if (city2Input.match(check)) {
            copyArray.push(city2Input.split(" "))
        } else if (city2Input === "") {
            alertCount = alertCount
        } else {
            alertCount++
            alert("Invalid search parameters on City 2")
        }

        if (city3Input.match(check)) {
            copyArray.push(city3Input.split(" "))
        } else if (city3Input === "") {
            alertCount = alertCount
        } else {
            alertCount++
            alert("Invalid search parameters on City 3")
        }

        if (alertCount === 0) {
            setCityArray(copyArray)
        }
    }

    const handleClick2 = () => {
        history.push('/calendar')
    }

    useEffect(() => {
        // setTimeout(() => {
        //     setInfoReady(!infoReady)
        // }, 3500)

        setTimeout(() => {
            setInfoReady(!infoReady)
        }, 8000)

    }, [apiFinal])

    useEffect(() => {
    let time = [Date().substring(16, 24), Date().substring(28,33)]
    setLocalTime(time)
    }, [])


    return (
        <div className="component timeZoneContainer">
            <div>
                <h2>Enter city and location (Asia, America, Africa, Europe, Australia)</h2>
                <form className="cityInputForm" action="submit">

                    <div>
                        <label htmlFor="city1">City 1</label>
                        <input name="city1" value={city1Input} type="text" placeholder="City1 Continent" required onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="city2">City 2</label>
                        <input name="city2" value={city2Input} type="text" placeholder="City2 Continent" required onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="city3">City 3</label>
                        <input name="city3" value={city3Input} type="text" placeholder="City3 Continent" required onChange={handleChange} />
                    </div>

                    <button name="submitCities" onClick={handleClick}>Send</button>
                </form>
                <button name="finalizeMeeting" onClick={handleClick2}>Finalize Meetings</button>
            </div>
            <div>
                <h3>Local time is: {localTime}</h3>
                {
                    apiFinal.map((item, index) => {
                        console.log("what is going on??")
                        console.log(item)
                        return (
                            <h3 key={index}>Time in {item[0]}: {item[1]}</h3>
                        )
                    })
                    }
            </div>

            {/* {
                infoReady === true 
                ? <Setup apiFinal={apiFinal} />
                : null
            } */}





        </div>
    )
}

export default TimeZone;