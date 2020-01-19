const deleteBasket = require('../../middleware/basket/deleteBasketMiddleware');
const getBasket = require('../../middleware/basket/getBasketMiddleware');
const listBasket = require('../../middleware/basket/listBasketMiddleware');
const saveBasket = require('../../middleware/basket/saveBasketMiddleware');

const deleteProduct = require('../../middleware/product/deleteProductMiddleware');
const getProduct = require('../../middleware/product/getProductMiddleware');
const listProduct = require('../../middleware/product/listProductMiddleware');
const saveProduct = require('../../middleware/product/saveProductMiddleware');

const repositoryProvider = require('../../provider/repositoryProvider');

const render = require('../../middleware/renderApi');

module.exports = app => {
    app.get(
        '/api/baskets',
        listBasket(repositoryProvider('basket')),
        render('baskets')
    );

    app.post(
        '/api/baskets/create',
        saveBasket(repositoryProvider('basket')),
        render()
    );

    app.get(
        '/api/baskets/:id',
        getBasket(repositoryProvider('basket')),
        render()
    );

    app.post(
        '/api/baskets/:id/edit',
        getBasket(repositoryProvider('basket')),
        saveBasket(
            repositoryProvider('basket'),
            repositoryProvider('product')
        ),
        render()
    );

    app.post(
        '/api/baskets/:id/delete',
        getBasket(repositoryProvider('basket')),
        deleteBasket(),
        render()
    );

    app.get(
        '/api/products',
        listProduct(repositoryProvider('product')),
        render('products')
    );

    app.post(
        '/api/products/create',
        saveProduct(repositoryProvider('product')),
        render()
    );

    app.post(
        '/api/products/:id/edit',
        getProduct(repositoryProvider('product')),
        saveProduct(repositoryProvider('product')),
        render()
    );

    app.post(
        '/api/products/:id/delete',
        getProduct(repositoryProvider('product')),
        deleteProduct(),
        render()
    );
};