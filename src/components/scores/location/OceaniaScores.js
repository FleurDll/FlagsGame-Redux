import React from "react";
import _ from "lodash";
import TableScores from "../TableScores";
import DataTableScores from "../DataTableScores";

const OceaniaScores = ({ allDataPlayer }) => {
    const sorted = _.orderBy(allDataPlayer, ["oceaniaPoints"], ["desc"]);
    const isEqualZero = (element) => element.oceaniaPoints === 0;

    while (sorted.findIndex(isEqualZero) !== -1) {
        sorted.splice(sorted.findIndex(isEqualZero), 1);
    }

    const renderedDataPlayer = sorted.map((player, index) => {
        return (
            <DataTableScores
                key={player.name}
                name={player.name}
                index={index}
                points={player.oceaniaPoints}
                percentage={player.oceaniaPercentage}
            />
        );
    });
    return (
        <TableScores renderedDataPlayer={renderedDataPlayer} colSpan="4" />
    );
};

export default OceaniaScores;