// const example = [
//     {
//         id: 1,
//         name: 'Product #1'
//     },
//     {
//         id: 2,
//         name: 'Product #2'
//     }
// ];

/**
 * Loads all Products from database
 * Result is saved to res.locals.products
 *
 * @returns {Function}
 */
module.exports = (productRepository) => {
    return function (req, res, next) {
        productRepository.find({}, (err, products) => {
            if (err) {
                return next(err);
            }

            res.locals.products = products;
            next();
        });
    }
};