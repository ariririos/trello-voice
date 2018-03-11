const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET all archived lists');
    res.send('{}');
});

router.post('/', (req, res) => {
    console.log('POST new archived list');
    res.send('{}');
});

router.post('/:listId', (req, res) => {
    console.log('POST new card to archived list #' + req.params.listId);
    res.send('{}');
});

module.exports = router;