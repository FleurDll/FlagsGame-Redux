import React from "react";

const TableScores = (props) => {
    const screenWidth = window.screen.availWidth;
    return (
        <table className="ui very basic table unstackable score-table">
            <thead className="score-table-head">
                <tr>
                    <td></td>
                    <td>Name</td>
                    <td>{screenWidth > 515 ? "Points" : "Pts"}</td>
                    <td>{screenWidth > 515 ? "Success Rate" : "%"}</td>
                    {props.otherRow}
                </tr>
                <tr>
                    <td colSpan={props.colSpan} className="separation"></td>
                </tr>
            </thead>
            <tbody>
                {props.renderedDataPlayer}
            </tbody>
        </table>
    );
};

export default TableScores;