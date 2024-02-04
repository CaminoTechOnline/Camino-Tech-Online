const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Socket.IO logic for collaborative editing
let documentContent = '';

io.of('/collab').on('connection', (socket) => {
  console.log('A user connected to collaborative editing');

  // Send the current document content to a new client
  socket.emit('load-document', documentContent);

  // Handle edit-document event
  socket.on('edit-document', (content) => {
    documentContent = content;
    // Broadcast the changes to all connected clients
    socket.broadcast.emit('document-changed', content);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from collaborative editing');
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

