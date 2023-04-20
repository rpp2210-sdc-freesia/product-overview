const mongoose = require('mongoose');

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const productListSchema = new mongoose.Schema({
	product_id: Number
	name: String,
	slogan: String,
	description: String,
	category: String,
	default_price: Number
});

const ProductList = mongoose.model('ProductList', productListSchema);

const productFeaturesSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Type.ObjectId,
		ref: 'ProductList'
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
		type: mongoose.Schema.Type.ObjectId,
		ref: 'ProductList'
	}
	results: [
		{
			style_id: Number,
			name: String,
			original_price: Number,
			sale_price: Number,
			default?: Boolean,
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

});

const RelatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);
