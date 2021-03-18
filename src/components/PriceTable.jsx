import * as React from 'react'
import './pricetable.css'

const Row = ({data, prevTicker, onSymbolClick, favorites, onFavoriteClick, variationType}) => {
    const symbolRef = React.useRef('')

    const handleSymbolClick = (e) => {
        e.preventDefault()
        onSymbolClick(e.target.text)
    }
    const handleFavoriteClick = (e) => {
        e.preventDefault()
        onFavoriteClick(symbolRef.current.children[0].innerText)
    }
    // get 24hour variation pour ticker 
    let variation24 = 0
    prevTicker.forEach((key, i) => {
        if (key.symbol === data.symbol) {
            variation24 = key.priceChangePercent
        }
    })
    // Get favorite status
    let isFavorite = false
    for (let i = 0 ; i < favorites.length ; i++) {
        if (data.symbol === favorites[i]) {
            isFavorite = true
        }
    }
    const roundedPrice = Math.round(data.price * 100000) / 100000
    return <tr>
        {/* Favorite icon */}
        <td>
            {isFavorite ?
            <a href="/#" onClick={handleFavoriteClick}><i className="fas fa-star text-warning"></i></a> :
            <a href="/#" onClick={handleFavoriteClick}><i className="far fa-star text-warning"></i></a>}
        </td>
        {/* Symbol */}
        <td ref={symbolRef}><a href="/#" onClick={handleSymbolClick}>{data.symbol}</a></td>
        {/* Price */}
        <td>{roundedPrice}</td>
        {/* Instant Variation */}
        {data.variation > 0 ? 
            <td className="text-success">{data.variation}</td> :
            <td className="text-danger">{data.variation}</td>
        }
        {/* App lifetime Variation */}
        {variationType === "cumulative" ? <td>{Math.round(data.cumulativeVariation * 100) / 100}</td> : null}
        {variationType === "absolute" ? <td>{Math.round(data.absoluteVariation * 100) / 100}</td> : null}
        {/* 24 hours variation */}
        <td>{variation24}</td>
    </tr>
}

const Table = ({data, prevTicker, onSymbolClick, favorites, onFavoriteClick, variationType}) => {
    // Build table rows
    let rows = []
    data.forEach((line, i) => {
        rows.push(<Row key={i} 
                    data={line}
                    variationType={variationType} 
                    prevTicker={prevTicker} 
                    onSymbolClick={onSymbolClick} 
                    favorites={favorites}
                    onFavoriteClick={onFavoriteClick}/>)
    })
    if (data.length === 0) {
        return <div className="emptyTable"></div>
    }
    return <table id="priceTable" className="table">
        <thead>
            <tr>
                <th></th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Last %</th>
                {variationType === "cumulative" ?
                    <th><span className="text-warning">Cumul. %</span></th> :
                    <th><span className="text-warning">Absol. %</span></th>
                }
                <th>24h %</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
}

export const PriceTable = ({prices, title, prevTicker, onOpenChart, favorites, onFavoriteChange, variationType="cumulative", icon=null}) => {
    const iconString = "fas fa-" + icon
    return <React.Fragment>
        {title && icon ? <h2>{title} <i className={iconString}></i></h2> : 
            title ? <h2>{title}</h2> : null
        }
        <Table data={prices}
            variationType={variationType} 
            prevTicker={prevTicker} 
            onSymbolClick={onOpenChart} 
            favorites={favorites}
            onFavoriteClick={onFavoriteChange}
            icon={icon}/>
    </React.Fragment>
}

const SearchBar = ({onSubmit, onReload}) => {
    const [search, setSearch] = React.useState('')
    const handleSearch = (e) => {
        e.preventDefault()
        setSearch((e.target.value).toUpperCase())
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(search)
        setSearch('')
    }
    return <div className="input-group globalTableSearch">
        <input type="text" 
            className="form-control" 
            placeholder="Search for a coin..." 
            aria-label="Search" 
            aria-describedby="searchButton"
            value={search}
            onChange={handleSearch} />
            <button className="btn btn-outline-primary" type="button" id="searchButton" onClick={handleSubmit}>
                <i className="fas fa-search"></i>
            </button>
    </div>
}
export const GlobalPriceTable = ({prices, title, prevTicker, onOpenChart, favorites, onFavoriteChange, variationType="cumulative", icon=null}) => {
    const [filteredPrices, setFilteredPrices] = React.useState([])
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
    return <React.Fragment>
        <h2 className="AllMarketTable">{title}</h2>
        <SearchBar onSubmit={handleFilterCoins}/>
        <PriceTable 
            prices={filteredPrices} 
            variationType={variationType} 
            prevTicker={prevTicker}
            onOpenChart={onOpenChart}
            favorites={favorites}
            onFavoriteChange={onFavoriteChange}
            icon={icon}/>
    </React.Fragment>
}