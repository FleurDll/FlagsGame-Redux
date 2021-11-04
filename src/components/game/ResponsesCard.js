import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Button from "../Button";

const ResponsesCard = ({ countries, namePattern, game, sendData }) => {
    const [buttonCountries, setButtonCountries] = useState([]);

    useEffect(() => {
        const countriesName = [];

        countries.forEach(country => {
            countriesName.push(country.name.common);
        });

        const buttonText = [namePattern[game.level]];

        while (buttonText.length < 4) {
            const random = Math.floor(Math.random() * countriesName.length);
            buttonText.indexOf(countriesName[random]) === -1 && buttonText.push(countriesName[random]);
        }

        buttonText.sort(() => Math.random() - 0.5);
        setButtonCountries(buttonText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.level]);

    const handleButtonClick = (event) => {
        event.preventDefault();
        const chosenCountry = event.target.firstChild.data;
        sendData(chosenCountry);
    };

    const renderedButtons = buttonCountries.map((country) => {
        return (
            <Button
                key={uuidv4()}
                onButtonClick={handleButtonClick}
                buttonText={country}
                customClass="country-button"
            />
        );
    });

    return (
        <div className="game-buttons">
            {renderedButtons}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        countries: Object.values(state.countries.allData),
        namePattern: state.countries.namePattern,
        game: state.game
    };
};

export default connect(mapStateToProps)(ResponsesCard);