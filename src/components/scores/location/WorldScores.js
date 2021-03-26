import React from "react";
import _ from "lodash";
import TableScores from "../TableScores";
import DataTableScores from "../DataTableScores";

const WorldScores = ({ allDataPlayer }) => {
    const sorted = _.orderBy(allDataPlayer, ["worldPoints"], ["desc"]);
    const isEqualZero = (element) => element.worldPoints === 0;

    while (sorted.findIndex(isEqualZero) !== -1) {
        sorted.splice(sorted.findIndex(isEqualZero), 1);
    }

    const renderedDataPlayer = sorted.map((player, index) => {
        return (
            <DataTableScores
                key={player.name}
                name={player.name}
                index={index}
                points={player.worldPoints}
                percentage={player.worldPercentage}
                totalGames={player.worldGames}
            />
        );
    });

    return (
        <TableScores renderedDataPlayer={renderedDataPlayer} />
    );
};

export default WorldScores;