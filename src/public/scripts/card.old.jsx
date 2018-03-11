/* globals React, ReactDOM, PropTypes */
/* eslint-env browser */
/* eslint react/no-unescaped-entities: "off" */

(() => {
    const root = document.getElementById('root');


    function Label(props) {
        const style = { backgroundColor: props.color };
        return (
            <span className='label' style={style} />
        );
    }

    Label.propTypes = {
        color: PropTypes.string.isRequired
    };

    
})();
