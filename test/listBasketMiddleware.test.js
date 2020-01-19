const { expect } = require('chai');
const listBasketMiddleware = require('../middleware/basket/listBasketMiddleware');

describe('listBasket middleware', () => {
    it('should return baskets', done => {
        let request = {};
        let response = {
            locals: {}
        };

        let fakeBasketRepository = {
            find: (query, callback) => {
                callback(undefined, [
                    "basket1", "basket2"
                ]);
            }
        };

        listBasketMiddleware(fakeBasketRepository)(request, response, error => {
            expect(response.locals.baskets).to.eql([
                "basket1", "basket2"
            ]);
            expect(error).to.eql(undefined);
            done();
        })
    })
});