const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;

const server = new WebSocketServer({
    port: 3000,
});
let i = 0;
let wsList = new Map();
server.on("connection", (ws, req) => {
    const ip = req.connection.remoteAddress;
    i++;
    if (i < 3) wsList.set(ip, ws);
    console.log("connected: " + i);
    console.log(ip);
    ws.on("message", function(message) {
        console.log(`[SERVER] Received: ${i}`);
        console.log(wsList);

        ws.send(`ECHO: ${i}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    });
});