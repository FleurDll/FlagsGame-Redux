import React from "react";
import TotalScores from "./location/TotalScores";
import WorldScores from "./location/WorldScores";
import EuropeScores from "./location/EuropeScores";
import AfricaScores from "./location/AfricaScores";
import AsiaScores from "./location/AsiaScores";
import AmericasScores from "./location/AmericasScores";
import OceaniaScores from "./location/OceaniaScores";

const LocationPath = ({ filter, allDataPlayer }) => {
    return (
        <>
            {filter === "Total" && <TotalScores allDataPlayer={allDataPlayer} />}
            {filter === "World" && <WorldScores allDataPlayer={allDataPlayer} />}
            {filter === "Europe" && <EuropeScores allDataPlayer={allDataPlayer} />}
            {filter === "Africa" && <AfricaScores allDataPlayer={allDataPlayer} />}
            {filter === "Asia" && <AsiaScores allDataPlayer={allDataPlayer} />}
            {filter === "Americas" && <AmericasScores allDataPlayer={allDataPlayer} />}
            {filter === "Oceania" && <OceaniaScores allDataPlayer={allDataPlayer} />}
        </>
    );
};

export default LocationPath;