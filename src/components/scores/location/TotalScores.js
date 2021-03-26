import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import DataTableScores from "../DataTableScores";
import TableScores from "../TableScores";

const TotalScores = ({ allDataPlayer, auth }) => {
    const sorted = _.orderBy(allDataPlayer, ["pointsTotal"], ["desc"]);

    const renderedDataPlayer = sorted.map((player, index) => {
        return (
            <DataTableScores
                key={player.name}
                name={player.name}
                index={index}
                points={player.pointsTotal}
                percentage={player.percentageTotal}
                totalGames={player.totalGames}
            />
        );
    });
    return (
        <TableScores renderedDataPlayer={renderedDataPlayer} />
    );
};

const mapStateToProps = state => {
    return { auth: state.auth }
};

export default connect(mapStateToProps)(TotalScores);