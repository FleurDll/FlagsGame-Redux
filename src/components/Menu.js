import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { chooseGameMode, fetchCountriesData } from "../actions";
import useSound from "use-sound";
import restartSound from "../sounds/short-click.mp3";
import Header from "./Header";
import GoogleAuth from "./GoogleAuth";
import Dropdown from "./Dropdown";
import ChooseLevels from "./ChooseLevels";

const Menu = ({ auth, game, chooseGameMode, fetchCountriesData }) => {
    const locationsAvailable = ["World", "Europe", "Africa", "Americas", "Asia", "Oceania"];
    const [selectLevels, setSelectLevels] = useState(false);

    const [playRestart] = useSound(
        restartSound,
        { volume: 0.50 }
    );

    const receiveSelectedItem = (chosenItem) => {
        setSelectLevels(true);
        chooseGameMode(chosenItem);
    };

    const receiveSelectedLevels = (chosenLevels) => {
        chooseGameMode(game.location, chosenLevels);
        fetchCountriesData(game.location);
    };

    const handleLinkClick = () => {
        playRestart();
    }

    const headerItem = (
        <>
            <Link to="/" onClick={handleLinkClick} className="item item-header">Menu</Link>
            <Link to="/scores" onClick={handleLinkClick} className="item item-header">Scores</Link>
            <GoogleAuth />
        </>
    );

    return (
        <div>
            <Header
                headerItem={headerItem}
                itemPosition="right"
            />
            <div className="card menu-card">
                <img className="menu-img" alt="earth" src="../images/worldwide.svg" />
                <h1>A Little Flags Game ?</h1>
                <div className="dropdown">
                    <Dropdown
                        dropdownList={locationsAvailable}
                        head="Select a Region"
                        sendSeletecItem={receiveSelectedItem}
                    />
                </div>
                {selectLevels &&
                    <div className="menu-level">
                        <ChooseLevels
                            selectedLocation={game.location}
                            sendSelectedLevels={receiveSelectedLevels}
                            playRestart={playRestart}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        game: state.game,
        auth: state.auth
    };
};

export default connect(mapStateToProps, { chooseGameMode, fetchCountriesData })(Menu);