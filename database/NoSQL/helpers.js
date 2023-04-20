const mongoCollections = require("./index.js");

var Products = mongoCollections.Products;

const fillDatabase = () => {
};

const logProducts = () => {
	Products.find({})
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log('Error logging products ', err);
	})
};


logProducts();

module.exports = {fillDatabase};