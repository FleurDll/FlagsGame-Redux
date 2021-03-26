import React from "react";

const DataTableScores = ({ index, name, points, percentage }) => {
    return (
        <tr>
            {index === 0 && <td><img className="score-position-img" alt="first" src="../images/first.svg" /></td>}
            {index === 1 && <td><img className="score-position-img" alt="first" src="../images/second.svg" /></td>}
            {index === 2 && <td><img className="score-position-img" alt="first" src="../images/third.svg" /></td>}
            <td>{name}</td>
            <td>{points}</td>
            <td>{percentage}%</td>
        </tr>
    );
};

export default DataTableScores;