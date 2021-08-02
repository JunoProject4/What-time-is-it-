import {useEffect} from 'react'

const TimeZone = (props) => {
useEffect(() => {
    props.setWelcome(false)
}, [])

    return (
        <div className="component timeZoneContainer">
            <h2>time zone</h2>
        </div>
    )
}

export default TimeZone;