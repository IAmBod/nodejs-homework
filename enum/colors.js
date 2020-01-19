const colors = {
    RED: {
        name: 'Piros',
        code: 'red'
    },
    YELLOW: {
        name: 'Sárga',
        code: 'yellow'
    },
    GREEN: {
        name: 'Zöld',
        code: 'green'
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

module.exports = colors;