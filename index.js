const express = require('express');
const Contenedor = require('./contenedor');
const productos = new Contenedor('./productos.txt');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => {
	console.log(`ERROR en el servidor ${error}`);
});

app.get('/productos', (req, res) => {
	productos.getAll().then((element) => res.json(element));
});

app.get('/productoRandom', (req, res) => {
	productos
		.getAll()
		.then((element) =>
			res.json(element[Math.floor(Math.random() * element.length)])
		);
});
