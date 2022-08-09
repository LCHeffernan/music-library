const express = require('express');
const artistController = require('../controller/artists');

const router = express.Router();

router.post('/', artistController.create);

module.exports = router;