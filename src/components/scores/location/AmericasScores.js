import React from "react";
import _ from "lodash";
import TableScores from "../TableScores";
import DataTableScores from "../DataTableScores";

const AmericasScores = ({ allDataPlayer }) => {
    const sorted = _.orderBy(allDataPlayer, ["americasPoints"], ["desc"]);
    const isEqualZero = (element) => element.americasPoints === 0;

    while (sorted.findIndex(isEqualZero) !== -1) {
        sorted.splice(sorted.findIndex(isEqualZero), 1);
    }

    const renderedDataPlayer = sorted.map((player, index) => {
        return (
            <DataTableScores
                key={player.name}
                name={player.name}
                index={index}
                points={player.americasPoints}
                percentage={player.americasPercentage}
                totalGames={player.americasGames}
            />
        );
    });
    return (
        <TableScores renderedDataPlayer={renderedDataPlayer} />
    );
};

export default AmericasScores;