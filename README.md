# Binance-Market (overview)

A simple React App for real-time monitoring of cryptocurrencies trends and targeting short-term variations on Binance Exchange.

This single page App gives the user some lists of cryptocurrencies on the Binance exchange, based on their short-term variation. The goal here is to target strong movements on coins values, and eventually identify investment opportunities. The starting point of the variations is calculated from the loading/reloading of the page, based on successive requests to the Binance API.

* "Cumulative % variation" represents the current evolution of a coin value since the page has been loaded.
* "Absolute % variation" sums all variations as absolute value, and so, represents the stability/instability of a coin value.

The App gives four sorted tables :

* Champions : growing coins (with the higher "Cumul %" variation)
* Loosers : decreasing coins (with the lower "Cumul %" variation)
* Coins on fire : instable coins with strong absolute variation (in % of their value)
* Steady coins : stable coins with weak absolute variation (in % of their value)

User can also search for a specific coin with the bottom search bar, and save some coins in favorites. These favorites are not persistent, but are kept in memory if the page is reloaded through the custom reload button (on top of the page).

A simple python API allows user to connect to Binance API for historical data. This data is needed in order to build a graphical chart with the requested candlesticks (by clicking on the coin name).
This python API needs Binance API credentials, to be set in environment variables.


# Heroku Demo
This project is currently deployed for demo on a Heroku server. You can check it here :
> https://binance-market.herokuapp.com/


# Minimal Setup Example

To build some examples locally, clone this repository :
> git clone https://github.com/oulanbator/binance-market

Go to the repo folder :
> cd binance-market

Then install node dependencies :
> npm install

(Recommended) Create new virtual env and activate it. E.g :
> python -m venv env
> 
> source env/bin/activate

Then install requirements :
> pip install -r requirements.txt

Set your API credential in environment variables :
> export API_KEY=<YourApiKey>
> 
> export API_SECRET=<YourApiSecret>

Run the app :
> gunicorn api:app

That's it !