import http from 'http';
import app from './app/app.js';

//create a server

const PORT = process.env.PORT || 3000;

const server  = http.createServer(app);
server.listen(PORT, console.log(`server started and running at  Port ${PORT}`))