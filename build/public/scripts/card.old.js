/* globals React, ReactDOM, PropTypes */
/* eslint-env browser */
/* eslint react/no-unescaped-entities: "off" */

(function () {
    var root = document.getElementById('root');

    function Label(props) {
        var style = { backgroundColor: props.color };
        return React.createElement('span', { className: 'label', style: style });
    }

    Label.propTypes = {
        color: PropTypes.string.isRequired
    };
})();
//# sourceMappingURL=card.old.js.map
