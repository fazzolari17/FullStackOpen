import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef( (props, refs) => {
  const [ visible, setVisible ] = useState(props.visible)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className={props.classname}>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <button className='btn' id={props.buttonId} onClick={toggleVisibility}>{visible ? 'Cancel' : props.buttonLabel}</button>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable