const {Client} = require('pg');

const config = require('../../config.js');

const db = new Client({
	user: config.post_user,
	host: 'localhost', //Might need to fix when running inside of docker
	database: config.post_db,
	password: config.post_pass,
	port: config.post_port
});

db.connect()
.then(() => {
	console.log('Connected to database')
})
.catch((err) => {
	console.log('Error connecting to database ', err)
})


db.query(`SELECT json_build_object(
    'id', p.product_id,
    'name', p.name,
    'slogan', p.slogan,
    'description', p.description,
    'category', p.category,
    'default_price', p.default_price,
    'features', json_agg(json_build_object(
        'feature', f.feature,
        'value', f.value
    ))
) AS product
FROM product_list p
JOIN product_features f ON p.product_id = f.product_id
WHERE p.product_id = 11
GROUP BY p.product_id;`, (err, res) => {
	if (err) {
		console.log('error saving', err);
	} else {
		console.log(res.rows);
	}
})

module.exports = db;