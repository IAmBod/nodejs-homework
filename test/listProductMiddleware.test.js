const { expect } = require('chai');
const listProductMiddleware = require('../middleware/product/listProductMiddleware');

describe('listProduct middleware', () => {
    it('should return products', done => {
        let request = {};
        let response = {
            locals: {}
        };

        let fakeProductRepository = {
            find: (query, callback) => {
                callback(undefined, [
                    "product1", "product2"
                ]);
            }
        };

        listProductMiddleware(fakeProductRepository)(request, response, error => {
            expect(response.locals.products).to.eql([
                "product1", "product2"
            ]);
            expect(error).to.eql(undefined);
            done();
        })
    })
});