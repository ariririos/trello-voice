/* eslint-env browser */
/* globals moment, React, ReactDOM */

import Models from './models.js';
import Components from './components.js';

var root = document.getElementById('root');

var badge1 = new Models.Badge('dueDate', {
    date: moment('09:30 a.m. 03-11-18', 'hh:mm a MM-DD-YY'),
    done: false
});
var badge2 = new Models.Badge('checklist', {
    name: 'Assignments',
    items: [{
        text: 'Ch 1',
        done: true
    }, {
        text: 'Ch 2',
        done: false
    }, {
        text: 'Ch 3',
        done: true
    }]
});
var label1 = new Models.Label('white');
var label2 = new Models.Label('red');
var card = new Models.Card('Jane Eyre', [badge1, badge2], [label1, label2]);

ReactDOM.render(React.createElement(Components.Card, { card: card }), root);
//# sourceMappingURL=index.js.map
