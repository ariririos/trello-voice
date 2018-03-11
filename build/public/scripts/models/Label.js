var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Label = function () {
    function Label(color) {
        _classCallCheck(this, Label);

        this._color = color;
    }
    // TODO: are limits needed on colors?


    _createClass(Label, [{
        key: "color",
        get: function get() {
            return this._color;
        },
        set: function set(colorStr) {
            this._color = colorStr;
        }
    }]);

    return Label;
}();

export default Label;
//# sourceMappingURL=Label.js.map
