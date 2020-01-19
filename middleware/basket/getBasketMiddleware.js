// const example = {
//     id: 1,
//     name: 'Basket #1',
//     size: 'large',
//     material: 'wood',
//     color: 'red',
//     items: [
//         {
//             id: 1,
//             name: 'Product #1',
//             quantity: 1
//         },
//         {
//             id: 2,
//             name: 'Product #2',
//             quantity: 4
//         }
//     ]
// };

/**
 * Loads Basket from database using :basket parameter
 * Result is stored in res.locals.basket
 *
 * @returns {Function}
 */
module.exports = (basketRepository) => {
    return function (req, res, next) {
        basketRepository.findOne({
           _id: req.params.id
        }, (err, basket) => {
            if (err) {
                return next(err);
            }

            basket.getItemQuantityForProduct = function (product) {
                let items = basket.items || [];
                let item = items.find(element => {
                    return element._product.equals(product._id)
                });

                return item ? item.quantity : 0;
            };

            res.locals.basket = basket;
            next();
        });
    }
};