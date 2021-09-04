const express = require('express');
const PeopleController = require('../controllers/PeopleController');
const router = express.Router();

// Get all people
router.get('/', PeopleController.getPeople);
// Search for people e.g. /search?id=1&name=Josh
router.get('/search', PeopleController.searchPeople);
// Get a person by id
router.get('/:id', PeopleController.getPersonById);
// Insert a new person
router.post('/', PeopleController.insertPerson);
// Update an existing person's data by id
router.put('/:id', PeopleController.updatePerson);
// Patch is the same as a update method but with partial data
router.patch('/:id', PeopleController.updatePerson);
// Delete a person's data by id
router.delete('/:id', PeopleController.deletePerson);

module.exports = router;