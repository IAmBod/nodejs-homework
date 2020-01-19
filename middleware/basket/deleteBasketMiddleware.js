/**
 * Removes Basket from database
 *
 * @returns {Function}
 */
module.exports = () => {
    return function (req, res, next) {
        if (typeof res.locals.basket === 'undefined') {
            throw new Error('Basket does not exist');
        }

        res.locals.basket.remove(err => {
            if (err) {
                return next(err);
            }

            next();
        })
    }
};