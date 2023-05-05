const productList = require('./productList.js');
const productInfoRoute = require('./productInfo.js');
const productListRoute = require('./productList.js');
const productStylesRoute = require('./productStyles.js');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	productList(req, res);
});

router.get('/:product_id', productInfoRoute);

router.get('/:product_id/styles', productStylesRoute);

module.exports = router

//&count=${reviewCount}&sort=newest