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


// db.query(`COPY product_list(product_id,name,slogan,description,category,default_price)
// FROM '/home/bsbaker/hackreactor/sdc-product-overview/dataSet/product.csv'
// DELIMITER ','
// CSV HEADER;`, (err, res) => {
// 	if (err) {
// 		console.log('error saving', err);
// 	}
// })

module.exports = db;