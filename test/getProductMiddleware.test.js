const { expect } = require('chai');
const getProductMiddleware = require('../middleware/product/getProductMiddleware');

describe('getProduct middleware', () => {
    [ 0, 1, -1].forEach(id => {
        it('should return a product with id ' + id, done => {
            let request = {
                params: {
                    id: id
                }
            };
            let response = {
                locals: {}
            };

            let fakeProductRepository = {
                findOne: (query, callback) => {
                    callback(undefined, {
                        id: query._id
                    });
                }
            };

            getProductMiddleware(fakeProductRepository)(request, response, error => {
                expect(response.locals.product).to.eql({
                    id: id
                });
                expect(error).to.eql(undefined);
                done();
            })
        });

        it('should not return a product with id ' + id, () => {
            let request = {
                params: {
                    id: id
                }
            };
            let response = {
                locals: {}
            };

            let fakeProductRepository = {
                findOne: (query, callback) => {
                    callback("Product does not exist with id " + id, undefined);
                }
            };

            getProductMiddleware(fakeProductRepository)(request, response, error => {
                expect(response.locals).to.eql({});
                expect(error).to.eql("Product does not exist with id " + id);
            });
        })
    });
});