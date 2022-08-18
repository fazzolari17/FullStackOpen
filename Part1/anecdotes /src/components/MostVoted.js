import React from "react";

function MostVoted({count, quoteArray}) {
    let highestVote = 0
    let index = 0
    count.forEach((item, i)=>{
        if(item > highestVote) {
            highestVote = item
            index = i
        }
    })

    return (
        <div className="most-voted"> 
        <h1>Anecdotes With The Most Votes</h1>
            {quoteArray[index]} {highestVote}
        </div>
    )
}

export default MostVoted