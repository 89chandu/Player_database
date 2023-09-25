const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

// Display the "Add Player" form
router.get('/add', playerController.getAddPlayerForm);
router.post('/add', playerController.addPlayer);

// List all players
router.get('/', playerController.listPlayers);

// Search players by name
router.get('/search', playerController.searchPlayersByName);

// GET player details
router.get('/:id', playerController.getPlayerDetails);

// Display the edit form for a player
router.get('/edit/:id', playerController.getPlayerEditForm);

// Handle the edit player form submission
// router.post('/edit/:id', playerController.editPlayer);
router.post('/update/:id', playerController.updatePlayer);
// Update a player
router.post('/update/:id', playerController.updatePlayer);


module.exports = router;
