const express = require('express');
const app = express();
const port = 5000;
const server = require('http').createServer(app);
const io =  require('socket.io')(server);

// Middleware to parse JSON bodies
app.use(express.json());
app.set("view engine","ejs")
// Middleware to serve static files
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
    res.render("index");
});

io.on('connection', socket => {
    console.log("client connected..")
    socket.on('message',(message)=>{
        console.log(message)
        socket.emit('msg',message);  
  })
});

// Start server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
