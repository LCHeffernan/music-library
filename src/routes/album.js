const express = require('express');
const albumController = require('../controller/albums');

const router = express.Router();

router.post('/:artistId/album', albumController.create);

module.exports = router;