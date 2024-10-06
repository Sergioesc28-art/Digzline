const express = require('express');
const bodyParser = require('body-parser');
const encuentrosRoutes = require('./routes/encuentros');

const app = express();
const port = 3000;


app.use(bodyParser.json());


app.use('/api/encuentros', encuentrosRoutes);


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
