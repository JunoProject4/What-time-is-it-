const MeetingDetails = (props) => {
    // console.log(props)
    const { info } = props

    // console.log(info[0].info)

    const handleClick = (e) => {
        console.log("clicked")
    }

    const handleClick2 = (e) => {
        console.log("clicked")
    }

    return (
        <div className="component meetingDetailsContainer">
            <div className="eachMeeting pending">
                <h3>{info[0].info.Who}</h3>
                <h3>{info[0].info.When}, {info[0].info.Time}</h3>
                <h3>{info[0].info.Where.City}, {info[0].info.Where.Continent}</h3>
                <h3>{info[0].info.Status}</h3>
                {
                    info.Place === undefined
                        ? <button name="place" onClick={handleClick2}>Pick a place</button>
                        : <h3 className="meetingPlace">Suggested Meeting Place: {info[0].info.Place}</h3>
                }
                <button name="accept" onClick={handleClick}>Accept Meeting</button>
            </div>
        </div>
    )
}

export default MeetingDetails