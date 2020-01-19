const deleteBasket = require('../../middleware/basket/deleteBasketMiddleware');
const getBasket = require('../../middleware/basket/getBasketMiddleware');
const listBasket = require('../../middleware/basket/listBasketMiddleware');
const saveBasket = require('../../middleware/basket/saveBasketMiddleware');

const deleteProduct = require('../../middleware/product/deleteProductMiddleware');
const getProduct = require('../../middleware/product/getProductMiddleware');
const listProduct = require('../../middleware/product/listProductMiddleware');
const saveProduct = require('../../middleware/product/saveProductMiddleware');

const render = require('../../middleware/render');
const redirect = require('../../middleware/redirect');

const Colors = require('../../enum/colors');
const Materials = require('../../enum/materials');
const Sizes = require('../../enum/sizes');

const repositoryProvider = require('../../provider/repositoryProvider');

module.exports = app => {
    app.get('',
        redirect('baskets')
    );

    app.get(
        '/baskets',
        listBasket(repositoryProvider('basket')),
        render('basket/index')
    );

    app.get(
        '/baskets/create',
        render('basket/create', {
            Colors: Colors,
            Materials: Materials,
            Sizes: Sizes
        })
    );
    app.post(
        '/baskets/create',
        saveBasket(repositoryProvider('basket')),
        redirect('/baskets')
    );

    app.get(
        '/baskets/:id/edit',
        getBasket(repositoryProvider('basket')),
        listProduct(repositoryProvider('product')),
        render('basket/edit', {
            Colors: Colors,
            Materials: Materials,
            Sizes: Sizes
        })
    );
    app.post(
        '/baskets/:id/edit',
        getBasket(repositoryProvider('basket')),
        saveBasket(
            repositoryProvider('basket'),
            repositoryProvider('product')
        ),
        redirect('/baskets')
    );

    app.post(
        '/baskets/:id/delete',
        getBasket(repositoryProvider('basket')),
        deleteBasket(),
        redirect('/baskets')
    );

    app.get(
        '/products',
        listProduct(repositoryProvider('product')),
        render('product/index')
    );

    app.get(
        '/products/create',
        render('product/create')
    );
    app.post(
        '/products/create',
        saveProduct(repositoryProvider('product')),
        redirect('/products')
    );

    app.get(
        '/products/:id/edit',
        getProduct(repositoryProvider('product')),
        render('product/edit')
    );
    app.post(
        '/products/:id/edit',
        getProduct(repositoryProvider('product')),
        saveProduct(repositoryProvider('product')),
        redirect('/products')
    );

    app.post(
        '/products/:id/delete',
        getProduct(repositoryProvider('product')),
        deleteProduct(),
        redirect('/products')
    )
};