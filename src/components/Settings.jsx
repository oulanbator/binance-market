import * as React from 'react'

const RadioButton = ({ name, checked }) => {
    return <div className="form-check">
        <input className="form-check-input" type="radio" name={name} id={name} checked={checked} readOnly />
        <label className="form-check-label" htmlFor={name}>{name}</label>
    </div>
}

const Settings = ({ settings, onSettingsChange, minDelay }) => {
    const [delay, setDelay] = React.useState(settings.delay / 1000)
    const [selectedSymbol, setSelectedSymbol] = React.useState("USDT")
    const handleChangeDelay = (e) => {
        e.preventDefault()
        setDelay(e.target.value)
    }
    const handleSubmitClick = (e) => {
        e.preventDefault()
        const settings = {
            delay: delay,
            selectedSymbol: selectedSymbol
        }
        onSettingsChange(settings)
    }
    const handleChangeSymbol = (e) => {
        setSelectedSymbol(e.target.name)
    }
    return <div className="settingsBar">
        <div className="barHeader">
            <div>
                <h2>Settings</h2>
            </div>
            <div className="currentValues">
                <div>Current symbol filter : {settings.symbol}</div>
                <div>Current refresh delay : {settings.delay / 1000} secs</div>
            </div>
        </div>
        <form className="barItems">
            <div className="form-group setSymbol" onChange={handleChangeSymbol}>
                <label>Filter symbol pairs</label>
                <RadioButton name="USDT" checked={selectedSymbol === "USDT"} />
                <RadioButton name="BTC" checked={selectedSymbol === "BTC"} />
            </div>
            <div className="form-group setDelay">
                <label htmlFor="refreshDelayInput" className="form-label">Refresh prices (min : {minDelay / 1000} secs)</label>
                <input type="text" id="refreshDelayInput" className="form-control" value={delay} onChange={handleChangeDelay} />
            </div>
            <button className="btn btn-info setSubmit" onClick={handleSubmitClick}>Set</button>
        </form>
    </div>
}

export default Settings;