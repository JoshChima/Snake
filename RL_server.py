import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((socket.gethostname(), 3000))
s.listen(5)

while True:
    clientsocket, address = s.accept()
    print(f"new connection: {address}")
    clientsocket.send(bytes("Welcome to the server!", "utf-8"))