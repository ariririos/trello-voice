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
        var i = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = badge.data.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                if (item.done) i++;
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

        if (i === badge.data.items.length) {
            return 'complete';
        } else if (i > 0.5 * badge.data.items.length) {
            return 'intermediate';
        } else {
            return 'incomplete';
        }
    }
    if (badge.type === 'dueDate') {
        if (badge.data.done) {
            return 'complete';
        } else {
            var date = badge.data.date;

            var oneDayBefore = date.clone().subtract(1, 'days');
            var now = moment();
            if (now.isBetween(oneDayBefore, date)) {
                return 'upcoming';
            } else if (now.isAfter(date)) {
                return 'passed';
            }
        }
    }
    return '';
}

export default function Badge(props) {
    var badge = props.badge;

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

    var classNames = 'badge ' + badge.type + ' ' + colorizeBadge(badge);

    return React.createElement(
        'span',
        { className: classNames },
        badgeText
    );
}
Badge.propTypes = {
    badge: PropTypes.instanceOf(BadgeModel).isRequired // TODO: Flow
};
//# sourceMappingURL=Badge.js.map
