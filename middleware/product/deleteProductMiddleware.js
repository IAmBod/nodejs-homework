/**
 * Removes product from database
 *
 * @returns {Function}
 */
module.exports = () => {
    return function (req, res, next) {
        if (typeof res.locals.product === 'undefined') {
            throw new Error('Product does not exist');
        }

        res.locals.product.remove(err => {
            if (err) {
                return next(err);
            }

            next();
        });
    }
};