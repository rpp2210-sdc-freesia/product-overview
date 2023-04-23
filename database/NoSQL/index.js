const config = require('../../config.js');
const mongoose = require('mongoose');

/*
productfeatures
products
productstyles
relatedproducts
*/

	mongoose.connect(`mongodb://${config.mongo_ip}` , {
		authSource: "admin",
		user: config.mongo_user,
		pass: config.mongo_pass
	})
	.then(() => {
		console.log('connected to mongo');
	}).catch((err) => {
		console.log('error connecting to mongo ', err);
	})


const productsSchema = new mongoose.Schema({
	product_id: Number,
	name: String,
	slogan: String,
	description: String,
	category: String,
	default_price: Number
});

const Products = mongoose.model('Products', productsSchema);

const productFeaturesSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Products'
	},
	features: [featureSchema]
});

const ProductFeatures = mongoose.model('ProductFeatures', productFeaturesSchema);

const featureSchema = new mongoose.Schema({
	feature_id: Number,
	product_id: Number,
	feature: String,
	value: String
});

const feature = mongoose.model('feature', featureSchema)

const productStylesSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Products'
	},
	results: [styleSchema]
});

const ProductStyles = mongoose.model('ProductStyles', productStylesSchema)

const styleSchema = new mongoose.Schema(
		style_id: Number,
		product_id: Number,
		name: String,
		sale_price: Number,
		original_price: Number,
		'default?': Boolean,
		photos: [photoSchema],
		skus: {
			sku: { type: Map, of: skuSchema },
		}
);

const feature = mongoose.model('feature', productFeatureSchema)

const photoSchema = new mongoose.Schema({
		photo_id: Number,
		style_id: Number,
		thumbnail_url: String,
		url: String
});

const Photo = mongoose.model('Photo', photoSchema);

const skuSchema = new mongoose.Schema({
	{
		sku_id: Number,
		style_id: Number,
		quantity: Number,
		size: String
	}
});

const relatedProductsSchema = new mongoose.Schema({
	product1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Products'
	},
	product2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Products'
	}
});

const RelatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);

module.exports = {Products, ProductFeatures, ProductStyles, RelatedProducts};