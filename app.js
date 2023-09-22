const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the views directory and view engine (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7999Ch@ndu',
    database: 'playerdb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Player Database');
});

app.get('/players', (req, res) => {
    // Retrieve all players from the database
    db.query('SELECT * FROM players', (err, results) => {
        if (err) throw err;
        res.render('players', { players: results });
    });
});

app.get('/add-player', (req, res) => {
    res.render('add-player');
});

app.post('/add-player', (req, res) => {
    const player = req.body;
    // Insert player data into the database
    db.query('INSERT INTO players SET ?', player, (err, result) => {
        if (err) throw err;
        res.redirect('/players');
    });
});

app.get('/players/:id', (req, res) => {
    const playerId = req.params.id;

    // Retrieve player details from the database based on the player's ID
    db.query('SELECT * FROM players WHERE id = ?', [playerId], (err, results) => {
        if (err) throw err;

        // Check if a player with the given ID exists
        if (results.length === 0) {
            res.status(404).send('Player not found');
            return;
        }

        // Render the player details view
        res.render('player-details', { player: results[0] });
    });
});

app.get('/players', (req, res) => {
    const search = req.query.search;

    // If a search query is provided, filter players by name
    if (search) {
        const sql = 'SELECT * FROM players WHERE name LIKE ?';
        db.query(sql, [`%${search}%`], (err, results) => {
            if (err) throw err;
            res.render('players', { players: results });
        });
    } else {
        // Retrieve all players from the database
        db.query('SELECT * FROM players', (err, results) => {
            if (err) throw err;
            res.render('players', { players: results });
        });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
