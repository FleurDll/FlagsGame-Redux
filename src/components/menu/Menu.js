import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { detect } from "detect-browser";
import { chooseGameMode, fetchCountriesData } from "../../actions";
import useSound from "use-sound";
import clickSound from "../../sounds/short-click.mp3";
import Header from "../Header";
import GoogleAuth from "../GoogleAuth";
import Dropdown from "./Dropdown";
import ChooseLevels from "./ChooseLevels";

const Menu = ({ game, chooseGameMode, fetchCountriesData }) => {
    const locationsAvailable = ["World", "Europe", "Africa", "Americas", "Asia", "Oceania"];
    const [selectLevels, setSelectLevels] = useState(false);

    useEffect(() => {
        const browser = detect();

        if (browser) {
            console.log(browser.name);
            console.log(browser.version);
            console.log(browser.os);
        }
    }, []);

    const [playClick] = useSound(
        clickSound,
        { volume: 0.50 }
    );

    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useState({});

    useEffect(() => { // fixing : cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
        return () => {
            setState({});
        };
    }, []);

    const receiveSelectedItem = (chosenItem) => {
        setSelectLevels(true);
        chooseGameMode(chosenItem);
    };

    const receiveSelectedLevels = (chosenLevels) => {
        chooseGameMode(game.location, chosenLevels);
        fetchCountriesData(game.location);
    };

    const handleLinkClick = () => {
        playClick();
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
                            playClick={playClick}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return { game: state.game };
};

export default connect(mapStateToProps, { chooseGameMode, fetchCountriesData })(Menu);