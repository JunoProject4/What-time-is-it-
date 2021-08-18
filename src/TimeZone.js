import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

const TimeZone = (props) => {
    const [cityArray, setCityArray] = useState([])
    const [city1Input, setCity1Input] = useState("")
    const [city2Input, setCity2Input] = useState("")
    const [city3Input, setCity3Input] = useState("")
    const [showFinal, setShowFinal] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const { apiFinal, setApiFinal } = props
    const history = useHistory()
    const inputArray = [['city1', 'City 1', 'city1Input'], ['city2', 'City 2', 'city2Input'], ['city3', 'City 3', 'city3Input']]
    let apiInformation = []
    let copyArray = []

    // useEffect(() => {
    //     return () => {
    //         setApiFinal(apiInformation)
    //     }
    // }, [apiFinal])

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
            })
            .catch(() => {
                let formattedCity = city.replace("_", " ").split(" ").map(x => x[0].toUpperCase() + x.slice(1)).join(" ")
                apiInformation.push([formattedCity, "no information available"])
            })
        setApiFinal(apiInformation)
    }

    //Tried 100s of ways to write this to make it async and fast, tried looping, mapping, awaits, and either they didn't work or were slow and setstate at weird times, causing a lot of trouble. Its ugly but it works
    const multipleApis = () => {
        copyArray.length === 3
            ? Promise.all([
                apiCall(copyArray[0][0], copyArray[0][1]),
                apiCall(copyArray[1][0], copyArray[1][1]), 
                apiCall(copyArray[2][0], copyArray[2][1])
            ]).then((res) => {
                setTimeout(() => {
                    setShowFinal(true)
                }, 2000)
            })
            : copyArray.length === 2
                ? Promise.all([
                    apiCall(copyArray[0][0], copyArray[0][1]),
                    apiCall(copyArray[1][0], copyArray[1][1]),
                ]).then((res) => {
                    setTimeout(() => {
                        setShowFinal(true)
                    }, 2000)
                })
                : Promise.all([
                    apiCall(copyArray[0][0], copyArray[0][1]),
                ]).then((res) => {
                    setTimeout(() => {
                        setShowFinal(true)
                    }, 2000)
                })
    }

    const handleChange = (e) => {
        e.target.name === "city1"
            ? setCity1Input(e.target.value)
            : e.target.name === "city2"
                ? setCity2Input(e.target.value)
                : setCity3Input(e.target.value)
    }

    //When Send is clicked, it checks to make sure if user inputted everything correctly, if not then an alert goes up and cityArray is not run.  If all conditions are met then cityArray gets set and the ApiCall runs and finalize meeting appears, allowing us to move to setting the meeting parameters.
    const handleClick = (e) => {
        e.preventDefault()
        let alertCount = 0
        let inputArray = [city1Input, city2Input, city3Input]
        let fixedInputArray = inputArray.map(y => y.trim().replace(/[^a-zA-Z_\s]+/g, "").replace(/\s+/g, " ").trim().toLowerCase().split(' ').slice(0, 2).join(' '))
        console.log(fixedInputArray)
        const check = (/(^[a-zA-Z_]+\s[a-zA-Z_]+)$/)

        if (fixedInputArray[0].match(check) && fixedInputArray[0].length) {
            copyArray.push(fixedInputArray[0].split(" "))
        } else if (fixedInputArray[0].length) {
            alertCount++
            alert("Invalid search parameters on City 1")
        }

        if (fixedInputArray[1].match(check) && fixedInputArray[1].length) {
            copyArray.push(fixedInputArray[1].split(" "))
        } else if (fixedInputArray[1].length) {
            alertCount++
            alert("Invalid search parameters on City 2")
        }

        if (fixedInputArray[2].match(check) && fixedInputArray[2].length) {
            copyArray.push(fixedInputArray[2].split(" "))
        } else if (fixedInputArray[2].length) {
            alertCount++
            alert("Invalid search parameters on City 3")
        }

        if (alertCount === 0 && copyArray.length) {
            setCityArray(copyArray)
            multipleApis()
            setShowLoader(true)
            setTimeout(() => {
                setShowLoader(false)
            }, 20000)
        }
    }

    const handleClick2 = () => {
        history.push('/calendar')
    }

    return (
        <div className="component timeZoneContainer">
            <div className="flexFrom">
                <h2>Up to 3 cities and continents</h2>
                <h3>Use '_' for spaces in multi-word cities</h3>
                <h3>*America, Africa, Asia, Australia, Europe, Pacific*</h3>
                <form className="cityInputForm" action="submit">
                    {
                        inputArray.map((x, index) => {
                            return (
                                <div key={index}>
                                    <label htmlFor={x[0]}>{x[1]}</label>
                                    <input name={x[0]} id={x[0]} value={window[x[2]]} type="text" placeholder={`City${index + 1} Continent`} required onChange={handleChange} />
                                </div>
                            )
                        })
                    }
                    <button name="submitCities" onClick={handleClick}>Send</button>
                </form>
                {
                    showFinal
                        ? <button className="finalizeMeetingBtn" name="finalizeMeeting" onClick={handleClick2}>Finalize Meetings</button>
                        : showLoader ?
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :
                            null
                }
            </div>
        </div>
    )
}

export default TimeZone;
