var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */

/* eslint-env browser */
/* globals moment */

// function dragoverHandler(ev) {
//     ev.preventDefault();
//     ev.dataTransfer.dropEffect = "copy";
// }

// function dropHandler(ev) {
//     ev.preventDefault();
//     document.getElementById(ev.target.id).className = 'drop';
//     let text = document.createTextNode(ev.dataTransfer.getData('text'));
//     document.getElementById(ev.target.id).appendChild(text);
//     if (ev.dataTransfer.getData('application/json')) {
//         generateCard(ev.dataTransfer.getData('application/json'));
//     }
// }

// function dragenterHandler(ev) {
//     ev.preventDefault();
//     document.getElementById(ev.target.id).className = 'dragenter';
// }

// function dragleaveHandler(ev) {
//     document.getElementById(ev.target.id).className = '';
// }


// let dropzone = document.getElementById('dropzone');
// console.log(dropzone);
// dropzone.ondragover = dragoverHandler;
// dropzone.ondrop = dropHandler;
// dropzone.ondragenter = dragenterHandler;
// dropzone.ondragleave = dragleaveHandler;

// function dragstartHandler(ev) {
//     console.log('gettin dragged');
//     ev.dataTransfer.setData('text/plain', document.getElementById(ev.target.id).textContent);
// }

// let draggable = document.getElementById('draggable');
// console.log(draggable);
// draggable.ondragstart = dragstartHandler;

// function handleCardDrag(ev) {
//     let card = ev.target;
//     let data = {
//         text: '',
//         badges: [],
//         labels: []
//     };
//     for (let elem of card.children) {
//         if (elem.classList.contains('text')) {
//             data.text = elem.innerText;
//         } else if (elem.classList.contains('badges')) {
//             // TODO: convert badges into data-* attributes
//             for (let badge of elem.children) {
//                 data.badges.push({
//                     type: badge.className,
//                     content: badge.innerText
//                 })
//             }
//         }
//     }

//     // TODO: make sure labels always get added to the data-labels attr
//     if (card.dataset.labels) {
//         data.labels = card.dataset.labels.split(' ');
//     }

//     ev.dataTransfer.setData('application/json', JSON.stringify(data));

//     // TODO: add a plain text alternative
// }


/**
 * Badge class.
 */
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
            throw new Error('Invalid type passed to Badge constructor');
        }
        if (this.validateData(data)) {
            this._data = data;
        } else {
            throw new Error('Invalid data passed to Badge constructor');
        }
    }

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

                            if (!item.text && !(typeof item.done === 'boolean')) {
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
                throw new Error('Invalid type passed to Badge type setter');
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
                throw new Error('Invalid data passed to Badge data setter');
            }
        }
    }]);

    return Badge;
}();

var BadgeNode = function () {
    function BadgeNode(badge) {
        _classCallCheck(this, BadgeNode);

        this.node = document.createElement('span');
        this.node.classList.add('badge');
        this.node.dataset.badgeType = badge.type;

        var badgeText = '';
        if (badge.type === 'checklist') {
            var i = 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = badge.data.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    if (item.done) i++;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            badgeText = i + '/' + badge.data.items.length;
        }
        if (badge.type === 'dueDate') {
            badgeText = badge.data.date.format('MMM Do');
        }
        this.node.innerText = badgeText;
        this._badge = badge;
    }

    _createClass(BadgeNode, [{
        key: 'colorize',
        value: function colorize() {
            if (this._badge.type === 'checklist') {
                var i = 0;
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this._badge.data.items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var item = _step3.value;

                        if (item.done) i++;
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                if (i === this._badge.data.items.length) {
                    this.node.classList.add('complete');
                } else if (i > 0.5 * this._badge.data.items.length) {
                    this.node.classList.add('intermediate');
                } else {
                    this.node.classList.add('incomplete');
                }
            }
            if (this._badge.type === 'dueDate') {
                if (this._badge.data.done) {
                    this.node.classList.add('complete');
                } else {
                    var date = this._badge.data.date;

                    var oneDayBefore = date.clone().subtract(1, 'days');
                    var now = moment();
                    if (now.isBetween(oneDayBefore, date)) {
                        this.node.classList.add('upcoming');
                    } else if (now.isAfter(date)) {
                        this.node.classList.add('passed');
                    }
                }
            }
        }
    }]);

    return BadgeNode;
}();

var Label = function () {
    function Label(name, color) {
        _classCallCheck(this, Label);

        this._name = name;
        this._color = color;
    }

    _createClass(Label, [{
        key: 'name',
        get: function get() {
            return this._name;
        }
        // TODO: set char limit on name
        ,
        set: function set(nameStr) {
            this._name = nameStr;
        }
        // TODO: are limits needed on colors?

    }, {
        key: 'color',
        get: function get() {
            return this._color;
        },
        set: function set(colorStr) {
            this._color = colorStr;
        }
    }]);

    return Label;
}();

