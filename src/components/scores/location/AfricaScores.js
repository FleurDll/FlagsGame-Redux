import React from "react";
import _ from "lodash";
import TableScores from "../TableScores";
import DataTableScores from "../DataTableScores";

const AfricaScores = ({ allDataPlayer }) => {
    const sorted = _.orderBy(allDataPlayer, ["africaPoints"], ["desc"]);
    const isEqualZero = (element) => element.africaPoints === 0;

    while (sorted.findIndex(isEqualZero) !== -1) {
        sorted.splice(sorted.findIndex(isEqualZero), 1);
    }

    const renderedDataPlayer = sorted.map((player, index) => {
        return (
            <DataTableScores
                key={player.name}
                name={player.name}
                index={index}
                points={player.africaPoints}
                percentage={player.africaPercentage}
                totalGames={player.africaGames}
            />
        );
    });
    return (
        <TableScores renderedDataPlayer={renderedDataPlayer} />
    );
};

export default AfricaScores;