const http = require('http');
const webSocketServer = require('websocket').server

let connections = [];

const httpserver = http.createServer();

const websocket = new webSocketServer({'httpServer': httpserver}); // connnect http server to the websocket

httpserver.listen(8080, () => console.log("hey im listening 8080"));


websocket.on ("request", request => {
    const connection = request.accept(null, request.origin); // accept incoming request 
    connection.on("message", message => {
        connections.forEach (c => c.send(`User${connection.socket.remotePort} says: ${message.utf8Data}`))
    })

    connections.push(connection);
    connections.forEach ( c => c.send(`User${connection.socket.remotePort} just connected.`))
})

// client code
// let ws = new WebSocket("ws://localhost:8080");
// ws.onmessage = message => console.log(`${message.data}`);
