const db = require('./index.js');

var getProductList = (count, page) => {
	return new Promise (async (resolve, reject) => {
	db.query(`
		SELECT
			p.product_id AS id,
			p.name,
			p.slogan,
			p.description,
			p.category,
			p.default_price
		FROM
			product_list p
		OFFSET ($1::INTEGER - 1) * $2::INTEGER
		LIMIT $2::INTEGER;
		`, [page, count])
		.then((data) => {
			resolve(data.rows);
		})
		.catch((err) => {
			reject(err);
			return;
		});
	});
};

var getProductInfo = async (id) => {
	return new Promise ((resolve, reject) => {
		db.query(`
			SELECT
				p.product_id AS id,
				p.name,
				p.slogan,
				p.description,
				p.category,
				p.default_price,
				(
					SELECT COALESCE(json_agg(
							json_build_object(
									'feature', f.feature,
									'value', f.value
							)
					), '[]')
					FROM product_features f
					WHERE p.product_id = f.product_id AND f.feature IS NOT NULL AND f.value IS NOT NULL
				) AS features
			FROM product_list p
			WHERE p.product_id = ${id};
		`)
			.then((data) => {
				resolve(data.rows[0]);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

var getProductStyles = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`
			SELECT COALESCE(
				(
				SELECT json_agg(results) AS results
				FROM (
					SELECT
						s.style_id,
						s.name,
						s.original_price,
						s.sale_price,
						s."default?",
						COALESCE(
							(
							SELECT json_agg(
								jsonb_build_object(
									'thumbnail_url', p.thumbnail_url,
									'url', p.url
								)
									)
							FROM photos p
							WHERE p.style_id = s.style_id AND p.thumbnail_url IS NOT NULL AND p.url IS NOT NULL
						),
							'[]'
						) AS photos,
						COALESCE(
							(
								SELECT jsonb_object_agg(sk.id, jsonb_build_object(
									'quantity', sk.quantity,
									'size', sk.size
								))
								FROM skus sk
								WHERE sk.style_id = s.style_id AND sk.quantity IS NOT NULL AND sk.size IS NOT NULL
							),
							'{}'
						) AS skus
					FROM product_list p
					LEFT JOIN product_styles s ON p.product_id = s.product_id
					WHERE p.product_id = ${id} AND s.style_id IS NOT NULL
				) AS results
				),
			'[]'
			) AS results;
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