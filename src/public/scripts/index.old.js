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
class Badge {
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
    constructor(type, data) {
        if (this.validateType(type)) {
            this._type = type;
        }
        else {
            throw new Error('Invalid type passed to Badge constructor');
        }
        if (this.validateData(data)) {
            this._data = data;
        }
        else {
            throw new Error('Invalid data passed to Badge constructor');
        }
    }
    validateData(dataObj) {
        if (this.type === 'checklist') {
            if (dataObj.name && dataObj.items) {
                for (const item of dataObj.items) {
                    if (!item.text && !(typeof item.done === 'boolean')) {
                        return false;
                    }
                }
                return true;
            }
        }
        if (this.type === 'dueDate') {
            return dataObj.date && (typeof dataObj.done === 'boolean');
        }
        // if not one of the specified types then invalid
        return false;
    }
    validateType(typeStr) {
        const validTypes = ['checklist', 'dueDate'];
        return validTypes.includes(typeStr);
    }
    get type() {
        return this._type;
    }
    set type(typeStr) {
        if (this.validateType(typeStr)) {
            this._type = typeStr;
        }
        else {
            throw new Error('Invalid type passed to Badge type setter');
        }
    }
    get data() {
        return this._data;
    }
    // TODO: set character limit on content
    set data(dataObj) {
        if (this.validateData(dataObj)) {
            this._data = dataObj;
        }
        else {
            throw new Error('Invalid data passed to Badge data setter');
        }
    }
}

class BadgeNode {
    constructor(badge) {
        this.node = document.createElement('span');
        this.node.classList.add('badge');
        this.node.dataset.badgeType = badge.type;

        let badgeText = '';
        if (badge.type === 'checklist') {
            let i = 0;
            for (const item of badge.data.items) {
                if (item.done) i++;
            }
            badgeText = `${i}/${badge.data.items.length}`;
        }
        if (badge.type === 'dueDate') {
            badgeText = badge.data.date.format('MMM Do');
        }
        this.node.innerText = badgeText;
        this._badge = badge;
    }
    colorize() {
        if (this._badge.type === 'checklist') {
            let i = 0;
            for (const item of this._badge.data.items) {
                if (item.done) i++;
            }
            if (i === this._badge.data.items.length) {
                this.node.classList.add('complete');
            }
            else if (i > (0.5 * this._badge.data.items.length)) {
                this.node.classList.add('intermediate');
            }
            else {
                this.node.classList.add('incomplete');
            }
        }
        if (this._badge.type === 'dueDate') {
            if (this._badge.data.done) {
                this.node.classList.add('complete');
            }
            else {
                const { date } = this._badge.data;
                const oneDayBefore = date.clone().subtract(1, 'days');
                const now = moment();
                if (now.isBetween(oneDayBefore, date)) {
                    this.node.classList.add('upcoming');
                }
                else if (now.isAfter(date)) {
                    this.node.classList.add('passed');
                }
            }
        }
    }
}

class Label {
    constructor(name, color) {
        this._name = name;
        this._color = color;
    }
    get name() {
        return this._name;
    }
    // TODO: set char limit on name
    set name(nameStr) {
        this._name = nameStr;
    }
    // TODO: are limits needed on colors?
    get color() {
        return this._color;
    }
    set color(colorStr) {
        this._color = colorStr;
    }
}

class LabelNode {
    constructor(label) {
        this.node = document.createElement('span');
        this.node.classList.add('label');
        this.node.dataset.label = label.name;
        this._label = label;
    }
}

// Create label colors stylsheet
const labelsStyleElem = document.createElement('style');
document.head.appendChild(labelsStyleElem);
const labelsStylesheet = labelsStyleElem.sheet;

/**
   * Adds a label to the label stylesheet.
   * @param {Models.Label} label
   */

function registerLabel(label) {
    const styleRule = `
      .label[data-label="${label.name}"] {
          background-color: ${label.color};
      }
      `;
    labelsStylesheet.insertRule(styleRule, 0);
}

const defaultLabelsList = [
    new Models.Label('enc1102', 'blue'),
    new Models.Label('phy2049+l', 'orange'),
    new Models.Label('chm2211+l', 'red'),
    new Models.Label('ap gov', 'lightblue'),
    new Models.Label('ap macro', 'lightgreen')
];

defaultLabelsList.forEach(registerLabel);

