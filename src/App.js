import * as React from 'react'
import {PriceTable, GlobalPriceTable} from './components/PriceTable'
import ChartBox from './components/Chart'
import Settings from './components/Settings'
import TitleBar from './components/TitleBar'

const MINIMUM_DELAY = 3000
const FILTER_SYMBOL = 'USDT'

function App() {
  // STATES
  const [loading, setLoading] = React.useState(true)
  const [reload, setReload] = React.useState(0)
  const [resetApp, setResetApp] = React.useState(0)
  const [symbolFilter, setSymbolFilter] = React.useState(FILTER_SYMBOL)
  const [refreshDelay, setRefreshDelay] = React.useState(MINIMUM_DELAY)
  const [reloadPrevTicker, setReloadPrevTicker] = React.useState(0)
  const [prices, setPrices] = React.useState([])
  const [prevTicker, setPrevTicker] = React.useState([])
  const [bestCoins, setBestCoins] = React.useState([])
  const [worstCoins, setWorstCoins] = React.useState([])
  const [onfireCoins, setOnfireCoins] = React.useState([])
  const [steadyCoins, setSteadyCoins] = React.useState([])
  // favCoin represents the list of symbols for handling favorites changes (add / remove favorite)
  // favorites represents the structured data sent to build the favorites table
  const [favCoin, setFavCoin] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [startTime, setStartTime] = React.useState(0)
  const [showChart, setShowChart] = React.useState(false)
  const [chartSymbol, setChartSymbol] = React.useState("")
  
  // EFFECTS
  React.useEffect(() => {
    // Create interval to reload 24h variation, Save start time
    let prevTickerInterval = setInterval(() => setReloadPrevTicker(c => c + 1), (10000))
    setStartTime(Date.now())
    setReloadPrevTicker(c => c + 1)
    return () => clearInterval(prevTickerInterval)
  }, [resetApp])
  React.useEffect(() => { 
    // Create an interval for reloading prices
    let interval = setInterval(() => setReload(c => c + 1), (refreshDelay))
    setReload(c => c + 1)
    return () => clearInterval(interval)
  }, [refreshDelay])
  React.useEffect(() => {
    // On reloadPrevTicker, fetch binance API (24H Ticker)
    fetch('https://api.binance.com/api/v3/ticker/24hr')
      .then(r => r.json())
      .then(data => {
        setPrevTicker(data)
        setLoading(false)
    })
  }, [reloadPrevTicker])
  React.useEffect(() => {
    // On reload, fetch binance API (current prices)
    fetch('https://api.binance.com/api/v3/ticker/price')
      .then(r => r.json())
      .then(data => {
        data.forEach((line, i) => {
          // At the first fetch (prices are still = [])
          if (prices.length === 0) {
            line.variation = 0
            line.cumulativeVariation = 0
            line.absoluteVariation = 0
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
            // Calculate cumulativeVariation and absoluteVariation
            const cumulVariation = prices[i].cumulativeVariation + line.variation
            const absVariation = prices[i].absoluteVariation + Math.abs(line.variation)
            // Set them to the line
            line.cumulativeVariation = cumulVariation
            line.absoluteVariation = absVariation
          }
        })
        setPrices(data)
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  React.useEffect(() => {
    // On API fetch (prices change), update favorites, steady and best/worst coins
    // 1 - FILTER LISTS (from fetched prices)
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
    const onfireCoinsList = [...prices].filter(function(line) {
      if (line.symbol.endsWith(symbolFilter))  {
        if (!line.symbol.endsWith('UP' + symbolFilter)) {
          if (!line.symbol.endsWith('DOWN' + symbolFilter)) {
            if (!line.symbol.endsWith('BTCST' + symbolFilter)) {
              return true
            }
          }
        }
      }
      return false
    })
    const steadyCoinsList = [...prices].filter(function(line) {
      if (line.symbol.endsWith(symbolFilter))  {
        if (!line.symbol.endsWith('UP' + symbolFilter)) {
          if (!line.symbol.endsWith('DOWN' + symbolFilter)) {
            if (!line.symbol.endsWith('BTCST' + symbolFilter)) {
              for (let i = 0 ; i < prevTicker.length ; i++) {
                if (prevTicker[i].symbol === line.symbol) {
                  const percentChange = parseFloat(prevTicker[i].priceChangePercent)
                  if (percentChange !== 0) {
                    return true
                  }
                }
              }
            }
          }
        }
      }
      return false
    })
    const favoriteCoins = [...prices].filter(function(line) {
      for (let i = 0 ; i < favCoin.length ; i++) {
        if (line.symbol === favCoin[i]) {
          return true
        }
      }
      return false
    })
    // 2 - SORT LISTS
    bestCoinsList.sort((oneLine, anotherLine) => (
      oneLine.cumulativeVariation < anotherLine.cumulativeVariation) ? 1 : -1
    )
    worstCoinsList.sort((oneLine, anotherLine) => (
      oneLine.cumulativeVariation > anotherLine.cumulativeVariation) ? 1 : -1
    )
    onfireCoinsList.sort((oneLine, anotherLine) => (
      oneLine.absoluteVariation < anotherLine.absoluteVariation) ? 1 : -1
    )
    steadyCoinsList.sort((oneLine, anotherLine) => (
      oneLine.absoluteVariation > anotherLine.absoluteVariation) ? 1 : -1
    )
    favoriteCoins.sort((oneLine, anotherLine) => (
      oneLine.cumulativeVariation < anotherLine.cumulativeVariation) ? 1 : -1
    )
    // 3 - UPDATE STATES
    setBestCoins(bestCoinsList.slice(0, 15))
    setWorstCoins(worstCoinsList.slice(0, 15))
    setOnfireCoins(onfireCoinsList.slice(0, 15))
    setSteadyCoins(steadyCoinsList.slice(0, 15))
    setFavorites(favoriteCoins)
  }, [prices, prevTicker, favCoin, symbolFilter])

  // HANDLERS
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
  const handleFavoriteChange = (symbol) => {
    // if symbol in favorites, delete it
    for (let i = 0; i < favCoin.length; i++) {
      if (favCoin[i] === symbol) {
        let newFavCoin = [...favCoin]
        newFavCoin.splice(i, 1)
        setFavCoin(newFavCoin)
        return
      }
    }
    // if not, push it
    let newFavCoin = [...favCoin]
    newFavCoin.push(symbol)
    setFavCoin(newFavCoin)
  }
  const handleResetApp = () => {
    // reset all states
    setLoading(true)
    setPrices([])
    setPrevTicker([])
    setBestCoins([])
    setWorstCoins([])
    setOnfireCoins([])
    setSteadyCoins([])
    setStartTime(0)
    setResetApp(c => c + 1)
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
    <TitleBar start={startTime} onReset={handleResetApp}/>
    {/* SETTINGS */}
    <Settings settings={currentSettings} onSettingsChange={handleSettingsChange} minDelay={MINIMUM_DELAY}/>
    {/* TABLES GRID*/}
    <div className="container">
      <div className="PriceTablesGrid">
        <PriceTable 
          title={"Champions"} 
          prices={bestCoins}
          prevTicker={prevTicker}
          onOpenChart={handleShowChart}
          favorites={favCoin}
          onFavoriteChange={handleFavoriteChange}
          icon={("chart-line text-success")}/>
        <PriceTable 
          title={"Loosers"} 
          prices={worstCoins} 
          prevTicker={prevTicker}
          onOpenChart={handleShowChart}
          favorites={favCoin}
          onFavoriteChange={handleFavoriteChange}
          icon={("chart-line text-danger")}/>
        <PriceTable 
          title={"Coins on Fire"} 
          prices={onfireCoins} 
          variationType={"absolute"}
          prevTicker={prevTicker}
          onOpenChart={handleShowChart}
          favorites={favCoin}
          onFavoriteChange={handleFavoriteChange}
          icon={("fire-alt text-warning")}/>
        <PriceTable 
          title={"Steady Coins"} 
          prices={steadyCoins} 
          variationType={"absolute"}
          prevTicker={prevTicker}
          onOpenChart={handleShowChart}
          favorites={favCoin}
          onFavoriteChange={handleFavoriteChange}
          icon={("snowflake text-primary")}/>
      </div>
      {/* <div className="row align-items-start filteredTables">
        <div className="col-sm-6 leftTable">
          <PriceTable 
            title={"Champions"} 
            prices={bestCoins}
            prevTicker={prevTicker}
            onOpenChart={handleShowChart}
            favorites={favCoin}
            onFavoriteChange={handleFavoriteChange}
            icon={("chart-line text-success")}/>
        </div>
        <div className="col-sm-6">
          <PriceTable 
            title={"Loosers"} 
            prices={worstCoins} 
            prevTicker={prevTicker}
            onOpenChart={handleShowChart}
            favorites={favCoin}
            onFavoriteChange={handleFavoriteChange}
            icon={("chart-line text-danger")}/>
        </div>
      </div>
      <div className="row align-items-start filteredTables">
        <div className="col-md-6 leftTable">
          <PriceTable 
            title={"Coins on Fire"} 
            prices={onfireCoins} 
            variationType={"absolute"}
            prevTicker={prevTicker}
            onOpenChart={handleShowChart}
            favorites={favCoin}
            onFavoriteChange={handleFavoriteChange}
            icon={("fire-alt text-warning")}/>
        </div>
        <div className="col-md-6">
          <PriceTable 
            title={"Steady Coins"} 
            prices={steadyCoins} 
            variationType={"absolute"}
            prevTicker={prevTicker}
            onOpenChart={handleShowChart}
            favorites={favCoin}
            onFavoriteChange={handleFavoriteChange}
            icon={("snowflake text-primary")}/>
        </div>
      </div> */}
      {/* FAVORITES */}
      <PriceTable 
          title={"Favorites"} 
          prices={favorites} 
          prevTicker={prevTicker}
          onOpenChart={handleShowChart}
          favorites={favCoin}
          onFavoriteChange={handleFavoriteChange}
          icon={("star text-warning")}/>
      {/* TABLE ALL COINS */}
      <GlobalPriceTable 
        title={"All Market"} 
        prices={prices} 
        prevTicker={prevTicker}
        onOpenChart={handleShowChart}
        favorites={favCoin}
        onFavoriteChange={handleFavoriteChange}/>
    </div>
  </React.Fragment>
}

export default App;
