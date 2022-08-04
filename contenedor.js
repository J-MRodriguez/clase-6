const fs = require('fs').promises;

class Contenedor {
	constructor(nombredelArchivo) {
		this.nombredelArchivo = nombredelArchivo;
	}

	async save(obj) {
		try {
			let ids = [];
			const productos = await fs.readFile(this.nombredelArchivo, 'utf-8');
			const datos = JSON.parse(productos);
			datos.forEach((element) => {
				ids.push(element.id);
			});
			obj.id = Math.max(...ids) + 1;
			datos.push(obj);
			let nuevaData = JSON.stringify(datos, null, 1);
			fs.writeFile(this.nombredelArchivo, nuevaData);
			return Math.max(...ids) + 1;
		} catch (error) {
			console.log('hubo un error:', error);
		}
	}

	async getById(number) {
		try {
			const productos = await fs.readFile(this.nombredelArchivo, 'utf-8');
			const datos = JSON.parse(productos);
			let elementById = datos.find((element) => element.id === number);
			if (elementById) {
				return elementById;
			} else {
				return null;
			}
		} catch (error) {
			console.log('hubo un error:', error);
		}
	}

	async getAll() {
		try {
			const productos = await fs.readFile(this.nombredelArchivo, 'utf-8');
			const datos = JSON.parse(productos);
			return datos;
		} catch (error) {
			console.log('hubo un error:', error);
		}
	}

	async deleteById(number) {
		try {
			const productos = await fs.readFile(this.nombredelArchivo, 'utf-8');
			const datos = JSON.parse(productos);
			let datosfiltrados = datos.filter((element) => element.id !== number);
			let nuevaData = JSON.stringify(datosfiltrados, null, 1);
			fs.writeFile(this.nombredelArchivo, nuevaData);
		} catch (error) {
			console.log('hubo un error:', error);
		}
	}

	async deleteAll() {
		try {
			fs.writeFile(this.nombredelArchivo, '[]');
		} catch (error) {
			console.log('hubo un error:', error);
		}
	}
}

module.exports = Contenedor;