class Card {
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

// TODO: add droppable & guid
class CardNode {
    constructor(card) {
        this.node = document.createElement('div');
        this.node.classList.add('card');

        const labelsCon = document.createElement('div');
        labelsCon.classList.add('labels');

        for (const label of card.labels) {
            const labelNode = new LabelNode(label);
            labelsCon.appendChild(labelNode.node);
        }

        this.node.appendChild(labelsCon);

        this.node.appendChild(document.createTextNode(card.text));

        const badgesCon = document.createElement('div');
        badgesCon.classList.add('badges');

        for (const badge of card.badges) {
            const badgeNode = new BadgeNode(badge);
            badgesCon.appendChild(badgeNode.node);
        }

        this.node.appendChild(badgesCon);
        this._card = card;
    }
    colorizeBadges() {
        const badgesCon = this.node.querySelector('.badges');
        badgesCon.innerHTML = '';

        for (const badge of this._card.badges) {
            const badgeNode = new BadgeNode(badge);
            badgeNode.colorize();
            badgesCon.appendChild(badgeNode.node);
        }
    }
}

const badge1 = new Models.Badge('dueDate', {
    date: moment('09:30 a.m. 03-02-18', 'hh:mm a MM-DD-YY'),
    done: false
});
const badge2 = new Models.Badge('checklist', {
    name: 'Assignments',
    items: [{
        text: 'Ch 1',
        done: true
    },
    {
        text: 'Ch 2',
        done: true
    },
    {
        text: 'Ch 3',
        done: false
    }]
});
const label1 = new Models.Label('enc1102', 'blue');
const label2 = new Models.Label('phy2049+l', 'red');
const card = new Card('Jane Eyre', [badge1, badge2], [label1, label2]);
const cardNode = new CardNode(card);
cardNode.colorizeBadges();
document.querySelector('#cardlist').appendChild(cardNode.node);

const newCardTemplate = new Card();

document.getElementById('newCardGen').querySelector('input[type="submit"]').onclick = (ev) => {
    newCardTemplate.text = ev.target.parentElement.querySelector('textarea').value;
    // remove all labels, badges, and text
    ev.target.parentNode.querySelector('.labels').innerHTML = '';
    ev.target.parentNode.querySelector('.badges').innerHTML = '';
    ev.target.parentNode.querySelector('textarea').value = '';

    // TODO: colorize badges
    document.querySelector('#cardlist').appendChild(new CardNode(newCardTemplate).node);
    newCardTemplate.clear();
};

let possibleMatchesGlobal = {};

function handleLabelDisplay(ev) {
    console.log('handleLabelDisplay'); // eslint-disable-line no-console
    // handle label names
    const labelName = ev.target.value.split('#')[1];
    const possibleMatches = defaultLabelsList.filter((label) => {
        const labelFrag = label.name.substr(0, labelName.length);
        return labelFrag === labelName;
    });
    possibleMatchesGlobal = possibleMatches;
    console.log(possibleMatches.map(match => match.name)); // eslint-disable-line no-console
    const labelNodes = possibleMatches.map((label) => {
        const node = document.createElement('div');
        node.classList.add('possibleLabel');
        node.innerText = label.name;
        node.style.backgroundColor = label.color;
        return node;
    });
    console.log(labelNodes); // eslint-disable-line no-console
    const possibleLabelDisplay = document.querySelector('#possibleLabelDisplay');
    possibleLabelDisplay.innerHTML = '';
    labelNodes.forEach(labelNode => possibleLabelDisplay.appendChild(labelNode));
}

function handleLabelEntry(ev) {
    console.log('handleLabelEntry'); // eslint-disable-line no-console
    if (ev.which === 9) {
        ev.preventDefault();
        console.log('tab prevented'); // eslint-disable-line no-console

        const labelNames = possibleMatchesGlobal.map(label => label.name);

        // only handle tab if only one label is available
        if (labelNames.length === 1) {
            console.log('one label only'); // eslint-disable-line no-console
            // const labelName = document.getElementById('possibleLabelDisplay').children[0].innerText;
            // const labelNode = document.createElement('span');
            // labelNode.classList = 'label';
            // labelNode.dataset.label = labelName;

            newCardTemplate.addLabels(possibleMatchesGlobal[0]);

            const labelNode = new LabelNode(possibleMatchesGlobal[0]);
            document.querySelector('#newCardGen .labels').appendChild(labelNode.node);


            const textareaContent = ev.target.value.split('#');
            ev.target.value = textareaContent[0]; // eslint-disable-line prefer-destructuring
            ev.target.removeEventListener('keyup', handleLabelDisplay, true);
            ev.target.removeEventListener('keydown', handleLabelEntry, true);
            document.getElementById('possibleLabelDisplay').innerHTML = '';
        }
    }
}

let currentlyProcessingDate = false;

function handleDateDisplay(ev) {
    console.log('handleDateDisplay'); // eslint-disable-line no-console
    const dateStr = ev.target.value.split('due:')[1];
    console.log(dateStr); // eslint-disable-line no-console
    const date = moment(dateStr, 'hh:mm a MM-DD-YY');
    console.log(date.format('dddd, MMMM Do YYYY, h:mm:ss a')); // eslint-disable-line no-console
}

function handleDateEntry(ev) {
    console.log('handleDateEntry'); // eslint-disable-line no-console
    if (ev.which === 9) {
        ev.preventDefault();
        console.log('tab prevented'); // eslint-disable-line no-console

        const dateStr = ev.target.value.split('due:')[1];
        const date = moment(dateStr, 'hh:mm a MM-DD-YY');
        const dateBadge = new Models.Badge('dueDate', { date, done: false });
        const dateNode = new BadgeNode(dateBadge);
        document.querySelector('#newCardGen .badges').appendChild(dateNode.node);
        newCardTemplate.addBadges(dateBadge);

        const textareaContent = ev.target.value.split('due:');
        ev.target.value = textareaContent[0]; // eslint-disable-line prefer-destructuring
        ev.target.parentNode.classList.remove('dateDisplay');
        ev.target.removeEventListener('keyup', handleDateDisplay, true);
        ev.target.removeEventListener('keydown', handleDateEntry, true);
        currentlyProcessingDate = false;
    }
}

document.getElementById('newCardGen').querySelector('textarea').addEventListener('keydown', (ev) => {
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
        const textLength = ev.target.value.length;
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
