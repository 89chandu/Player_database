const Player = require('../models/playerModel');
const mysql = require('mysql2');

// Display the "Add Player" form
exports.getAddPlayerForm = (req, res) => {
  res.render('add-player'); // Update the path as necessary
};

exports.listPlayers = async (req, res) => {
  try {
    // Retrieve the list of players from the database
    const players = await Player.getAllPlayers(); // Implement this function in your Player model

    // Render the player list view with the players data
    res.render('playerList', { players });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching player list');
  }
};

exports.getPlayerDetails = async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);
    res.render('playerDetails', { player });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching player details');
  }
};

exports.searchPlayersByName = async (req, res) => {
  try {
    const playerName = req.query.name; // Get the player name from the query parameter
    const players = await Player.searchByName(playerName);
    
    res.render('searchResults', { players });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error searching for players');
  }
};

exports.getPlayerEditForm = async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);
    res.render('playerEditForm', { player });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching player details for editing');
  }
};

exports.addPlayer = async (req, res) => {
  try {
    // Retrieve form data from the request body
    const { name, age, description, image_url, century, fifty, runs, matches_played } = req.body;

    // Create a database connection
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '7999Ch@ndu', // Replace with your MySQL password
      database: 'playerdb',
    });

    // Connect to the database
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return res.status(500).send('Error adding a player');
      }

      // Example data for a new player
      const playerData = {
        name,
        age,
        description,
        image_url,
        century,
        fifty,
        runs,
        matches_played,
      };

      // Insert a new player into the database
      const sql = 'INSERT INTO players SET ?';

      db.query(sql, playerData, (err, result) => {
        if (err) {
          console.error('Error inserting player: ' + err.message);
          db.end(); // Close the database connection
          return res.status(500).send('Error adding a player');
        }
        console.log('Player inserted successfully.');
        db.end(); // Close the database connection

        // Redirect to a success page or show a success message
        res.redirect('/players'); // You can change this URL to the appropriate page
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding a player');
  }
};
