const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotasController');

// Ruta GET para obtener todas las mascotas
router.get('/', mascotasController.getAllMascotas);

// Ruta POST para crear una nueva mascota
router.post('/', mascotasController.createMascota);

module.exports = router;
