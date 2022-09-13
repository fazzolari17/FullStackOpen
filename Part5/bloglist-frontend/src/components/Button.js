import React from 'react';
import PropTypes from 'prop-types';

function Button({ btnStyle, text, handleClick, type }) {
  const style = {
    delete: {
      background: 'lightblue',
      border: 'none',
      borderRadius: '5px',
    },
    btn: {
      border: 'none',
      borderRadius: '5px',
      color: 'green',
    },
  };
  const setBtnStyle = (params) => {
    if (params === 'delete') {
      return style.delete;
    } else if (params === 'btn') {
      return style.btn;
    }
  };

  return (
    <>
      <button
        style={setBtnStyle(btnStyle)}
        type={type}
        onClick={handleClick}
      >
        {text}
      </button>
    </>
  );
}

Button.propTypes = {
  btnStyle: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Button;
