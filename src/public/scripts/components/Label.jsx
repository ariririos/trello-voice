/* globals React, PropTypes */
import LabelModel from '../models/Label.js';

export default function Label(props) {
    const { label } = props;
    const style = { backgroundColor: label.color };
    return (
        <span className='label' style={style} />
    );
}
Label.propTypes = {
    label: PropTypes.instanceOf(LabelModel).isRequired // TODO: Flow
};
