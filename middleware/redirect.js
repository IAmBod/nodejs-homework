const url = require('url');

/**
 * Redirects to a route
 *
 * @param {String} path
 * @returns {Function}
 */
module.exports = path => {
    return function (req, res) {
        res.redirect(url.format({
            pathname: path
        }));
    }
};