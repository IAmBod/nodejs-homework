// const example = {
//     id: 1,
//     name: 'Product #1'
// };

/**
 * Loads Product from database using :product parameter
 * Result is stored in res.locals.product
 *
 * @returns {Function}
 */
module.exports = (productRepository) => {
    return function (req, res, next) {
        productRepository.findOne({
            _id: req.params.id
        }, (err, product) => {
            if (err) {
                return next(err);
            }

            res.locals.product = product;
            next()
        });
    }
};