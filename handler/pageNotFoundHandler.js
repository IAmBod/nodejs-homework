const createError = require('http-errors');
const url = require('url');

/**
 * Handles errors
 *
 * @returns {Function}
 */
module.exports = function(req, res, next) {
    // next(createError(404));
    console.log(req.href + " does not exist. Redirecting...");

    res.redirect(url.format({
        pathname: '/'
    }));
};