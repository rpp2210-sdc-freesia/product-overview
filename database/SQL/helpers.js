const db = require('./index.js');

/*
SELECT json_build_object(
				'id', p.product_id,
				'name', p.name,
				'slogan', p.slogan,
				'description', p.description,
				'category', p.category,
				'default_price', p.default_price,
				'features', json_agg(json_build_object(
						'feature', f.feature,
						'value', f.value
				)))
				AS product
				FROM product_list p
				JOIN product_features f ON p.product_id = f.product_id
				WHERE p.product_id = ${i}
				GROUP BY p.product_id;
*/

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
				})
		}
		resolve(result);
	});
}

module.exports = {getProductList};