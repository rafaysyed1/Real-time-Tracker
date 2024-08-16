const express = require('express');
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Handle Socket.io connection
io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("recieve-location", {
            id: socket.id,
            ...data
        });
    })
    socket.on("user-diconnected",(socket)=>{
        io.emit("User is disconnected!",socket.id);
    })
    console.log("A user connected");
});

// Serve EJS view at root URL
app.get("/", (req, res) => {
    res.render("index");
});

// Start server with a callback
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
