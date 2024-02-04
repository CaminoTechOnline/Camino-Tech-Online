// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');
    
    // Fetch initial data from the server
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        dataContainer.innerText = `Data from the server: ${JSON.stringify(data)}`;
      })
      .catch(error => console.error('Error fetching data:', error));
  
    // Connect to Socket.io
    const socket = io();
  
    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to server via Socket.io');
      
      // Emit an event to get the document content
      socket.emit('get-document', 'documentId'); // You may replace 'documentId' with an actual document ID
    });
  
    socket.on('load-document', (documentContent) => {
      console.log('Document content received:', documentContent);
      // Handle the loaded document content (e.g., update the UI)
    });
  
    // Add more Socket.io event listeners as needed
  
    // Example: Handle a button click event and emit it to the server
    const button = document.getElementById('my-button');
    button.addEventListener('click', () => {
      socket.emit('button-clicked', { message: 'Button clicked!' });
    });
  });
  