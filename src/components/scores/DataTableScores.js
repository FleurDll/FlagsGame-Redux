import React from "react";
import { connect } from "react-redux";

const DataTableScores = ({ index, name, points, percentage, auth }) => {
    return (
        <tr style={name === auth.name ? { color: "#FFFFFF" } : { color: "" }}>
            {index === 0 && <td><img className="score-position-img" alt="first" src="../images/first.svg" /></td>}
            {index === 1 && <td><img className="score-position-img" alt="first" src="../images/second.svg" /></td>}
            {index === 2 && <td><img className="score-position-img" alt="first" src="../images/third.svg" /></td>}
            <td>{name}</td>
            <td>{points}</td>
            <td>{percentage}%</td>
        </tr>
    );
};

const mapStateToProps = state => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(DataTableScores);