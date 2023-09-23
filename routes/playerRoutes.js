const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');



// Display the "Add Player" form

router.post('/add', playerController.addPlayer);

router.get('/add', playerController.getAddPlayerForm);

router.get('/', playerController.listPlayers);

// Search players by name
router.get('/search', playerController.searchPlayersByName);


// GET player details
router.get('/:id', playerController.getPlayerDetails);






// Display the edit form for a player
router.get('/edit/:id', playerController.getPlayerEditForm);

// Implement other routes for CRUD operations (create, update, delete) as needed.

module.exports = router;
