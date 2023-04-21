const config = require('../../config.js');
const mongoose = require('mongoose');
console.log(config);
	mongoose.connect(`mongodb://${config.mongo_ip}` , {
		authSource: "admin",
		user: config.mongo_user,
		pass: config.mongo_pass
	})
	.then(() => {
		console.log('connected to mongo')
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
	features: [
		{
			feature: String,
			value: String
		}
	]
});

const ProductFeatures = mongoose.model('ProductFeatures', productFeaturesSchema);

const productStylesSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Products'
	},
	results: [
		{
			style_id: Number,
			name: String,
			original_price: Number,
			sale_price: Number,
			'default?': Boolean,
			photos: [
				{
					thumbnail_url: String,
					url: String
				},
			],
			skus: {
				sku_id: {
					quantity: Number,
					size: String
				}
			}
		}
	]
});

const ProductStyles = mongoose.model('ProductStyles', productStylesSchema)

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