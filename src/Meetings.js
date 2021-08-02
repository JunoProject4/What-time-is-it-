// import {useEffect} from 'react'

const Meetings = (props) => {
console.log('hello')
props.setWelcome(false)

    // useEffect(() => {
    //     props.setWelcome(false)
    // }, [])

    return (
        <div className="component meetingsContainer">
            <h2>Meetings</h2>
        </div>
    )
}

export default Meetings;