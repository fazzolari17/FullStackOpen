import React from "react";
import StatisticLine from "./StatisticLine";

function Statistics({good, bad, neutral}) {
    const total = good+bad+neutral
    const average = bad / neutral
    const positive = good / total
    return (
        <div className="statistics">
            <h2>Statistics</h2>
            <StatisticLine title="good" value={good} />
            <StatisticLine title="neutral" value={neutral} />
            <StatisticLine title="bad" value={bad} />
            <StatisticLine title="total" value={total} />
            <StatisticLine title="average" value={average}/>
            <StatisticLine title="positive" value={positive}/>
        </div>
    )
}

export default Statistics