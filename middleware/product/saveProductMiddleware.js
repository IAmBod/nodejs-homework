/**
 * Creates a Product if not provided in :product parameter
 * And then updates the given Product
 *
 * @returns {Function}
 */
module.exports = (productRepository) => {
    return function (req, res, next) {
        if (typeof req.body.name === 'undefined') {
            return next();
        }

        if (typeof res.locals.product === 'undefined') {
            res.locals.product = new productRepository();
        }

        res.locals.product.name = req.body.name;

        res.locals.product.save(err => {
            if (err) {
                return next(err);
            }

            next();
        })
    }
};