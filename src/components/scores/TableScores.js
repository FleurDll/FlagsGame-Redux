import React from "react";

const TableScores = ({ renderedDataPlayer }) => {
    const screenWidth = window.screen.availWidth;
    return (
        <table className="ui very basic table unstackable score-table">
            <thead className="score-table-head">
                <tr>
                    <td></td>
                    <td>Name</td>
                    <td>{screenWidth > 515 ? "Points" : "Pts"}</td>
                    <td>{screenWidth > 515 ? "Success Rate" : "%"}</td>
                    <td>{screenWidth > 515 ? "Nb of Games" : "Games"}</td>
                </tr>
                <tr>
                    <td colSpan="5" className="separation"></td>
                </tr>
            </thead>
            <tbody>
                {renderedDataPlayer}
            </tbody>
        </table>
    );
};

export default TableScores;