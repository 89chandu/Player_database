const mysql = require('mysql2');

require('dotenv').config();


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

class Player {
  constructor(id, name, age, description, image_url, century, fifty, runs, matches_played) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.description = description;
    this.image_url = image_url;
    this.century = century;
    this.fifty = fifty;
    this.runs = runs;
    this.matches_played = matches_played;
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM players WHERE id = ?', [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        if (rows.length === 0) {
          return reject(new Error('Player not found'));
        }
        const row = rows[0]; // Assuming there's only one player with the given ID
        const player = new Player(
          row.id,
          row.name,
          row.age,
          row.description,
          row.image_url,
          row.century,
          row.fifty,
          row.runs,
          row.matches_played
        );
        resolve(player);
      });
    });
  }

  // function for getting player list 

  static getAllPlayers() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM players', (err, rows) => {
        if (err) {
          return reject(err);
        }
        const players = rows.map(row => new Player(
          row.id,
          row.name,
          row.age,
          row.description,
          row.image_url,
          row.century,
          row.fifty,
          row.runs,
          row.matches_played
        ));
        resolve(players);
      });
    });
  }

  static updatePlayer(id, updatedData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE players SET ? WHERE id = ?', [updatedData, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.affectedRows === 0) {
          return reject(new Error('Player not found'));
        }
        resolve(result);
      });
    });
  
}

  // Define other class methods for your Player model here

  static searchByName(name) {
    return new Promise((resolve, reject) => {
      console.log('Searching for players with name:', name);
      db.query('SELECT * FROM players WHERE name LIKE ?', [`%${name}%`], (err, rows) => {
        if (err) {
          console.error('Error in searchByName:', err);
          return reject(err);
        }
        const players = rows.map(row => new Player(
          row.id,
          row.name,
          row.age,
          row.description,
          row.image_url,
          row.century,
          row.fifty,
          row.runs,
          row.matches_played
        ));
        console.log('Players found:', players);
        resolve(players);
      });
    });
  }
  
}

module.exports = Player;
