/* globals React, PropTypes */
import CardModel from '../models/Card.js';
import Label from './Label.js';
import Badge from './Badge.js';

export default function Card(props) {
    const { card } = props;
    const labels = card.labels.map(label => <Label label={label} key={label.color} />); // TODO: label colors aren't unique
    const badges = card.badges.map(badge => <Badge badge={badge} key={badge.type} />); // TODO: badge types definitely aren't unique
    const { text } = card;

    return (
        <div className='card'>
            <div className='labels'>
                {labels}
            </div>
            {text}
            <div className='badges'>
                {badges}
            </div>
        </div>
    );
}
Card.propTypes = {
    card: PropTypes.instanceOf(CardModel).isRequired // TODO: Flow
};
