const { expect } = require('chai');
const getBasketMiddleware = require('../middleware/basket/getBasketMiddleware');

describe('getBasket middleware', () => {
    [ 0, 1, -1].forEach(id => {
        it('should return a basket with id ' + id, done => {
            let request = {
                params: {
                    id: id
                }
            };
            let response = {
                locals: {}
            };

            let fakeBasketRepository = {
                findOne: (query, callback) => {
                    callback(undefined, {
                        id: query._id
                    });
                }
            };

            getBasketMiddleware(fakeBasketRepository)(request, response, error => {
                expect(response.locals.basket).to.have.property('id');
                expect(response.locals.basket.id).eql(id);
                expect(error).to.eql(undefined);
                done();
            })
        });

        it('should not return a basket with id ' + id, () => {
            let request = {
                params: {
                    id: id
                }
            };
            let response = {
                locals: {}
            };

            let fakeBasketRepository = {
                findOne: (query, callback) => {
                    callback("Basket does not exist with id " + id, undefined);
                }
            };

            getBasketMiddleware(fakeBasketRepository)(request, response, error => {
                expect(response.locals).to.eql({});
                expect(error).to.eql("Basket does not exist with id " + id);
            });
        })
    });
});