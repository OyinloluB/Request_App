const express = require('express');
const router = express.router();

router.get('/', (req, res) => {
    request.find()
    .then(request => res.json())
    .catch(err => res.status(400).json('Error'+ err ))
})