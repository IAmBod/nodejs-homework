const path = require('path');

/**
 * Renders the given view form /views
 * If the given view is a static html it renders from /views/static
 *
 * @param {String} name
 * @param {Object} options
 * @returns {Function}
 */
module.exports = (name, options = {}) => {
    return function (req, res) {
        let locals = res.locals;

        res.render(name, {...locals, ...options});
    }
};