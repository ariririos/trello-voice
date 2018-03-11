const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET all dates');
    res.send('{}');
});

module.exports = router;