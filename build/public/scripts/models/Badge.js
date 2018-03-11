var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Badge = function () {
    /**
     * Checklist structure:
     * {
     *   name: String,
     *   items: [
     *     {
     *        text: String,
     *        dueDate: Moment, (optional)
     *        done: Boolean
     *     }
     *   ]
     * }
     *
     * Due date structure:
     * {
     *   date: Moment,
     *   done: Boolean
     * }
     * @param {*} type
     * @param {*} data
     */
    function Badge(type, data) {
        _classCallCheck(this, Badge);

        if (this.validateType(type)) {
            this._type = type;
        } else {
            throw new Error('Invalid type for new Badge');
        }
        if (this.validateData(data)) {
            this._data = data;
        } else {
            throw new Error('Invalid data for new Badge');
        }
    }
    // TODO: maybe a library should be used here


    _createClass(Badge, [{
        key: 'validateData',
        value: function validateData(dataObj) {
            if (this.type === 'checklist') {
                if (dataObj.name && dataObj.items) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = dataObj.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;

                            if (!item.text || !(typeof item.done === 'boolean')) {
                                return false;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    return true;
                }
            }
            if (this.type === 'dueDate') {
                return dataObj.date && typeof dataObj.done === 'boolean';
            }
            // if not one of the specified types then invalid
            return false;
        }
    }, {
        key: 'validateType',
        value: function validateType(typeStr) {
            var validTypes = ['checklist', 'dueDate'];
            return validTypes.includes(typeStr);
        }
    }, {
        key: 'type',
        get: function get() {
            return this._type;
        },
        set: function set(typeStr) {
            if (this.validateType(typeStr)) {
                this._type = typeStr;
            } else {
                throw new Error('Invalid type for Badge');
            }
        }
    }, {
        key: 'data',
        get: function get() {
            return this._data;
        }
        // TODO: set character limit on content
        ,
        set: function set(dataObj) {
            if (this.validateData(dataObj)) {
                this._data = dataObj;
            } else {
                throw new Error('Invalid data for Badge');
            }
        }
    }]);

    return Badge;
}();

export default Badge;
//# sourceMappingURL=Badge.js.map
