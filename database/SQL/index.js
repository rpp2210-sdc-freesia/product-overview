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

module.exports = db;