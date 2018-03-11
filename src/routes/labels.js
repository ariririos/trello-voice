const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET all labels');
    res.send('{}');
});

router.post('/', (req, res) => {
    console.log('POST new label');
    res.send('{}');
});

module.exports = router;