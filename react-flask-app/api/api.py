#Finnhub url: https://pypi.org/project/websocket_client/
#Finnhub api key: cgrl3q9r01qs9ra1ukagcgrl3q9r01qs9ra1ukb0

#Required Libraries, make sure they are installed in the virtual environment the flask app is running in
#Needs websocket; pip install websocket-client
#Needs requests
#Needs json

import time
from flask import Flask, jsonify, request, Response
from flask_cors import CORS

import threading
import websocket
import requests
import json

APCA_API_KEY_ID = 'PK3UNN4MKYL0LSEEVR0H'
APCA_API_SECRET_KEY = 'JhTIsyOzG0VKJADzeNoHdlGR5VXIX1M5DVjlsQac'
email = "EMAIL NOT SET"
username = "USERNAME NOT SET"
password = "PASSWORD NOT SET"
firstname = "FIRSTNAME NOT SET"
lastname = "LASTNAME NOT SET"
stockWatch = []

#This class represents a basic chunk of stock information obtained by the websocket
class sampleStock:
  price = ""
  symbol = ""
  volume = ""
  def __init__(self, price, symbol, volume):
    self.price = price
    self.symbol = symbol
    self.volume = volume

app = Flask(__name__)
CORS(app)


@app.route('/getInfo')
def get_current_info():
    return { "email" : email,
             "firstname" : firstname,
             "lastname" : lastname,
             "username" : username,
             "password" : password}

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/setInfo', methods=['POST'])
def recieve_info():
    global email, username, firstname, lastname, password

    data = request.json

    email = data["email"]
    username = data["username"]
    firstname = data["firstname"]
    lastname = data["lastname"]
    password = data["password"]

    return jsonify({'success' : True})

#Time should be sent in this format, which is in Zulu time, which is four hours ahead of EST (NJ's time)
#Example: 2022-03-10T16:00:14Z
#This date is March 10th, 2015, Noon.
@app.route('/api/obtainStockData', methods=['POST'])
def obtain_stock_data():
    data = request.json

    startDate = data["startDate"]
    endDate   = data["endDate"]
    limit     = data["limit"]
    symbol    = data["symbol"]

    TRADE_URL   = 'https://data.alpaca.markets/v2/stocks/{}/trades'.format(symbol)

    r = requests.get(TRADE_URL, 
                 headers={'APCA-API-KEY-ID': APCA_API_KEY_ID,
                          'APCA-API-SECRET-KEY': APCA_API_SECRET_KEY},                          
                 params= {'start': startDate,
                          'end': endDate,
                          'limit': limit})
    print(json.loads(r.content))

    return json.loads(r.content)

@app.route('/api/subscribe', methods=['POST'])
def subscribe():
    data = request.json

    symbol = data['symbol']

    msg = '{"type":"subscribe","symbol":"' + symbol + '"}'

    ws.send(msg)

    return jsonify({'success' : True})

@app.route('/api/getLatestTrade', methods=['POST'])
def get_Latest_trade():
    data = request.json
    stockSymbol = data['symbol']
    found = False
    sym = ""
    pri = ""
    vol = ""

    for n in stockWatch:
        if n.symbol == stockSymbol:
            found = True
            sym = n.symbol
            pri = n.price
            vol = n.volume
    
    if found:
        return jsonify({'symbol' : sym, 'price' : pri, 'volume' : vol})
    else:
        return jsonify({'message' : 'Symbol not being watched'})


@app.route('/api/getAllStockWatchItems')
def get_all_stock_watch_items():
    result = []
    for item in stockWatch:
        result.append({"symbol": item.symbol, "price": item.price, "volume": item.volume})
    return jsonify(result)
    

def on_message(ws, message):
    stockData = json.loads(message)
    if 'data' in stockData:
        p = stockData['data'][0]['p']
        s = stockData['data'][0]['s']
        v = stockData['data'][0]['v']

        found = False
        for n in stockWatch:
            if isinstance(n, sampleStock) and n.symbol == s:
                found = True
                n.price = str(p)
                n.volume = str(v)
        
        if not found:
            stockWatch.append(sampleStock(str(p), s, str(v)))
    else:
        print('Unkown Message: ' + message)

def on_error(ws, error):
    print("error: " + error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    print("CONNECTED")
    

def engage_websocket():
    global ws
    websocket.enableTrace(False)
    ws = websocket.WebSocketApp("wss://ws.finnhub.io?token=cgrl3q9r01qs9ra1ukagcgrl3q9r01qs9ra1ukb0",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()



def start_websocket_thread():
    websocket_thread = threading.Thread(target=engage_websocket)
    websocket_thread.daemon = True
    websocket_thread.start()


stockWatch.append(sampleStock("100.50", "GOOG", "1"))
stockWatch.append(sampleStock("50.50", "AAPL", "2"))
stockWatch.append(sampleStock("150.50", "AMZN", "3"))

start_websocket_thread()
app.run(host='0.0.0.0', port=5000)