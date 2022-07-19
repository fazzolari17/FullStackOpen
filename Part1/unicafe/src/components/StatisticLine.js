import React from "react";

function StatisticLine({title, value}) {
    return (
        <div>
            <p>{title} {value}</p>
        </div>
    )
}

export default StatisticLine