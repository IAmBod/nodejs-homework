const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Product = db.model('product', new Schema({
   name: String
}));

module.exports = Product;