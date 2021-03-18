import * as React from 'react'
import './chart.css'
import {Loader} from './Utils'

const Chart = ({data, symbol, interval}) => {
    const chartDiv = React.useRef(null)
    // On mount, setup Chart
    React.useEffect(() => {
        // Set chart options
        const LightweightCharts = window.LightweightCharts        
        const chart = LightweightCharts.createChart(chartDiv.current, {
            width: chartDiv.current.offsetWidth,
            height: chartDiv.current.offsetHeight,
            layout: {
                backgroundColor: '#FFF',
                textColor: '#000',
            },
            grid: {
                vertLines: {color: 'rgba(197, 203, 206, 0.5)',},
                horzLines: {color: 'rgba(197, 203, 206, 0.5)',},
            },
            crosshair: {mode: LightweightCharts.CrosshairMode.Normal,},
            rightPriceScale: {borderColor: 'rgba(197, 203, 206, 0.8)',},
            timeScale: {borderColor: 'rgba(197, 203, 206, 0.8)',},
        });
        // Set candleSeries object
        let candleSeries = chart.addCandlestickSeries({
            upColor: 'rgba(0, 255, 0, 1)',
            downColor: 'rgba(255, 0, 0, 1)',
            borderDownColor: 'rgba(255, 0, 0, 1)',
            borderUpColor: 'rgba(0, 255, 0, 1)',
            wickDownColor: 'rgba(255, 0, 0, 1)',
            wickUpColor: 'rgba(0, 255, 0, 1)'
        });
        // Give historical data to candleSeries
        candleSeries.setData(data)
        // Set socket connection, on message update candleSeries
        const url = "wss://stream.binance.com:9443/ws/" + symbol + "@kline_" + interval
        const socket = new WebSocket(url)
        socket.onmessage = function (event) {
            const messageObject = JSON.parse(event.data)
            const newCandle = messageObject.k
            candleSeries.update({
                time: newCandle.t / 1000,
                open: newCandle.o,
                high: newCandle.h,
                low: newCandle.l,
                close: newCandle.c
            })
        }
    }, [data, symbol, interval]);
    return <div id="Chart" ref={chartDiv}></div>
}

const ChartBox = ({onClose, symbol}) => {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [data, setData] = React.useState([])
    const [timeframe, setTimeFrame] = React.useState("5m")
    
    React.useEffect(() => {
        const url = "/api/history/" + symbol + "/" + timeframe
        fetch(url).then(r => r.json()).then(data => {
            if (data.errorStatus) {
                setError(true)
            } else {
                setData(data)
                setLoading(false)
            } 
        });
    }, [symbol, timeframe])

    const handleCloseClick = (e) => {
        e.preventDefault()
        onClose()
    }
    const handleTimeClick = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeFrame(e.target.innerText)
    }
    return <div id="chartBox">
        <a href="/#" onClick={handleCloseClick} id="chartCloser"><i className="fas fa-times-circle"></i></a>
        {loading ? <Loader/> : <>
            <div id="chartTitle">
                <h3>{symbol} ({timeframe})</h3>
            </div>
            <Chart data={data} symbol={symbol.toLowerCase()} interval={timeframe}/>
            <div id="chartTimeframe">
                <button onClick={handleTimeClick} disabled={timeframe==="1m"}>1m</button>
                <button onClick={handleTimeClick} disabled={timeframe==="5m"}>5m</button>
                <button onClick={handleTimeClick} disabled={timeframe==="15m"}>15m</button>
                <button onClick={handleTimeClick} disabled={timeframe==="1h"}>1h</button>
                <button onClick={handleTimeClick} disabled={timeframe==="1d"}>1d</button>
            </div>
        </>}
        {error ? <h2>Error.. Try again..</h2> : null}
    </div>
}

export default ChartBox;