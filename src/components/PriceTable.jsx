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

export const PriceTable = ({prices, title, prevTicker, onOpenChart}) => {
    return <React.Fragment>
        {title ? <h2>{title}</h2> : null}
        <Table data={prices} prevTicker={prevTicker} onSymbolClick={onOpenChart}/>
    </React.Fragment>
}


const SearchBar = ({onSubmit, onReload}) => {
    const [search, setSearch] = React.useState('')
    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(search)
        setSearch('')
    }
    return <div className="input-group globalTableSearch">
        <input type="text" 
            class="form-control" 
            placeholder="Search for a coin..." 
            aria-label="Search" 
            aria-describedby="searchButton"
            value={search}
            onChange={handleSearch} />
            <button class="btn btn-outline-primary" type="button" id="searchButton" onClick={handleSubmit}>
                <i class="fas fa-search"></i>
            </button>
            <button class="btn btn-outline-success" type="button" id="searchButton" onClick={onReload}>
                <i class="fas fa-redo"></i>
            </button>
        {/* <label htmlFor="searchInput" className="form-label">Search Coin</label>
        <input type="text" className="form-control" id="searchInput" value={search} onChange={handleSearch}/> */}
    </div>
}
export const GlobalPriceTable = ({prices, title, prevTicker, onOpenChart}) => {
    const [filteredPrices, setFilteredPrices] = React.useState(prices)
    const handleFilterCoins = (search) => {
        const result = [...prices].filter(function(line) {
            if (line.symbol.search(search) > -1) {
                return true
            } else {
                return false
            }
        })
        setFilteredPrices(result)
    }
    const handleReload = () => {
        setFilteredPrices(prices)
    }
    return <React.Fragment>
        <h1>{title}</h1>
        <SearchBar onSubmit={handleFilterCoins} onReload={handleReload}/>
        <PriceTable 
            prices={filteredPrices} 
            prevTicker={prevTicker}
            onOpenChart={onOpenChart}/>
    </React.Fragment>
}