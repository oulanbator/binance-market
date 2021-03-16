from flask import Flask, render_template, request, flash, redirect, url_for, jsonify
from binance.client import Client
from binance.enums import *
import config

app = Flask(__name__, static_folder='build', static_url_path='/')
app.config['SECRET_KEY'] = "azeqqzdsrgsfqzdsefsfsdqzgxgsefsdwxc"

client = Client(config.API_KEY, config.API_SECRET)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/history/<symbol>/<timeframe>')
def history(symbol, timeframe):
    timeframe_periods = {
        "1m": "6 hours ago UTC",
        "5m": "18 hours ago UTC",
        "15m": "90 hours ago UTC",
        "1h": "15 days ago UTC",
        "1d": "360 days ago UTC"
    }
    try:
        # Fetch candles
        candles = client.get_historical_klines(symbol, timeframe, timeframe_periods.get(timeframe))
        # Map response
        processed_candles = []
        for data in candles:
            candle = {
                'time': data[0]/1000,
                'open': data[1],
                'high': data[2],
                'low': data[3],
                'close': data[4]
            }
            processed_candles.append(candle)
        return jsonify(processed_candles)
    except:
        return jsonify({"errorStatus": True})
