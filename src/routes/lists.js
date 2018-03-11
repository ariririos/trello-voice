const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET all lists');
    res.send('{}');
});

router.post('/', (req, res) => {
    console.log('POST new list');
    res.send('{}');
});

router.get('/:listId', (req, res) => {
    console.log('GET list #' + req.params.listId);
    res.send('{}');
});

router.post('/:listId', (req, res) => {
    console.log('POST new card to list #' + req.params.listId);
    res.send('{}');
});

router.get('/:listId/:cardId', (req, res) => {
    console.log('GET card #' + req.params.cardId + ' from list #' + req.params.listId);
    res.send('{}');
});

router.post('/:listId/:cardId', (req, res) => {
    console.log('POST info to card #' + req.params.cardId + ' from list #' + req.params.listId);
    res.send('{}');
});

module.exports = router;