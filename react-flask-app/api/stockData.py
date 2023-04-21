#This code demonstrates obtaining historical data from a specific stock over a specific time period
#and then opening a web socket in order to obtain live market data

#Finnhub url: https://pypi.org/project/websocket_client/
#Finnhub api key: cgrl3q9r01qs9ra1ukagcgrl3q9r01qs9ra1ukb0

#Required Libraries
#Needs websocket; pip install websocket-client
#Needs requests
#Needs json

import websocket
import requests
import json

APCA_API_KEY_ID = 'PK3UNN4MKYL0LSEEVR0H'
APCA_API_SECRET_KEY = 'JhTIsyOzG0VKJADzeNoHdlGR5VXIX1M5DVjlsQac'

start_date  = '2022-03-10T16:00:14Z'
end_date    = '2022-03-18T16:00:14Z'
data_points = '10'
symbol      = 'AAPL'
TRADE_URL   = 'https://data.alpaca.markets/v2/stocks/{}/trades'.format(symbol)

#This date is March 10th, 2015, Noon.
#It's in Zulu time, which is four hours ahead of EST (NJ's time)
#Example: 2022-03-10T16:00:14Z

r = requests.get(TRADE_URL, 
                 headers={'APCA-API-KEY-ID': APCA_API_KEY_ID,
                          'APCA-API-SECRET-KEY': APCA_API_SECRET_KEY},                          
                 params= {'start': start_date,
                          'end': end_date,
                          'limit': data_points})
#print(json.loads(r.content))

def on_message(ws, message):
    print("message: " + message)

def on_error(ws, error):
    print("error: " + error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    ws.send('{"type":"subscribe","symbol":"AAPL"}')
    ws.send('{"type":"subscribe","symbol":"AMZN"}')


websocket.enableTrace(True)
ws = websocket.WebSocketApp("wss://ws.finnhub.io?token=cgrl3q9r01qs9ra1ukagcgrl3q9r01qs9ra1ukb0",
                             on_message = on_message,
                             on_error = on_error,
                             on_close = on_close)
ws.on_open = on_open
ws.run_forever()