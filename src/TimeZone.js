import { useEffect, useState } from 'react'

const TimeZone = (props) => {
    const [cityArray, setCityArray] = useState([])
    const [city1Input, setCity1Input] = useState("")
    const [city2Input, setCity2Input] = useState("")
    const [city3Input, setCity3Input] = useState("")

    // useEffect(() => {
    //     props.setWelcome(false)
    // }, [])

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
        const check = (/(^[a-zA-Z]+\s[a-zA-Z]+)$/)

        if (city1Input.match(check)) {
            copyArray.push([city1Input.split(" ")])
        } else if (city1Input === "") {
            alertCount = alertCount
        } else {
            alertCount++
            alert("Invalid search parameters on City 1")
        }
        // ? copyArray.push([city1Input.split(" ")])
        // : city1Input === ""
        //     ? null
        //     : (alertCount++, alert("Invalid search parameters on City 1"))

        console.log(copyArray)

        if (city2Input.match(check)) {
            copyArray.push([city2Input.split(" ")])
        } else if (city2Input === "") {
            alertCount = alertCount
        } else {
            alertCount++
            alert("Invalid search parameters on City 2")
        }

        // city2Input.match(check)
        //     ? copyArray.push([city2Input.split(" ")])
        //     : city2Input === ""
        //         ? null
        //         : alert("Invalid search parameters on City 2")

        console.log(copyArray)

        if (city3Input.match(check)) {
            copyArray.push([city3Input.split(" ")])
        } else if (city3Input === "") {
            alertCount = alertCount
        } else {
            alertCount++
            alert("Invalid search parameters on City 3")
        }

        // city3Input.match(check)
        //     ? copyArray.push([city3Input.split(" ")])
        //     : city3Input === ""
        //         ? null
        //         : alert("Invalid search parameters on City 3")

        setCityArray(copyArray)
        console.log('just outside api time')

        if (alertCount === 0) {
            console.log("YAYYY API TIME")
        }

        console.log(cityArray)
    }


    return (
        <div className="component timeZoneContainer">
            <div>
                <h2>Timezones:</h2>
                <form className="chatPage2Form" action="submit">

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

                    <button onClick={handleClick}>Send</button>
                </form>
            </div>
            <h2>time zone</h2>
        </div>
    )
}

export default TimeZone;