const repositories = {
    basket: require('../model/basket'),
    product: require('../model/product')
};

module.exports = function (name) {
    return repositories[name];
};