var LabelNode = function LabelNode(label) {
    _classCallCheck(this, LabelNode);

    this.node = document.createElement('span');
    this.node.classList.add('label');
    this.node.dataset.label = label.name;
    this._label = label;
};

// Create label colors stylsheet


var labelsStyleElem = document.createElement('style');
document.head.appendChild(labelsStyleElem);
var labelsStylesheet = labelsStyleElem.sheet;

/**
   * Adds a label to the label stylesheet.
   * @param {Models.Label} label
   */

function registerLabel(label) {
    var styleRule = '\n      .label[data-label="' + label.name + '"] {\n          background-color: ' + label.color + ';\n      }\n      ';
    labelsStylesheet.insertRule(styleRule, 0);
}

var defaultLabelsList = [new Models.Label('enc1102', 'blue'), new Models.Label('phy2049+l', 'orange'), new Models.Label('chm2211+l', 'red'), new Models.Label('ap gov', 'lightblue'), new Models.Label('ap macro', 'lightgreen')];

defaultLabelsList.forEach(registerLabel);

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

// TODO: add droppable & guid


var CardNode = function () {
    function CardNode(card) {
        _classCallCheck(this, CardNode);

        this.node = document.createElement('div');
        this.node.classList.add('card');

        var labelsCon = document.createElement('div');
        labelsCon.classList.add('labels');

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = card.labels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var label = _step4.value;

                var labelNode = new LabelNode(label);
                labelsCon.appendChild(labelNode.node);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        this.node.appendChild(labelsCon);

        this.node.appendChild(document.createTextNode(card.text));

        var badgesCon = document.createElement('div');
        badgesCon.classList.add('badges');

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = card.badges[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var badge = _step5.value;

                var badgeNode = new BadgeNode(badge);
                badgesCon.appendChild(badgeNode.node);
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        this.node.appendChild(badgesCon);
        this._card = card;
    }

    _createClass(CardNode, [{
        key: 'colorizeBadges',
        value: function colorizeBadges() {
            var badgesCon = this.node.querySelector('.badges');
            badgesCon.innerHTML = '';

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this._card.badges[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var badge = _step6.value;

                    var badgeNode = new BadgeNode(badge);
                    badgeNode.colorize();
                    badgesCon.appendChild(badgeNode.node);
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }
    }]);

    return CardNode;
}();

var badge1 = new Models.Badge('dueDate', {
    date: moment('09:30 a.m. 03-02-18', 'hh:mm a MM-DD-YY'),
    done: false
});
var badge2 = new Models.Badge('checklist', {
    name: 'Assignments',
    items: [{
        text: 'Ch 1',
        done: true
    }, {
        text: 'Ch 2',
        done: true
    }, {
        text: 'Ch 3',
        done: false
    }]
});
var label1 = new Models.Label('enc1102', 'blue');
var label2 = new Models.Label('phy2049+l', 'red');
var card = new Card('Jane Eyre', [badge1, badge2], [label1, label2]);
var cardNode = new CardNode(card);
cardNode.colorizeBadges();
document.querySelector('#cardlist').appendChild(cardNode.node);

var newCardTemplate = new Card();

document.getElementById('newCardGen').querySelector('input[type="submit"]').onclick = function (ev) {
    newCardTemplate.text = ev.target.parentElement.querySelector('textarea').value;
    // remove all labels, badges, and text
    ev.target.parentNode.querySelector('.labels').innerHTML = '';
    ev.target.parentNode.querySelector('.badges').innerHTML = '';
    ev.target.parentNode.querySelector('textarea').value = '';

    // TODO: colorize badges
    document.querySelector('#cardlist').appendChild(new CardNode(newCardTemplate).node);
    newCardTemplate.clear();
};

var possibleMatchesGlobal = {};

function handleLabelDisplay(ev) {
    console.log('handleLabelDisplay'); // eslint-disable-line no-console
    // handle label names
    var labelName = ev.target.value.split('#')[1];
    var possibleMatches = defaultLabelsList.filter(function (label) {
        var labelFrag = label.name.substr(0, labelName.length);
        return labelFrag === labelName;
    });
    possibleMatchesGlobal = possibleMatches;
    console.log(possibleMatches.map(function (match) {
        return match.name;
    })); // eslint-disable-line no-console
    var labelNodes = possibleMatches.map(function (label) {
        var node = document.createElement('div');
        node.classList.add('possibleLabel');
        node.innerText = label.name;
        node.style.backgroundColor = label.color;
        return node;
    });
    console.log(labelNodes); // eslint-disable-line no-console
    var possibleLabelDisplay = document.querySelector('#possibleLabelDisplay');
    possibleLabelDisplay.innerHTML = '';
    labelNodes.forEach(function (labelNode) {
        return possibleLabelDisplay.appendChild(labelNode);
    });
}

function handleLabelEntry(ev) {
    console.log('handleLabelEntry'); // eslint-disable-line no-console
    if (ev.which === 9) {
        ev.preventDefault();
        console.log('tab prevented'); // eslint-disable-line no-console

        var labelNames = possibleMatchesGlobal.map(function (label) {
            return label.name;
        });

        // only handle tab if only one label is available
        if (labelNames.length === 1) {
            console.log('one label only'); // eslint-disable-line no-console
            // const labelName = document.getElementById('possibleLabelDisplay').children[0].innerText;
            // const labelNode = document.createElement('span');
            // labelNode.classList = 'label';
            // labelNode.dataset.label = labelName;

            newCardTemplate.addLabels(possibleMatchesGlobal[0]);

            var labelNode = new LabelNode(possibleMatchesGlobal[0]);
            document.querySelector('#newCardGen .labels').appendChild(labelNode.node);

            var textareaContent = ev.target.value.split('#');
            ev.target.value = textareaContent[0]; // eslint-disable-line prefer-destructuring
            ev.target.removeEventListener('keyup', handleLabelDisplay, true);
            ev.target.removeEventListener('keydown', handleLabelEntry, true);
            document.getElementById('possibleLabelDisplay').innerHTML = '';
        }
    }
}

var currentlyProcessingDate = false;

function handleDateDisplay(ev) {
    console.log('handleDateDisplay'); // eslint-disable-line no-console
    var dateStr = ev.target.value.split('due:')[1];
    console.log(dateStr); // eslint-disable-line no-console
    var date = moment(dateStr, 'hh:mm a MM-DD-YY');
    console.log(date.format('dddd, MMMM Do YYYY, h:mm:ss a')); // eslint-disable-line no-console
}

function handleDateEntry(ev) {
    console.log('handleDateEntry'); // eslint-disable-line no-console
    if (ev.which === 9) {
        ev.preventDefault();
        console.log('tab prevented'); // eslint-disable-line no-console

        var dateStr = ev.target.value.split('due:')[1];
        var date = moment(dateStr, 'hh:mm a MM-DD-YY');
        var dateBadge = new Models.Badge('dueDate', { date: date, done: false });
        var dateNode = new BadgeNode(dateBadge);
        document.querySelector('#newCardGen .badges').appendChild(dateNode.node);
        newCardTemplate.addBadges(dateBadge);

        var textareaContent = ev.target.value.split('due:');
        ev.target.value = textareaContent[0]; // eslint-disable-line prefer-destructuring
        ev.target.parentNode.classList.remove('dateDisplay');
        ev.target.removeEventListener('keyup', handleDateDisplay, true);
        ev.target.removeEventListener('keydown', handleDateEntry, true);
        currentlyProcessingDate = false;
    }
}

document.getElementById('newCardGen').querySelector('textarea').addEventListener('keydown', function (ev) {
    // handle displaying labels on "#"
    if (ev.key === '#') {
        ev.target.addEventListener('keyup', handleLabelDisplay, true);
        ev.target.addEventListener('keydown', handleLabelEntry, true);
    }

    // remove label display if # is removed
    if (ev.which === 8) {
        // only removes listeners if '#' is the last <textarea> character right before the deletion
        if (ev.target.value[ev.target.value.length - 1] === '#') {
            ev.target.removeEventListener('keyup', handleLabelDisplay, true);
            ev.target.removeEventListener('keydown', handleLabelEntry, true);
        }
    }

    // handle adding due date on "due:"
    if (ev.key === ':' && !currentlyProcessingDate) {
        var textLength = ev.target.value.length;
        if (ev.target.value.substring(textLength - 3, textLength) === 'due') {
            ev.target.parentNode.classList.add('dateDisplay');
            ev.target.addEventListener('keyup', handleDateDisplay, true);
            ev.target.addEventListener('keydown', handleDateEntry, true);
            currentlyProcessingDate = true;
        }
    }

    // remove due date display if :due is removed
    if (ev.which === 8) {
        // only removes listeners if ':' is the last <textarea> character right before the deletion
        // TODO: don't remove listener until 'due:' is removed
        if (ev.target.value[ev.target.value.length - 1] === ':') {
            ev.target.parentNode.classList.remove('dateDisplay');
            ev.target.removeEventListener('keyup', handleDateDisplay, true);
            ev.target.removeEventListener('keydown', handleDateEntry, true);
            currentlyProcessingDate = false;
        }
    }
});
/* eslint-enable */
//# sourceMappingURL=index.old.js.map
