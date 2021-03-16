import * as React from 'react'
import PriceTable from './components/PriceTable'
import ChartBox from './components/Chart'
import Settings from './components/Settings'
import TitleBar from './components/TitleBar'

const MINIMUM_DELAY = 3000
const FILTER_SYMBOL = 'USDT'

function App() {
  const [loading, setLoading] = React.useState(true)
  const [reload, setReload] = React.useState(0)
  const [symbolFilter, setSymbolFilter] = React.useState(FILTER_SYMBOL)
  const [refreshDelay, setRefreshDelay] = React.useState(MINIMUM_DELAY)
  const [reloadPrevTicker, setReloadPrevTicker] = React.useState(0)
  const [prices, setPrices] = React.useState([])
  const [prevTicker, setPrevTicker] = React.useState([])
  const [bestCoins, setBestCoins] = React.useState([])
  const [worstCoins, setWorstCoins] = React.useState([])
  const [startTime, setStartTime] = React.useState(0)
  const [showChart, setShowChart] = React.useState(false)
  const [chartSymbol, setChartSymbol] = React.useState("")
  
  // Create interval to reload 24h variation, Save start time
  React.useEffect(() => {
    let prevTickerInterval = setInterval(() => setReloadPrevTicker(c => c + 1), (10000))
    setStartTime(Date.now())
    return () => clearInterval(prevTickerInterval)
  }, [])
  // Create an interval to reload prices
  React.useEffect(() => { 
    let interval = setInterval(() => setReload(c => c + 1), (refreshDelay))
    return () => clearInterval(interval)
  }, [refreshDelay])
  // On reloadPrevTicker, fetch binance API (24H Ticker)
  React.useEffect(() => {
    fetch('https://api.binance.com/api/v3/ticker/24hr')
      .then(r => r.json())
      .then(data => {
        setPrevTicker(data)
        setLoading(false)
    })
  }, [reloadPrevTicker])
  // On reload, fetch binance API (current prices)
  React.useEffect(() => {
    fetch('https://api.binance.com/api/v3/ticker/price')
      .then(r => r.json())
      .then(data => {
        data.forEach((line, i) => {
          // At the first fetch (prices are still = [])
          if (prices.length === 0) {
            line.variation = 0
            line.longVariation = 0
          // For all next fetchs
          } else {
            // save previous price before changing prices
            const previousPrice = prices[i].price
            // Get stock variation (new price - previous price)
            const stockVariation = data[i].price - previousPrice
            // Calculate percent variation
            const percentVariation = stockVariation * 100 / previousPrice
            // set short variation
            line.variation = Math.round(percentVariation * 1000) / 1000
            // Calculate end set longVariation
            const cumulVariation = prices[i].longVariation + line.variation
            line.longVariation = cumulVariation
          }
        })
        setPrices(data)
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  // On API fetch (prices change), update best and worst coins
  React.useEffect(() => {
    const bestCoinsList = [...prices].filter(function(line) {
      if (line.symbol.endsWith(symbolFilter))  {
        if (!line.symbol.endsWith('UP' + symbolFilter)) {
          if (!line.symbol.endsWith('DOWN' + symbolFilter)) {
            return true
          }
        }
      }
      return false
    })
    const worstCoinsList = [...prices].filter(function(line) {
      if (line.symbol.endsWith(symbolFilter))  {
        if (!line.symbol.endsWith('UP' + symbolFilter)) {
          if (!line.symbol.endsWith('DOWN' + symbolFilter)) {
            return true
          }
        }
      }
      return false
    })
    bestCoinsList.sort((oneLine, anotherLine) => (
      oneLine.longVariation < anotherLine.longVariation) ? 1 : -1
    )
    worstCoinsList.sort((oneLine, anotherLine) => (
      oneLine.longVariation > anotherLine.longVariation) ? 1 : -1
    )
    setBestCoins(bestCoinsList.slice(0, 15))
    setWorstCoins(worstCoinsList.slice(0, 15))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices])

  // Handlers
  const handleSettingsChange = (settings) => {
    // Only refresh delay if > than minimal delay
    if (settings.delay >= MINIMUM_DELAY / 1000) {
      setRefreshDelay(settings.delay * 1000)
    }
    setSymbolFilter(settings.selectedSymbol)
  }
  const handleShowChart = (symbol) => {
    setChartSymbol(symbol)
    setShowChart(true)
  }
  const handleHideChart = () => {
    setShowChart(false)
  }

  // Get settings from states, to send to settings component (nul ?)
  const currentSettings = {
    delay: refreshDelay,
    symbol: symbolFilter
  }
  
  if (loading) {
    return <h1 id="initialLoading">Loading data from binance API...</h1>
  }
  return <React.Fragment>
    {/* CHART DIV (Shown / Hiden)*/}
    {showChart ? <ChartBox symbol={chartSymbol} onClose={handleHideChart}/> : null}
    {/* HEADER BAR */}
    <TitleBar start={startTime}/>
    {/* SETTINGS */}
    <Settings settings={currentSettings} onSettingsChange={handleSettingsChange} minDelay={MINIMUM_DELAY}/>
    {/* TABLES Champions/Loosers*/}
    <div className="container">
      <div className="row align-items-start filteredTables">
        <div className="col-sm-6 championsTable">
          <PriceTable 
            title={"Champions"} 
            prices={bestCoins} 
            prevTicker={prevTicker}
            onOpenChart={handleShowChart}/>
        </div>
        <div className="col-sm-6">
          <PriceTable 
            title={"Loosers"} 
            prices={worstCoins} 
            prevTicker={prevTicker}
            onOpenChart={handleShowChart}/>
        </div>
      </div>
      {/* TABLE ALL COINS */}
      <PriceTable 
        title={"All Market"} 
        prices={prices} 
        prevTicker={prevTicker}
        onOpenChart={handleShowChart}/>
    </div>
  </React.Fragment>
}

export default App;
