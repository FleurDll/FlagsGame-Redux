import React from "react";
import _ from "lodash";
import TableScores from "../TableScores";

const TotalScores = ({ allDataPlayer }) => {
    const screenWidth = window.screen.availWidth;
    const sorted = _.orderBy(allDataPlayer, ["pointsTotal"], ["desc"]);

    const renderedDataPlayer = sorted.map((player, index) => {
        return (
            <tr key={player.name}>
                {index === 0 && <td><img className="score-position-img" alt="first" src="../images/first.svg" /></td>}
                {index === 1 && <td><img className="score-position-img" alt="first" src="../images/second.svg" /></td>}
                {index === 2 && <td><img className="score-position-img" alt="first" src="../images/third.svg" /></td>}
                {index > 2 && <td></td>}
                <td>{player.name}</td>
                <td>{player.pointsTotal}</td>
                <td>{player.percentageTotal}%</td>
                <td>{player.totalGames}</td>
            </tr>
        );
    });
    return (
        <TableScores otherRow={screenWidth > 515 ? <td>Nb of Games</td> : <td>Games</td>} renderedDataPlayer={renderedDataPlayer} colSpan="5" />
    );
};

export default TotalScores;