const Component1 = ({ onClick, complete, text }) => (
    <li
        onClick={onClick}
        style={{textDecoration: complete ? 'line-through' : 'none'}}
    >
        {text}
    </li>
);

Component1.type = 'react';

export default Component1
