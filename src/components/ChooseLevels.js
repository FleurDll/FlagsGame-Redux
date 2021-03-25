import React from "react";
import Button from "./Button";
import { useHistory } from "react-router-dom";

const ChooseLevels = ({ selectedLocation, sendSelectedLevels, playRestart }) => {
    let listOfLevel = [];

    switch (selectedLocation) {
        case "Europe":
            listOfLevel = [10, 20, 30, "53 (max)"];
            break;
        case "Africa":
            listOfLevel = [10, 20, 30, 50, "60 (max)"];
            break;
        case "Americas":
            listOfLevel = [10, 20, 30, "57 (max)"];
            break;
        case "Asia":
            listOfLevel = [10, 20, 30, "50 (max)"];
            break;
        case "Oceania":
            listOfLevel = [10, "27 (max)"];
            break;
        case "World":
            listOfLevel = [10, 20, 30, 50, 150, "250 (max)"];
            break
        default:
            console.log("sorry, not working");
            break;
    }

    const history = useHistory();

    const handleLevelsSelected = (event) => {
        const chosenLevels = Number((event.target.firstChild.data).substring(0, 3));
        sendSelectedLevels(chosenLevels);

        playRestart();

        setTimeout(() => {
            history.push("/game");
        }, 400);
    };

    const renderedListOfLevel = listOfLevel.map((listItem) => {
        return (
            <Button
                key={listItem}
                onButtonClick={handleLevelsSelected}
                buttonText={listItem}
                customClass="menu-level-button inverted"
            />
        );
    });

    return (
        <div>
            <h2>Choose the Number of Flags :</h2>
            <div className="menu-level">{renderedListOfLevel}</div>
        </div>
    );
};

export default ChooseLevels;