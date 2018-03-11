var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function () {
    function Card(text, badges, labels) {
        _classCallCheck(this, Card);

        this._text = text || '';
        this._badges = [].concat(badges || []);
        this._labels = [].concat(labels || []);
    }

    _createClass(Card, [{
        key: 'addBadges',
        value: function addBadges(badgesList) {
            this._badges = this._badges.concat(badgesList || []);
        }
    }, {
        key: 'removeBadges',
        value: function removeBadges(badgesList) {// eslint-disable-line no-unused-vars
            // TODO: implement
        }
    }, {
        key: 'addLabels',

        // TODO: make sure duplicate labels don't get added
        value: function addLabels(labelsList) {
            this._labels = this._labels.concat(labelsList || []);
        }
    }, {
        key: 'removeLabels',
        value: function removeLabels(labelsList) {// eslint-disable-line no-unused-vars
            // TODO: implement
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.text = '';
            this.badges = [];
            this.labels = [];
        }
    }, {
        key: 'text',
        get: function get() {
            return this._text;
        }
        // TODO: set char limits on strings
        ,
        set: function set(textStr) {
            this._text = textStr;
        }
    }, {
        key: 'badges',
        get: function get() {
            return this._badges;
        },
        set: function set(badgesList) {
            this._badges = [].concat(badgesList || []);
        }
    }, {
        key: 'labels',
        get: function get() {
            return this._labels;
        },
        set: function set(labelsList) {
            this._labels = [].concat(labelsList || []);
        }
    }]);

    return Card;
}();

export default Card;
//# sourceMappingURL=Card.js.map
