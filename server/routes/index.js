const productList = require('./productList.js');
const productListRoute = require('./productList.js');

const productDetailsRoute = require('./productDetails.js'); //Handles info, styles, and related. Takes in a helper key

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	productList(req, res);
});

router.get('/:product_id', (req, res) => productDetailsRoute(req, res, 'getProductInfo'));

router.get('/:product_id/styles', (req, res) => productDetailsRoute(req, res, 'getProductStyles'));

router.get('/:product_id/related', (req, res) => productDetailsRoute(req, res, 'getRelatedProducts'));

module.exports = router

//&count=${reviewCount}&sort=newest