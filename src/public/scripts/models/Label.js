export default class Label {
    constructor(color) {
        this._color = color;
    }
    // TODO: are limits needed on colors?
    get color() {
        return this._color;
    }
    set color(colorStr) {
        this._color = colorStr;
    }
}
