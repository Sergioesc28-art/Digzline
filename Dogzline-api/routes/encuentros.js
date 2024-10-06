const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../data/encuentros.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo');
        } else {
            const encuentros = JSON.parse(data);
            res.json(encuentros);
        }
    });
});


router.get('/:id', (req, res) => {
    const filePath = path.join(__dirname, '../data/encuentros.json');
    const encuentroId = parseInt(req.params.id);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo');
        } else {
            const encuentros = JSON.parse(data).encuentros;
            const encuentro = encuentros.find(enc => enc.id === encuentroId);
            
            if (encuentro) {
                res.json(encuentro);
            } else {
                res.status(404).send('Encuentro no encontrado');
            }
        }
    });
});

module.exports = router;
