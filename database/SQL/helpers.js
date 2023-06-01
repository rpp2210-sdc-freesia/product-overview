const db = require('./index.js');
//1000011
//106780
var getProductList = async (count, page) => {
	return new Promise (async (resolve, reject) => {
		var result = [];
		var start = ((page-1) * count) + 1;
		for (var i = ((page-1) * count) + 1; i < start + count; i++) {
			await db.query(`SELECT json_build_object(
				'id', p.product_id,
				'name', p.name,
				'slogan', p.slogan,
				'description', p.description,
				'category', p.category,
				'default_price', p.default_price
				)
				AS product
				FROM product_list p
				WHERE p.product_id = ${i}
				GROUP BY p.product_id;`)
				.then((data) => {
					if (data.rows.length === 0) {
						resolve(result);
						return;
					}
					result.push(data.rows[0].product);
				})
				.catch((err) => {
					reject(err);
					return;
				});
		}
		resolve(result);
	});
};

var getProductInfo = async (id) => {
	return new Promise ((resolve, reject) => {
		db.query(`
			SELECT json_build_object(
				'id', p.product_id,
				'name', p.name,
				'slogan', p.slogan,
				'description', p.description,
				'category', p.category,
				'default_price', p.default_price,
				'features', (
					SELECT COALESCE(json_agg(json_build_object(
							'feature', f.feature,
							'value', f.value
					)), '[]')
					FROM product_features f
					WHERE p.product_id = f.product_id AND f.feature IS NOT NULL AND f.value IS NOT NULL
				))
			AS product
			FROM product_list p
			WHERE p.product_id = ${id};
			`)
			.then((data) => {
				resolve(data.rows[0].product);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

var getProductStyles = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`
			SELECT json_agg(json_build_object(
				'style_id', s.style_id,
				'name', s.name,
				'sale_price', s.sale_price,
				'original_price', s.original_price,
				'default?', s."default?",
				'photos', (
						SELECT COALESCE(json_agg(json_build_object(
								'thumbnail_url', p.thumbnail_url,
								'url', p.url
						)), '[]')
						FROM photos p
						WHERE p.style_id = s.style_id AND p.thumbnail_url IS NOT NULL AND p.url IS NOT NULL
				)))
			AS results
			FROM product_styles s
			WHERE s.product_id = ${id}
			GROUP BY s.product_id;
	`)
		.then((data) => {
			var result = {product_id:id, results: []};
			if (data.rows[0]) {
				result.results = data.rows[0].results;
			}
			resolve(result);
		})
		.catch((err) => {
			reject(err);
		});
	});
};

var getRelatedProducts = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`
			SELECT ARRAY_AGG(related_product_id)
			AS related
			FROM related_products
			WHERE related_products.current_product_id = ${id}
		`)
		.then((data) => {
			if (!data.rows[0].related) {
				resolve([]);
			}
			resolve(data.rows[0].related);
		})
		.catch((err) => {
			reject(err);
		});
	});
};


module.exports = {getProductList, getProductInfo, getProductStyles, getRelatedProducts};