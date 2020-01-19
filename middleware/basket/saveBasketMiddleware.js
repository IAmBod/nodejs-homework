const Colors = require('../../enum/colors');
const Materials = require('../../enum/materials');
const Sizes = require('../../enum/sizes');

/**
 * Creates a Basket if not provided in :basket parameter
 * And then updates the given Basket
 *
 * @returns {Function}
 */
module.exports = (basketRepository, productRepository, itemRepository) => {
    return function (req, res, next) {
        if (typeof req.body.name === 'undefined'
            || typeof req.body.material === 'undefined'
            || typeof req.body.color === 'undefined'
            || typeof req.body.size === 'undefined'
        ) {
            return next();
        }

        let material = Materials
            .find(material => material.code === req.body.material)
        ;

        if (typeof material === 'undefined') {
            return next();
        }

        let color = Colors
            .find(color => color.code === req.body.color)
        ;

        if (typeof color === 'undefined') {
            return next();
        }

        let size = Sizes
            .find(size => size.code === req.body.size)
        ;

        if (typeof size === 'undefined') {
            return next();
        }

        let create = (typeof res.locals.basket === 'undefined');

        if (create) {
            if (typeof req.body.items !== 'undefined') {
                return next();
            }

            res.locals.basket = new basketRepository();
        } else {
            if (typeof productRepository === 'undefined') {
                return next();
            }
        }

        res.locals.basket.name = req.body.name;
        res.locals.basket.material = req.body.material;
        res.locals.basket.color = req.body.color;
        res.locals.basket.size = req.body.size;

        res.locals.basket.items = [];

        if (!create) {
            let items = Object.keys(req.body)
                .filter(key => key.startsWith('item-'))
            ;

            for (key of items) {
                let quantity = parseInt(req.body[key]);

                if (isNaN(quantity) || quantity < 0) {
                    return next("One of the items' quantity is invalid");
                }
            }

            items = items
                .map(key => {
                    return {
                        id: key.replace(/^(item-)/, ''),
                        quantity: req.body[key]
                    }
                })
            ;

            let productPromises = items
                .map(item => productRepository
                    .findOne({
                        _id: item.id
                    })
                    .exec()
                )
            ;


            Promise
                .all(productPromises)
                .then(products => {
                    products.forEach(product => {
                        res.locals.basket.items.push({
                            _product: product,
                            quantity: items.find(element => element.id == product._id).quantity
                        });
                    });

                    res.locals.basket.save(err => {
                        if (err) {
                            return next(err);
                        }

                        next();
                    });
                })
                .catch(reason => {
                    next(reason);
                })
            ;

            return;
        }

        res.locals.basket.save(err => {
            if (err) {
                return next(err);
            }

            next();
        });
    }
};