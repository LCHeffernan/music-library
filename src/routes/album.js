const express = require('express');
const albumController = require('../controller/albums');

const router = express.Router();

router.post('/:artistId/album', albumController.create);
router.get('/', albumController.read);
router.get('/:albumId', albumController.read);
router.patch('/:albumId', albumController.update);
router.delete('/:albumId', albumController.destroy);

module.exports = router;
