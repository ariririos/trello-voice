/* globals React, PropTypes */
import CardModel from '../models/Card.js';
import Label from './Label.js';
import Badge from './Badge.js';

export default function Card(props) {
    var card = props.card;

    var labels = card.labels.map(function (label) {
        return React.createElement(Label, { label: label, key: label.color });
    }); // TODO: label colors aren't unique
    var badges = card.badges.map(function (badge) {
        return React.createElement(Badge, { badge: badge, key: badge.type });
    }); // TODO: badge types definitely aren't unique
    var text = card.text;


    return React.createElement(
        'div',
        { className: 'card' },
        React.createElement(
            'div',
            { className: 'labels' },
            labels
        ),
        text,
        React.createElement(
            'div',
            { className: 'badges' },
            badges
        )
    );
}
Card.propTypes = {
    card: PropTypes.instanceOf(CardModel).isRequired // TODO: Flow
};
//# sourceMappingURL=Card.js.map
