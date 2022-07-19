import React from "react";

function Button({handleClick, title}) {
    console.log(handleClick)
    return (
        <div>
            <button 
              className="btn"
              onClick={() => handleClick()}
            >
              {title}
            </button>
        </div>
    )
}

export default Button