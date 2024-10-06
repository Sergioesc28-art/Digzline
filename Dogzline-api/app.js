const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para la raíz del sitio web
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de gestión de usuarios y mascotas');
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  fs.readFile('./data/usuarios.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer los datos' });
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  fs.readFile('./data/usuarios.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer los datos' });
    }

    const usuarios = JSON.parse(data);
    const usuario = usuarios.find(u => u.id === id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuario);
  });
});

// Ruta para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;

  fs.readFile('./data/usuarios.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer los datos' });
    }

    const usuarios = JSON.parse(data);
    nuevoUsuario.id = usuarios.length + 1;  // Asigna un nuevo ID
    usuarios.push(nuevoUsuario);

    fs.writeFile('./data/usuarios.json', JSON.stringify(usuarios, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar los datos' });
      }

      res.status(201).json(nuevoUsuario);
    });
  });
});

// Ruta para actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const datosActualizados = req.body;

  fs.readFile('./data/usuarios.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer los datos' });
    }

    let usuarios = JSON.parse(data);
    const usuarioIndex = usuarios.findIndex(u => u.id === id);

    if (usuarioIndex === -1) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...datosActualizados };

    fs.writeFile('./data/usuarios.json', JSON.stringify(usuarios, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar los datos' });
      }

      res.json(usuarios[usuarioIndex]);
    });
  });
});

// Ruta para eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile('./data/usuarios.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer los datos' });
    }

    let usuarios = JSON.parse(data);
    usuarios = usuarios.filter(u => u.id !== id);

    fs.writeFile('./data/usuarios.json', JSON.stringify(usuarios, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar los datos' });
      }

      res.status(204).send();
    });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

