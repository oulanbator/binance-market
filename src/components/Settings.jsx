import * as React from 'react'
import './settings.css'

const RadioButton = ({ name, checked }) => {
    return <div className="form-check">
        <input className="form-check-input" type="radio" name={name} id={name} checked={checked} readOnly />
        <label className="form-check-label" htmlFor={name}>{name}</label>
    </div>
}

const Settings = ({ settings, onSettingsChange, minDelay }) => {
    const [delay, setDelay] = React.useState(settings.delay / 1000)
    const [selectedSymbol, setSelectedSymbol] = React.useState("USDT")
    // HANDLERS
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
        <div className="barTitle">
            <h2>Settings</h2>
        </div>
        <div className="settingsItems">
            <div className="currentValues">
                <div>Current symbol filter : {settings.symbol}</div>
                <div>Current refresh delay : {settings.delay / 1000} secs</div>
            </div>
            <div className="form-group setSymbol" onChange={handleChangeSymbol}>
                <label className="setSymbolLabel">Filter symbol pairs</label>
                <RadioButton name="USDT" checked={selectedSymbol === "USDT"} />
                <RadioButton name="BTC" checked={selectedSymbol === "BTC"} />
            </div>
            <div className="form-group setDelay">
                <label className="setDelayLabel">Refresh prices (min : {minDelay / 1000} secs)</label>
                <input type="text" id="refreshDelayInput" className="form-control refreshDelayInput" value={delay} onChange={handleChangeDelay} />
            </div>
            <div className="submitButton">
                <button className="btn btn-info btn-submit" onClick={handleSubmitClick}>Set</button>
            </div>
        </div>
    </div>
}

export default Settings;