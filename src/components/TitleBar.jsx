import * as React from 'react'
import './titlebar.css'

const ResetButton = ({onReset}) => {
  const handleClick = (e) => {
    e.preventDefault()
    onReset()
  }
  return <button className="btn btn-outline-info resetButton" onClick={handleClick}>
      <i className="fas fa-redo text-warning"></i> Reload page
    </button>
}

const TitleBar = ({start, onReset}) => {
    const [reload, setReload] = React.useState(0)
    const [time, setTime] = React.useState('')
    // Create an interval to reload prices
    React.useEffect(() => { 
      let timerInterval = setInterval(() => setReload(c => c + 1), (1000))
      return () => clearInterval(timerInterval)
    }, [])
    React.useEffect(() => {
      const timeSpend = Date.now() - start
      // if less than 1 minute
      if ((timeSpend / 1000) < 60) {
        const timeString = Math.round(timeSpend / 1000) + " s"
        setTime(timeString)
      // if less than 1 hour
      } else if ((timeSpend / 1000) < 3600) {
        const minutes = Math.trunc(timeSpend / 1000 / 60)
        const milliseconds = (timeSpend - (minutes * 60 * 1000))
        const seconds = Math.round(milliseconds / 1000)
        const timeString = minutes + "m " + seconds + "s"
        setTime(timeString)
      // if more than 1 hours
      } else {
        const hours = Math.trunc(timeSpend / 1000 / 60 / 60)
        const minutesLeft = timeSpend - (hours * 3600 * 1000)
        const minutes = Math.trunc(minutesLeft / 1000 / 60)
        const secondsLeft = minutesLeft - (minutes * 60 * 1000)
        // const milliseconds = (timeSpend - (minutes * 60 * 1000))
        const seconds = Math.round(secondsLeft / 1000)
        const timeString = hours + "h " + minutes + "m " + seconds + "s"
        setTime(timeString)
      }
    }, [reload, start])
    
    return <div className="titleBar text-warning">
      <div>
        <h1>Binance Market</h1>
      </div>
      <div className="timeSpendDiv">
        <h3>Time spend : {time}</h3> <ResetButton onReset={onReset}/>
      </div>
    </div>
  }

  export default TitleBar;