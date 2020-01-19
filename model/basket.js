const Schema = require('mongoose').Schema;
const db = require('../config/db');

const ItemSchema = new Schema({
    _product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: {
        type: Number,
        required: true
    }
});

const BasketSchema = new Schema({
    name: String,
    material: String,
    color: String,
    size: String,
    items: [ItemSchema]
});

const Basket = db.model('basket', BasketSchema);

module.exports = Basket;