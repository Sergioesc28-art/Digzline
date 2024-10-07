// index.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const readData = () => {
    const data = fs.readFileSync('mascotas.json');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync('mascotas.json', JSON.stringify(data, null, 2));
};

// GET all mascotas
app.get('/mascotas', (req, res) => {
    const data = readData();
    res.json(data.mascotas);
});

// GET mascota by ID
app.get('/mascotas/:id', (req, res) => {
    const data = readData();
    const mascota = data.mascotas.find(m => m.id === parseInt(req.params.id));
    if (mascota) {
        res.json(mascota);
    } else {
        res.status(404).send('Mascota no encontrada');
    }
});

// POST new mascota
app.post('/mascotas', (req, res) => {
    const data = readData();
    const newMascota = req.body;
    newMascota.id = data.mascotas.length ? data.mascotas[data.mascotas.length - 1].id + 1 : 1;
    data.mascotas.push(newMascota);
    writeData(data);
    res.status(201).json(newMascota);
});

// PUT update mascota
app.put('/mascotas/:id', (req, res) => {
    const data = readData();
    const index = data.mascotas.findIndex(m => m.id === parseInt(req.params.id));
    if (index !== -1) {
        data.mascotas[index] = { ...data.mascotas[index], ...req.body };
        writeData(data);
        res.json(data.mascotas[index]);
    } else {
        res.status(404).send('Mascota no encontrada');
    }
});

// DELETE mascota
app.delete('/mascotas/:id', (req, res) => {
    const data = readData();
    const index = data.mascotas.findIndex(m => m.id === parseInt(req.params.id));
    if (index !== -1) {
        const deletedMascota = data.mascotas.splice(index, 1);
        writeData(data);
        res.json(deletedMascota);
    } else {
        res.status(404).send('Mascota no encontrada');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
