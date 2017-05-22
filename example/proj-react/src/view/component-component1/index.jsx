import React from 'react'
import { observer } from 'mobx-react'
import { func, bool } from 'prop-types'
// Separate local imports from dependencies
import './styles/Form.css'

// Declare propTypes here, before the component (taking advantage of JS function hoisting)
// You want these to be as visible as possible
ExpandableForm.propTypes = {
    onSubmit: func.isRequired,
    expanded: bool,
    onExpand: func.isRequired
}

// Destructure props like so, and use default arguments as a way of setting defaultProps
function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
    const formStyle = expanded ? { height: 'auto' } : { height: 0 }
    return (
        <form style={formStyle} onSubmit={onSubmit}>
            {children}
            <button onClick={onExpand}>Expand</button>
        </form>
    )
}

// Wrap the component instead of decorating it
export default observer(ExpandableForm)
