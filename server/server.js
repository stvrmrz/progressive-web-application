const express = require('express');
const path = require('path'); // Built-in Node.js module to handle file paths

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
