const sizes = {
    LARGE: {
        name: 'Nagy',
        code: 'large'
    },
    MEDIUM: {
        name: 'Közepes',
        code: 'medium'
    },
    SMALL: {
        name: 'Kicsi',
        code: 'small'
    },
    forEach: function (block) {
        if (typeof block === 'undefined') {
            return;
        }

        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                if (typeof this[key] !== 'function') {
                    block(this[key]);
                }
            }
        }
    },
    find: function (block) {
        if (typeof block === 'undefined') {
            return;
        }

        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                if (typeof this[key] !== 'function') {
                    if (block(this[key]) === true) {
                        return this[key];
                    }
                }
            }
        }

        return undefined;
    }
};

module.exports = sizes;