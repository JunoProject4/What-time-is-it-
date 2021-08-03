const Setup = (props) => {
    const {apiFinal} = props
    return (
        <div className="component setupContainer">
            <h2>set up</h2>
            {
                apiFinal.map(x => {
                    return (
                        <p>{x[0]} and {x[1]}</p>
                    )
                })
            }
        </div>
    )
}

export default Setup;