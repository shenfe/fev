import React from 'react'

const Component1 = ({ onClick, color, text }) => {
    return (
        <a onClick={onClick}
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
