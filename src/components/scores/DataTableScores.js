import React from "react";

const DataTableScores = (props) => {
    return (
        <tr>
            {props.index === 0 && <td><img className="score-position-img" alt="first" src="../images/first.svg" /></td>}
            {props.index === 1 && <td><img className="score-position-img" alt="first" src="../images/second.svg" /></td>}
            {props.index === 2 && <td><img className="score-position-img" alt="first" src="../images/third.svg" /></td>}
            <td>{props.name}</td>
            <td>{props.points}</td>
            <td>{props.percentage}%</td>
        </tr>
    );
};

export default DataTableScores;