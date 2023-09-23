const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine and views directory
app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Set the views directory to the 'views' folder

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Define your routes and import them as needed
const playerRoutes = require('./routes/playerRoutes');
app.use('/players', playerRoutes);

// ...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
