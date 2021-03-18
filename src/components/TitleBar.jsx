import * as React from 'react'

const TitleBar = ({start}) => {
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
    }, [reload])
    
    return <div className="titleBar golden">
      <div>
        <h1>Binance Market</h1>
      </div>
      <div className="timeSpendDiv">
        <h3>Time spend : {time}</h3>
      </div>
    </div>
  }

  export default TitleBar;