// const example = [
//     {
//         id: 1,
//         name: "Basket #1"
//     }
// ];

/**
 * Loads all Baskets from database
 * Result is saved to res.locals.baskets
 *
 * @returns {Function}
 */
module.exports = (basketRepository) => {
    return function (req, res, next) {
        basketRepository.find({}, (err, baskets) => {
            if (err) {
                return next(err);
            }

            res.locals.baskets = baskets;
            next();
        });
    }
};