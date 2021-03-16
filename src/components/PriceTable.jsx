import * as React from 'react'

const Row = ({data, prevTicker, onSymbolClick}) => {
    const handleSymbolClick = (e) => {
        e.preventDefault()
        onSymbolClick(e.target.text)
    }
    // get 24hour variation pour ticker 
    let variation24 = 0
    prevTicker.forEach((key, i) => {
        if (key.symbol === data.symbol) {
            variation24 = key.priceChangePercent
        }
    })
    return <tr>
        <td><a href="/#" onClick={handleSymbolClick}>{data.symbol}</a></td>
        <td>{data.price}</td>
        {data.variation > 0 ? 
            <td className="text-success">{data.variation}</td> :
            <td className="text-danger">{data.variation}</td>
        }
        <td>{Math.round(data.longVariation * 1000) / 1000}</td>
        <td>{variation24}</td>
    </tr>
}

const Table = ({data, prevTicker, onSymbolClick}) => {
    // Build table rows
    let rows = []
    data.forEach((line, i) => {
        rows.push(<Row key={i} data={line} prevTicker={prevTicker} onSymbolClick={onSymbolClick}/>)
    })
    
    return <table id="priceTable" className="table">
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Last %</th>
                <th><span className="golden">Cumul %</span></th>
                <th>24h %</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
}

const PriceTable = ({prices, title, prevTicker, onOpenChart}) => {
    return <React.Fragment>
        <h2>{title}</h2>
        <Table data={prices} prevTicker={prevTicker} onSymbolClick={onOpenChart}/>
    </React.Fragment>
}

export default PriceTable;