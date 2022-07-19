import React from "react";
import Button from "./Button"

function Feedback({setGood, setNeutral, setBad}) {
    return (
        <main>
            <h1>Give Feedback</h1>
            <div className="buttons">
                <Button handleClick={()=>setGood(prev=>prev+1)} title="good"/>
                <Button handleClick={()=>setNeutral(prev=>prev+1)} title="neutral"/>
                <Button handleClick={()=>setBad(prev=>prev+1)} title="bad"/>
            </div>
        </main>
    )
}

export default Feedback