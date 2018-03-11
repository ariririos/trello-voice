/* globals React, PropTypes, moment */
import BadgeModel from '../models/Badge.js';

/**
 * Takes a badge and returns an appropriate class
 * based on the type and data.
 * @param {Badge} badge
 * @return {String}
 */
function colorizeBadge(badge) {
    if (badge.type === 'checklist') {
        let i = 0;
        for (const item of badge.data.items) {
            if (item.done) i++;
        }
        if (i === badge.data.items.length) {
            return 'complete';
        }
        else if (i > (0.5 * badge.data.items.length)) {
            return 'intermediate';
        }
        else {
            return 'incomplete';
        }
    }
    if (badge.type === 'dueDate') {
        if (badge.data.done) {
            return 'complete';
        }
        else {
            const { date } = badge.data;
            const oneDayBefore = date.clone().subtract(1, 'days');
            const now = moment();
            if (now.isBetween(oneDayBefore, date)) {
                return 'upcoming';
            }
            else if (now.isAfter(date)) {
                return 'passed';
            }
        }
    }
    return '';
}

export default function Badge(props) {
    const { badge } = props;
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

    const classNames = `badge ${badge.type} ${colorizeBadge(badge)}`;

    return (
        <span className={classNames}>
            {badgeText}
        </span>
    );
}
Badge.propTypes = {
    badge: PropTypes.instanceOf(BadgeModel).isRequired // TODO: Flow
};
