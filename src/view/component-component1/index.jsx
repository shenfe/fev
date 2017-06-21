import React from 'react'

let styles = require('./index.scss');
console.log(styles);

const Component1 = ({ onClick, color, text }) => {
    return (
        <a onClick={onClick}
            className={
                styles['test-component1'] + ' '
                + styles['dot']
            }
            style={{color: color}}>
            This is {text}!
        </a>
    );
};

// Component1.propTypes = {
//     text: React.PropTypes.string.isRequired
// };

Component1.type = 'react';

export { Component1 };
