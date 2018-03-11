/* globals React, PropTypes */
import LabelModel from '../models/Label.js';

export default function Label(props) {
    var label = props.label;

    var style = { backgroundColor: label.color };
    return React.createElement('span', { className: 'label', style: style });
}
Label.propTypes = {
    label: PropTypes.instanceOf(LabelModel).isRequired // TODO: Flow
};
//# sourceMappingURL=Label.js.map
