/* eslint-env browser */
/* globals moment, React, ReactDOM */

import Models from './models.js';
import Components from './components.js';

const root = document.getElementById('root');

const badge1 = new Models.Badge('dueDate', {
    date: moment('09:30 a.m. 03-11-18', 'hh:mm a MM-DD-YY'),
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
        done: false
    },
    {
        text: 'Ch 3',
        done: true
    }]
});
const label1 = new Models.Label('white');
const label2 = new Models.Label('red');
const card = new Models.Card('Jane Eyre', [badge1, badge2], [label1, label2]);

ReactDOM.render(
    (
        <Components.Card card={card} />
    ), root
);
