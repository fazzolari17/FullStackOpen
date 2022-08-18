import React from "react";

function Button({handleClick, title}) {
    return (
        <div className="btn">
            <button onClick={()=>handleClick()}>{title}</button>
        </div>
    )
}

export default Button