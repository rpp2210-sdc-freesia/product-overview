require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  mongo_ip: process.env.MONGOIP,
  mongo_user: process.env.MONGOUSR,
  mongo_pass: process.env.MONGOPASS
};
