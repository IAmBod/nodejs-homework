/**
 * Renders the given view form /views
 * If the given view is a static html it renders from /views/static
 *
 * @returns {Function}
 * @param {string|null} property
 */
module.exports = (property = null) => {
    return function (req, res) {
        let out = res.locals;

        if (property !== null) {
            out = out[property];
        }

        res
            .status(200)
            .json(out)
        ;
    }
};