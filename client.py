#!/usr/bin/env python
# encoding: utf-8
"""
client.py
Based heavily on:
 - https://github.com/mtah/python-websocket/blob/master/examples/echo.py
 - http://stackoverflow.com/a/7586302/316044
Created by Drew Harry on 2011-11-28.
"""

import websocket, http.client, sys, asyncore

'''
    connect to the socketio server
    1. perform the HTTP handshake
    2. open a websocket connection '''

def connect(server, port):
    
    print("connecting to: %s:%d x%d" %(server, port, num_clients))
    
    conn  = http.client.HTTPConnection(server + ":" + str(port))
    conn.request('POST','/socket.io/1/')
    resp  = conn.getresponse() 
    hskey = resp.read().split(':')[0]

    _ws = websocket.WebSocket(
                    'ws://'+server+':'+str(port)+'/socket.io/1/websocket/'+hskey,
                    onopen   = _onopen,
                    onmessage = _onmessage,
                    onclose = _onclose)

def _onopen():
    print("opened!")

def _onmessage(msg):
    print("msg: " + str(msg))

def _onclose():
    print("closed!")


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.stderr.write('usage: python client.py <server> <port>\n')
        sys.exit(1)
    
    server = sys.argv[1]
    port = int(sys.argv[2])
    
    connect(server, port)
    
    try:
        asyncore.loop()
    except KeyboardInterrupt:
        ws.close()