export default class Card {
    constructor(text, badges, labels) {
        this._text = text || '';
        this._badges = [].concat(badges || []);
        this._labels = [].concat(labels || []);
    }
    get text() {
        return this._text;
    }
    // TODO: set char limits on strings
    set text(textStr) {
        this._text = textStr;
    }
    get badges() {
        return this._badges;
    }
    set badges(badgesList) {
        this._badges = [].concat(badgesList || []);
    }
    addBadges(badgesList) {
        this._badges = this._badges.concat(badgesList || []);
    }
    removeBadges(badgesList) { // eslint-disable-line no-unused-vars
    // TODO: implement
    }
    get labels() {
        return this._labels;
    }
    set labels(labelsList) {
        this._labels = [].concat(labelsList || []);
    }
    // TODO: make sure duplicate labels don't get added
    addLabels(labelsList) {
        this._labels = this._labels.concat(labelsList || []);
    }
    removeLabels(labelsList) { // eslint-disable-line no-unused-vars
    // TODO: implement
    }
    clear() {
        this.text = '';
        this.badges = [];
        this.labels = [];
    }
}
