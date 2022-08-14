const express = require('express');
const artistController = require('../controller/artists');

const router = express.Router();

router.post('/', artistController.create);
router.get('/', artistController.read);
router.get('/:artistId', artistController.read);
router.patch('/:artistId', artistController.update);
router.delete('/:artistId', artistController.destroy);

module.exports = router;
