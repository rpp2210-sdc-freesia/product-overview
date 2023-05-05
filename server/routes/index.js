const productList = require('./productList.js');
const productInfo = require('./productInfo.js');
const productListRoute = require('./productList.js');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	if (req.query.product_id) { //Handles query to product_id
		productInfo(req, res);
	} else {
		productList(req, res);
	}
});

router.get('/product_id=:product_id', productInfo);

module.exports = router

//&count=${reviewCount}&sort=newest